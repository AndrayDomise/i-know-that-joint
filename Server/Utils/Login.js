const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './Config.env'})
const bodyParser = require('body-parser');
const morgan = require('morgan');
let request = require('request');
let querystring = require('querystring');
const cookieParser = require('cookie-parser');

const app = express();


app.use(morgan('dev'));
app.use(cors());

app.use(express.json({extended: false}));

const makeid = (length) => {
    var result = "";
    var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// helper function to generate a random number
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const initiateSpotifyLogin = () => {
    // Generate the code verifier and its base 64 encoded hash
    const codeVerifier = makeid(getRandomInt(43, 128));
    const hash = sha256(codeVerifier);
    const codeChallenge = encode(hash, true);
    const state = makeid(12);

    // Set the code verifier and state in local storage so we can check it later
    sessionStorage.setItem("spotify-code-verifier", codeVerifier);
    sessionStorage.setItem("spotify-state", state);

    // construct the authentication url
    const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=http://localhost:3000/auth&scope=user-follow-modify&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    // open the spotify authentication page
    window.open(authURL);
};
