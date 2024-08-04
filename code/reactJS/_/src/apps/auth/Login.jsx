
import React, { Component } from 'react'

export default class Login extends Component{ 

    render() {
        return (
        <div>
            <h1>Login</h1>
            <form onSubmit={this.props.handleLogin}>
                <label htmlFor="login_username_or_email">Username:</label>
                <input type="text" name="login_username_or_email" id="login_username_or_email" />
                <label htmlFor="login_password">Password:</label>
                <input type="text" name="login_password" id="login_password" />
                <button>Login</button>
            </form>
            <p><button onClick={this.props.handleShowRegistrationForm}>Registration</button></p>
        </div>
        )
    }
}
