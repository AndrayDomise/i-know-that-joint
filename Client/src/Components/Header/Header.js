import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import SpotifyIcon from '../../assets/Icons/SpotifyIcon.png'
import './Header.scss'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }


    render(){
        return(
            <div className="Page">
                <header>
                    <nav className="navbar navbar-expand-lg py-5 navbar-dark bg-dark">
                        <div className="navLogin col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <a href='/login' className="navbar-brand">
                                <img src={SpotifyIcon} height="45px" alt="Spotify Icon" className="d-inline-block align-middle mr-2" />
                                Login With Spotify
                            </a>
                        </div>
                        
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
};

export default Header;