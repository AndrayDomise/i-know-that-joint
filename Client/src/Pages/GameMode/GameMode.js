import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './GameMode.scss'
import FourTapes from '../../assets/Images/FourTapes.jpeg';
import OneTape from '../../assets/Images/OneTape.jpeg';

class GameMode extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }


    render(){
        return(
            <div>
                <div>
                    <h1 style={{color: "red"}}>Team</h1>
                    <img src={FourTapes} className="fourTapes" />
                </div>
                <span className="divider" />
                <div>
                    <h1 style={{color: "red"}}>Solo</h1>
                    <img src={OneTape} className="oneTape"/>
                </div>
            </div>
        )
    }
};

export default GameMode;