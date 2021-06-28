import React from 'react';
import './Counter.scss'

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            timer2: props.timeLimit2 || 30,
            buttonText: "Go!",
            playing: {name: props.name, albumArt: props.albumArt} || { name: "Not playing", albumArt: '' }
        }
        this.alertTimerClickHandler2 = this.alertTimerClickHandler2.bind(this)
        this.ticker2 = null;
    }


    alertTimerClickHandler2(){
        if ( this.state.buttonText === "Go!" || this.state.buttonText === "Guessing!" ){
            
            // Starts the timer2
            this.setState({buttonText: "I know that joint!"});
            function newTime(){
                if (this.state.timer2 == 0){
                    this.props.expireFunction();
                    this.setState({
                        timer2: this.props.timeLimit,
                        buttonText: "Go!"
                    });
                    clearInterval( this.ticker2 );
                } else {
                    this.props.updateTimer(this.state.timer2)
                    this.setState((state, props) => {
                        return { 
                            timer2: state.timer2 - 1,
                        }
                    })
                }
            }
            this.ticker2 = setInterval( newTime.bind(this), 1000 );
        } else {
            this.setState({buttonText: "Guessing!"});
            clearInterval ( this.ticker2 );
        }
    }

    showAlert(){ 
        alert ( "Time's Up!" );
        this.setState({
            timer2: this.props.timeLimit,
            buttonText: "Go!"
        });
    }

    getNowPlaying = this.props.getNowPlaying;
    pausePlayback = this.props.pausePlayback
    startPlayback = this.props.startPlayback;
    shufflePlaylist = this.props.setVolume;
    getPlaybackState = this.props.getPlaybackState;
    skipForward = this.props.skipForward;
    seekPosition = this.props.seekPosition;
    setVolume = this.props.setVolume;

    clicker2 = () => {
        this.alertTimerClickHandler2() 
        this.pausePlayback()
    }


    render(){
        return(
            <div>
                <h1 style={{color: "red"}} >{this.state.timer2}</h1>
                <input type="button" className="timer2Button" value={this.state.buttonText} onClick={this.clicker2}/>
            </div>
        )
    }
};

export default Counter;