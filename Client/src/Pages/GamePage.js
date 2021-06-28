import React from 'react';
import axios from 'axios';
import {InputGroup, FormControl, Input} from 'react-bootstrap';
import ls from 'local-storage';
import Scoreboard from '../Components/Scoreboard/Scoreboard';
import SpotifyIcon from '../assets/Icons/SpotifyIcon.png';
import './GamePage.scss';


class GamePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pointCounter: 0,
            playerPoints: 0,
            tracks: [],
            currentTrack: {},
            showAlbumArt: false,
            answer: '',
            timer: 30,
            buttonText: "Go!",
        }
        this.alertTimerClickHandler = this.alertTimerClickHandler.bind(this)
        this.ticker = null;
        this.clicker = this.clicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkTracks = this.checkTracks.bind(this);
    }
    
    async checkTracks(){
        if (this.props.tracks.length){
            this.setState({
                currentTrack: this.props.tracks.pop()
            })
        } else {
            alert("Please refresh your browser!")
        }
    }


    handleChange(e){
        
        this.setState({ 
            answer: e.target.value.toUpperCase() 
        })
    }

    async componentDidMount() {
        const {
            isPlaying,
            teamTurn,
            pointCounter,
            playerPoints,
            answer,
            timer,
            buttonText,
        } = this.state;
        let {
            getPlaylist, 
            isItPlaying,
        } = this.props
        
        let newScore = this.state.pointCounter
        try {
                let status = await isItPlaying()
                let {isActive} = status
                console.log(status);
            if (isActive === true){
                getPlaylist()
                this.setState({
                    pointCounter: 0,
                    timer: 30,
                    buttonText: "Go!",
                })
            }
            else {
            this.setState({playerPoints: newScore + this.state.pointCounter})
            }
        } catch (err){
            console.log("error", err)
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.tracks !== this.props.tracks ||
            prevProps.tracks?.length !== this.props.tracks?.length ||
            prevProps.currentTrack !== this.props.currentTrack
        ) {
            this.setState({
                tracks: this.props.tracks,
            })
        }
    }



    async handleSubmit(e) {
        let{
            isItPlaying,
            skipForward,
            seekPosition,
            pausePlayback, 
        } = this.props

        e.preventDefault()
        e.target.reset()

    let userAnswer = this.state.answer

        try 
            {if (this.state.currentTrack.name.includes(userAnswer)){
                    console.log("Correct!")
                    const awardPoints = this.state.pointCounter
                    this.setState({
                        playerPoints: this.state.playerPoints + awardPoints,
                        buttonText: "Go!",
                        timer: 30,
                        pointCounter: 0,
                        showAlbumArt: true
                    })

            } else {
                console.log("Wrong!")
                    const subtractPoints = 25
                    this.setState({
                        playerPoints: this.state.playerPoints - subtractPoints,
                        buttonText: "Go!",
                        showAlbumArt: false,
                        timer: 30,
                        pointCounter: 0
                    })
            }
        } catch (err){
            console.log("error", err)
        }
    }

    alertTimerClickHandler(){
        if ( this.state.buttonText === "Go!"){
            clearInterval( this.ticker );
            this.ticker = setInterval( newTime.bind(this), 1000 );
            // Starts the timer
            this.setState({buttonText: "I Know That Joint!"});
            function newTime(){
                if (this.state.timer === 0){
                    this.setState({
                        timer: 30,
                        buttonText: "Go!"
                    });
                    clearInterval( this.ticker );
                } 
                else if (this.state.buttonText === "I Know That Joint!") {
                    this.setState((state) => {
                        return { 
                            timer: state.timer - 1,
                            pointCounter: Math.floor(((state.timer - 1) * 10) / 3)
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

    async clicker() {
        let { 
            isItPlaying,
            pausePlayback,
            startPlayback,
        } = this.props
        
        try {

            let status = await isItPlaying()
            let {
                isActive,
                isPlaying
            } = status

            if ( isActive === true && isPlaying === false &&  this.state.buttonText === "Go!" ){
                this.checkTracks()
                this.setState({showAlbumArt: false})
                startPlayback(this.state.currentTrack.uri);
                this.alertTimerClickHandler();
                this.delayAction = setTimeout(() => isItPlaying(), 500)
            } else if ( isActive === true && isPlaying === true && this.state.buttonText === "Go!" ){
                pausePlayback()
                this.setState({
                    pointCounter: 0,
                    timer: 30,
                    buttonText: "Go!",
                })
            } else if ( isActive === true && isPlaying === true && this.state.buttonText == "I Know That Joint!" ){
                console.log("I Know That Joint condition working")
                pausePlayback()
                this.setState({
                    buttonText: "Guessing!"
                })
                this.delayAction = setTimeout(() => isItPlaying(), 500)
            } else if ( isActive === true && isPlaying === false && this.state.buttonText === "Guessing!" ) {
                this.setState({
                    pointCounter: 0,
                    timer: 30,
                    buttonText: "Go!",
                })
            } else if (isActive === false){
                alert("Please activate your Spotify player!")
            }
        } catch (err){
                console.log("error", err)
            }
    }


    render(){
        let { 
            isPlaying,
            loggedIn,
            isActive,
        } = this.props 

        return(
            <div className="Page">
                <div className="container">
                    <div className="row">
                        <div className="gameBoard col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {!loggedIn && isActive ? 
                            <div className="loginButton" >
                                <a href='/login'>
                                    <img src={SpotifyIcon} height="45" alt="Spotify Icon" className="d-inline-block align-middle mr-2" />
                                    Login With Spotify
                                </a>
                            </div> : (
                                <React.Fragment>  
                                            <div className="gamePlay">
                                                <section>
                                                    <div className="artBox">
                                                        {this.state.showAlbumArt && 
                                                        <img src={this.state.currentTrack.image} style={{ height: 400, borderRadius: "5px"}}/>}
                                                    </div>
                                                </section>
                                            <form onSubmit={this.handleSubmit}>
                                                    <div className="form-group">
                                                        <input  
                                                            type="text" 
                                                            name="value"
                                                            placeholder={"Can you name that joint?"} 
                                                            className="form-control" 
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>
                                                        <div className="form-group">
                                                    </div>
                                            </form>
                                            <div className="answerBox">
                                            <div className="timerBox">
                                                <h1 style={{color: "red", marginTop: "0px"}} >{this.state.timer}</h1>
                                                    <input type="button" className="gameButton" value={this.state.buttonText} onClick={() => this.clicker(this.state.currentTrack)}/>
                                                <h1 style={{color: "red", marginTop: "0px"}}>{isPlaying}</h1>
                                                <Scoreboard playerPoints={this.state.playerPoints} />
                                                <a href='/login' className="navbar-brand">
                                                    <img src={SpotifyIcon} height="45" alt="Spotify Icon" className="spotifyIcon d-inline-block align-middle mr-2" />
                                                    Refresh Spotify
                                                </a>
                                                </div>
                                            </div>
                                            </div>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default GamePage;