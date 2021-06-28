import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom" 
import './App.css';
import GameController from './GameController';
import GameMode from './Pages/GameMode/GameMode';
import LoadingPage from './Pages/LoadingPage';
import CreateUser from './Components/Users/CreateUser';
import SpotifyWebApi from 'spotify-web-api-js';
import ChoosePlaylist from './Pages/ChoosePlaylist';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route exact strict path = '/' component = {LoadingPage} />
          <Route path = '/game' component = {GameController} />
          {/* <Route path = '/gamemode' component = {GameMode} />
          <Route path = '/choosemusic' component = {ChoosePlaylist} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
