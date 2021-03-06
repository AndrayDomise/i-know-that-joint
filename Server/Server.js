const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './Config.env'})
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let request = require('request');
let querystring = require('querystring');
const cookieParser = require('cookie-parser');
const userRoute = require('../Server/routes/UserRoutes');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.json({extended: false}));

// app.use('/game', userRoute);

let client_id = process.env.SPOTIFY_CLIENT_ID; 
let client_secret = process.env.SPOTIFY_CLIENT_SECRET; 
let redirect_uri = process.env.SPOTIFY_REDIRECT_URL

let generateRandomString = function(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

let stateKey = 'spotify_auth_state';


app.use(express.static(path.join(__dirname + '/../Client/build')))
    .use(cors())
    .use(cookieParser());
    console.log(path.join(__dirname + '/../Client/build'))

app.get('/login', function(req, res) {

    let state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    let scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
});

app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
    res.redirect('/#' +
        querystring.stringify({
        error: 'state_mismatch'
        }));
    } else {
    res.clearCookie(stateKey);
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
        },
        headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

        let access_token = body.access_token,
            refresh_token = body.refresh_token;

        let options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
            console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/game/#' +
            querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            }));
        } else {
        res.redirect('/#' +
            querystring.stringify({
            error: 'invalid_token'
            }));
        }
    });
    }
});

app.get('/refresh_token', function(req, res) {

    // requesting access token from refresh token
    let refresh_token = req.query.refresh_token;
    let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    },
    json: true
    };

    request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        res.send({
        'access_token': access_token
        });
    }
    });
});

const PORT = process.env.PORT || 8080;

//Handling errors
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../Client/build/index.html'));
  })

app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


app.listen(PORT, () => {
    console.log(`Now connected to port ${PORT}`)
});