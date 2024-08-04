
import React, { Component } from 'react'

export default class Registration extends Component{ 

    render() {
        return (
        
        <div>
            <h1>Registration</h1>
            <form onSubmit={this.props.onSubmit}>
                <div> 
                    <label htmlFor='registration_email'>Email</label> 
                    <input name='registration_email' id='registration_email' type='text' /> 
                </div> 
                <div> 
                    <label htmlFor='registration_username'>Username</label> 
                    <input name='registration_username' id='registration_username' type='text' /> 
                </div>
                 
                <div> 
                    <label htmlFor='registration_password'>Password</label> 
                    <input name='registration_password' id='registration_password' type='text' /> 
                </div> 
                <div> 
                    <label htmlFor='registration_displayName'>Display name</label> 
                    <input name='registration_displayName' id='registration_displayName' type='text' /> 
                </div> 
                <button>Register</button>
            </form>
        </div>

        )
    }
}