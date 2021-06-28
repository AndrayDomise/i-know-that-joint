import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js'
const spotifyApi = new SpotifyWebApi();

class NowPlaying extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nowPlaying: {name: props.name, albumArt: props.albumArt} || { name: 'Not Checked', albumArt: '' }
        }
    }

    getNowPlaying(){
        spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
            this.setState({
            nowPlaying: { 
                name: response.item.name, 
                albumArt: response.item.album.images[0].url
                }
            });
        })
    }

    render() {
        return (
        <div className="App">
            <div>
            Now Playing: { this.state.nowPlaying.name }
            </div>
            <div>
            <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
            </div>
            <button onClick={() => this.getNowPlaying()}>
                Check Now Playing
            </button>
            <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name That Joint!</label>
                        <input type="text" value={this.state.name} onChange={this.onChangeUserName} className="form-control" />
                    </div>
                </form>
        </div>
        );
    }
};

export default NowPlaying;


