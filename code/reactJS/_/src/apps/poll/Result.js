
import React from "react";

export default class Result extends React.Component {
    render(){
        const {score} = (this.props);
        return (
            <div>
              <p>Finish</p>
              <p>Score: {score}</p>
            </div>
        )
    }
}

