import React from 'react';
import './ChoosePlaylist.scss'
import CassettePlayer from '../assets/Images/CassettePlayer.jpeg';
import CDPlayer from '../assets/Images/CDplayer.jpeg';
import mp3 from '../assets/Images/mp3.jpeg';
import SmartPhone from '../assets/Images/Smartphone.jpeg';






class ChoosePlaylist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }


    render(){

        return(
            <div className="container">
                <h1 style={{color: "red"}}>
                        Choose Your Era!
                    </h1>  
                <div className="row">
                    <div className="col">
                        <img src={CassettePlayer} className="cassette" />
                    </div>
                    <div className="col">
                        <img src={CDPlayer} className="cd" />
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                        <img src={mp3} className="mp3" />
                    </div>
                    <div className="col">
                        <img src={SmartPhone} className="smartPhone" />
                    </div>
                </div>
            </div>
        )
    }
};

export default ChoosePlaylist;