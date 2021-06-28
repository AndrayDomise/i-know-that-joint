import React from 'react';
import { Link } from "react-router-dom" 
import axios from 'axios';
import Header from '../Components/Header/Header';
import './LoadingPage.scss';
import Background from '../assets/Images/LoadingBackground.jpg'
import SpotifyIcon from '../assets/Images/LoadingBackground.jpg'

class LoadingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        return(
            <div className="Page">
                <Header />
                <div className="background">
                </div>
            </div>
        )
    }
};

export default LoadingPage;