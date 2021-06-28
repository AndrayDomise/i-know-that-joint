import spotifyApi from '../Actions/TokenSetter';

function getPlaylist(){
    spotifyApi.getPlaylist('5ieJqeLJjjI8iJWaxeBLuK')
    .then(function(data) {
        console.log('Some information about this playlist', data.body);
    }, function(err) {
        console.log('Something went wrong!', err);
    });
}

export default getPlaylist;