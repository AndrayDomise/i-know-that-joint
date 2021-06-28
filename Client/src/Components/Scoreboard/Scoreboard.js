import React from 'react';

class Scoreboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }


    render(){

        return(
            <div>
                <h1 style={{color: "red", marginTop: "50px"}}>Your Score: {this.props.playerPoints}</h1>
            </div>
        )
    }
};

export default Scoreboard;