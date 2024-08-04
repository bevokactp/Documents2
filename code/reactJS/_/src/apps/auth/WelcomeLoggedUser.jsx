
import React, { Component } from 'react'

export default class WelcomeLoggedUser extends Component{ 

    render() {
        return (
        <div>
            <h1>Welcome { this.props.user.displayName }</h1>
            <button onClick={ this.props.handleLogout }>Logout</button>
        </div>
        )
    }
}