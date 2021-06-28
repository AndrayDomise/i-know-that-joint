import React from 'react';
import './Counter.scss'

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            timer: props.timeLimit || 30,
            buttonText: "Go!",
        }
        this.alertTimerClickHandler = this.alertTimerClickHandler.bind(this)
        this.ticker = null;
        this.clicker = this.clicker.bind(this);
    }

    alertTimerClickHandler(){
        if ( this.state.buttonText === "Go!"){
            
            this.ticker = setInterval( newTime.bind(this), 1000 );
            // Starts the timer
            this.setState({buttonText: "I Know That Joint!"});
            function newTime(){
                if (this.state.timer === 0){
                    this.setState({
                        timer: this.props.timeLimit,
                        buttonText: "Go!"
                    });
                    clearInterval( this.ticker );
                } 

                else if (this.state.buttonText === "I Know That Joint!") {
                    this.props.updateTimer(this.state.timer)
                    this.setState((state, props) => {
                        return { 
                            timer: state.timer - 1,
                        }
                    })
                }
            }
            
        } 
        else {
            this.setState({buttonText: "Guessing!"});
            clearInterval ( this.ticker );
        }
    }

    showAlert(){ 
        alert ( "Time's Up!" );
        this.setState({
            timer: this.props.timeLimit,
            buttonText: "Go!"
        });
    }

    givePoints(){
        this.setState({
            timer:this.props.timeLimit,
        })
    }

    pausePlayback = this.props.pausePlayback
    clicker1 = () => {
        this.alertTimerClickHandler() 
        this.pausePlayback()
    }

    // isItPlaying(){
    //     spotifyApi.getMyCurrentPlaybackState()
    //     .then((response) => {
    //         if (response.body && response.body.is_playing == "true"){
    //             this.setState({
    //                 nowPlaying: { 
    //                     name: response.item.name, 
    //                     albumArt: response.item.album.images[0].url
    //                 },
    //                 isPlaying: true
    //             })
    //         } else {
    //             this.setState({
    //                 isPlaying: false
    //             })
    //         };
    //     }, function(err) {
    //         console.log('Something went wrong!', err);
    //     });
    // }

    // isItPlaying(){
    //     spotifyApi.getMyCurrentPlaybackState().then(function(data) {
    // // Output items
    //         if (data.body && data.body.is_playing) {
    //             this.setState({
    //                 isPlaying: true
    //             })
    //         } else {
    //             this.setState({
    //                 isPlaying: false
    //             })
    //         }
    //     }, function(err) {
    //         console.log('Something went wrong!', err);
    //     });
    // }

    

    async clicker() {
        let { 
            getNowPlaying, 
            isItPlaying,
            getPlaylistTracks,
            getPlaylist,
            pausePlayback,
            shufflePlaylist,
            getPlaybackState,
            startPlayback,
            skipForward,
            seekPosition,
            setVolume,
            isPlaying
        } = this.props
        
        

        try {
            if ( isPlaying === false &&  this.state.buttonText === "Go!" ){
                await startPlayback();
                this.alertTimerClickHandler();
                this.delayAction = setTimeout(() => isItPlaying(), 500)
            } 
            
            // else if ( isPlaying === true && this.state.buttonText === "Go!" ){
            //     await pausePlayback(); 
            //     await skipForward(); 
            //     await seekPosition();

            // } 

            else if ( isPlaying === true && this.state.buttonText == "I Know That Joint!" ){
                console.log("I Know That Joint condition working")
                await pausePlayback()
                this.setState({
                    buttonText: "Guessing!"
                })
                this.delayAction = setTimeout(() => isItPlaying(), 500)

            }   

            else {
                skipForward()
                seekPosition()
                this.delayAction = setTimeout(() => pausePlayback(), 250) 
                this.setState({
                    timer: this.props.timeLimit,
                    buttonText: "Go!"
                })
            }
        } catch (err){
            console.log("This messed up because", err)
        }
    }



    render(){

        let { 
            getNowPlaying, 
            isItPlaying,
            getPlaylistTracks,
            getPlaylist,
            pausePlayback,
            shufflePlaylist,
            getPlaybackState,
            startPlayback,
            skipForward,
            seekPosition,
            setVolume,
            isPlaying
        } = this.props

        return(
            <div>
                <h1 style={{color: "red"}} >{this.state.timer}</h1>
                <input type="button" className="timer1Button" value={this.state.buttonText} onClick={() => this.clicker()}/>
                <h1 style={{color: "red"}}>{isPlaying}</h1>
            </div>
        )
    }
};

export default Counter;