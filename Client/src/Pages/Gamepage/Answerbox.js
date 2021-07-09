import React from 'react';
import Scoreboard from '../../Components/Scoreboard'


function AnswerBox({ timer, buttonText, isPlaying, playerPoints, SpotifyIcon}) {


    return (
        <div className="answerBox">
            <div className="timerBox">
                <h1 style={{color: "red", marginTop: "0px"}} >{timer}</h1>
                    <input type="button" className="gameButton" value={buttonText} onClick={() => this.clicker(this.state.currentTrack)}/>
                <h1 style={{color: "red", marginTop: "0px"}}>{isPlaying}</h1>
                <Scoreboard playerPoints={playerPoints} />
                <a href='/login' className="navbar-brand">
                <img src={SpotifyIcon} height="45" alt="Spotify Icon" className="spotifyIcon d-inline-block align-middle mr-2" />
                Refresh Spotify
            </a>
            </div>
        </div>
    );
}

export default AnswerBox;