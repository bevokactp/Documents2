
import React, { Component } from 'react'

export default class UserList extends Component{ 

    render() {
        const { users } = this.props;
        return (
        <div>
            <p>Users: {users.length}</p>
            { users.length 
            ?
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>№</td>
                            <td>id</td>
                            <td>username</td>
                            <td>email</td>
                            <td>password</td>
                            <td>display name</td>
                            <td>date last seen</td>
                            <td>date registration</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, user_id) => (
                        <tr key={user_id}>
                            <td>{user_id + 1}</td>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.displayName}</td>
                            <td>{user.dateLastSeen.toLocaleDateString()}</td>
                            <td>{user.dateRegistration.toLocaleDateString()}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div> 
            :
            <p>(no users)</p> 
            }
        </div>
        )
    }
}