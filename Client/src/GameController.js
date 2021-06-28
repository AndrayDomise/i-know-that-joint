import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import lodash from 'lodash';
import SpotifyWebApi from 'spotify-web-api-js';
import GamePage from './Pages/GamePage';

const spotifyApi = new SpotifyWebApi();

class GameController extends Component {
    constructor(props){
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
        spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            tracks: [],
            isPlaying: false,
            isActive: false
        }


        this.getNowPlaying = this.getNowPlaying.bind(this);
        this.isItPlaying = this.isItPlaying.bind(this);
        this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
        this.getPlaylist = this.getPlaylist.bind(this);
        this.shufflePlaylist = this.setVolume.bind(this);
        this.getPlaybackState = this.getPlaybackState.bind(this);
        this.startPlayback = this.startPlayback.bind(this);
        this.pausePlayback = this.pausePlayback.bind(this);
        this.skipForward = this.skipForward.bind(this);
        this.seekPosition = this.seekPosition.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.clearScreen = this.clearScreen.bind(this);
        this.isItActive = this.isItActive.bind(this);
        this.shuffle = this.shuffle.bind(this);
    }
    
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
        }
        return hashParams;
    }

    clearScreen(){
        if (this.isPlaying === false){
                this.setState({
                    nowPlaying: { 
                        name: '',
                        albumArt: ''
                        }
                })
        } else {
            console.log('nothing to clear!')
        }
    }

    shuffle(arr) {
        var i = arr.length, j, temp;
        while(--i > 0){
            j = Math.floor(Math.random()*(i+1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
    }
    
    getPlaylist(){
        spotifyApi.getPlaylist('37i9dQZF1DXb57FjYWz00c').then((data) => {
            let tracks = data.tracks.items.map(function(item){
                return {
                    name: item.track.name.toUpperCase(),
                    id: item.track.id,
                    href: item.track.href,
                    image: item.track.album.images[0].url,
                    uri: item.track.uri
                };
            })
            this.shuffle(tracks)
            this.setState({
                tracks: tracks
            })
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }

    getPlaylistTracks(){
        
        spotifyApi.getPlaylistTracks('37i9dQZF1DXb57FjYWz00c', {
            offset: 0,
            limit: 100,
            fields: 'items(track(name,href))'
        })
        .then((response) => {
                this.setState({
                    tracks: response.items
                })
                console.log(response.items);
            },
            function(err) {
                console.log('Something went wrong!', err);
            }
        );
    }

    shufflePlaylist(){
        spotifyApi.setShuffle(true)
        .then(function() {
            console.log('Shuffle is on.');
        }, function  (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
    }

    getPlaybackState(){
        spotifyApi.getMyCurrentPlaybackState().then(function(data) {
    // Output items
            if (data.body && data.body.is_playing) {
                console.log("User is currently playing something!");
            } else {
                console.log("User is not playing anything, or doing so in private.");
            }
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }

    async startPlayback(uri){
        try {
            await spotifyApi.play({
                uris: [uri],
                position_ms: 35000
            })
            console.log('Playback started');
        } catch (err) {
            console.log('Something went wrong!', err);
        };
    }

    async pausePlayback(){
        try{
            await spotifyApi.pause()
            console.log('Playback paused');
        } catch(err) {
            console.log('Something went wrong!', err);
        }
    }

    getNowPlaying(){
        spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
            this.setState({
                name: response.item.name.toUpperCase(), 
                albumArt: response.item.album.images[0].url,
                isPlaying: true
            });
        })
    }

    isItActive(){
        spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
            this.setState({
                isActive: response.device.is_active
            });
        })
    }

    async isItPlaying(){
        try {
            let response = await spotifyApi.getMyCurrentPlaybackState()
            console.log(response)
            if (response !== null){
                this.setState({
                    isPlaying: response.is_playing,
                    isActive: response.device ? response.device.is_active : false
                });
            } else {
                this.setState({
                    isPlaying: false
                });
            }
            return {
                isPlaying: response.is_playing,
                isActive: response.device ? response.device.is_active : false
            }
        } catch (err){
            console.log("error", err)
        }
    }

    async skipForward(){
        try{
            await spotifyApi.skipToNext()
            console.log('Skip to next');
        } catch (err) {
            console.log('Something went wrong!', err);
        };
    }

    async seekPosition(){
        try {
            await spotifyApi.seek(35000)
            console.log('Seek to ' + 35000);
        } catch (err) {
            console.log('Something went wrong!', err);
        };
    }
    
    setVolume(){
        spotifyApi.setVolume(75)
        .then(function () {
            console.log('Setting volume to 75.');
            }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
    }
    

    
    render() {
        return (
        <div className="App">
                    <GamePage 
                        isItPlaying={this.isItPlaying}
                        getNowPlaying={this.getNowPlaying}
                        pausePlayback={this.pausePlayback}
                        getPlaylistTracks = {this.getPlaylistTracks}
                        getPlaylist = {this.getPlaylist}
                        shufflePlaylist = {this.setVolume}
                        getPlaybackState = {this.getPlaybackState}
                        startPlayback = {this.startPlayback}
                        skipForward = {this.skipForward}
                        seekPosition = {this.seekPosition}
                        setVolume = {this.setVolume}
                        isItActive= {this.isItActive}
                        clearScreen = {this.clearScreen}
                        {...this.state}
                    />
        </div>
        );
    }
}

export default GameController;