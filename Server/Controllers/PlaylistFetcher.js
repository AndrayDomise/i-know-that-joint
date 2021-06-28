var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URL
})

let fetchPlayList = spotifyApi.getPlaylist('37i9dQZF1DXb57FjYWz00c').then(function(data) {
        console.log('Some information about this playlist', data.body);
    }, function(err) {
        console.log('Something went wrong!', err);
    });
