import React, { Component } from "react";

import Login from "./Login";
import WelcomeLoggedUser from "./WelcomeLoggedUser";
import UserList from "./UserList";
import Registration from "./Registration";
import { users_database } from "./Database";

import { ppp } from "../mu11da8may_js/src/debug";
import {
  isValidDisplayName,
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../mu11da8may_js/src/validators/auth";
import { generateNewUserIdUUID } from "../mu11da8may_js/src/generate";

ppp(users_database);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      user: null,
      show_page_registration: false,
      msg: [],
    };
  }

  changePassword = () => {};
  changeUsername = () => {};
  changeEmail = () => {};
  changeDisplayName = () => {};
  deleteUser = () => {};

  handleLogin = (e) => {
    e.preventDefault();

    const login_username_or_email = e.target.login_username_or_email.value;
    const password = e.target.login_password.value;

    let msg = [];

    if (!isValidUsername(login_username_or_email))
      msg.push("Invalid email or username");
    if (!isValidPassword(password)) msg.push("Invalid password");

    if (msg.length > 1) {
      this.setState((prevV) => ({
        msg: msg,
      }));
    } else {
      let user = this.state.users.filter((item) => {
        return (
          item.username === login_username_or_email ||
          item.email === login_username_or_email
        );
      });

      if (user.length === 1) {
        let users = [...this.state.users];
        user = users[users.findIndex((u) => u.id === user[0].id)];

        if (user.password === e.target.login_password.value) {
          user.dateLastSeen = new Date();

          this.setState((prevV) => ({
            user: user,
            users: users,
            show_page_registration: false,
            msg: ["Success login"],
          }));
        } else {
          this.setState((prevV) => ({
            msg: ["Password is not correct"],
          }));
        }
      } else {
        this.setState((prevV) => ({
          msg: ["User not found"],
        }));
      }
    }
  };

  formNewUser = (email, username, password, displayName) => {
    return {
      id: generateNewUserIdUUID(),
      email: email,
      username: username,
      password: password,
      displayName: displayName,
      dateRegistration: new Date(),
      dateLastSeen: new Date(),
    };
  };

  handleRegistration = (e) => {
    e.preventDefault();

    const email = e.target.registration_email.value;
    const username = e.target.registration_username.value;
    const password = e.target.registration_password.value;
    const displayName = e.target.registration_displayName.value;

    let msg = [];

    if (!isValidEmail(email)) msg.push("Invalid email");
    if (!isValidUsername(username)) msg.push("Invalid username");
    if (!isValidPassword(password)) msg.push("Invalid password");
    if (!isValidDisplayName(displayName)) msg.push("Invalid display name");

    if (msg.length > 1) {
      this.setState((prevV) => ({
        msg: msg,
      }));
    } else {
      let user_is_exists = this.state.users.find((item) => {
        return item.username === username || item.email === email;
      });
      if (user_is_exists) {
        this.setState((prevV) => ({
          msg: ["Username or email already exists"],
        }));
      } else {
        let users = [...this.state.users];
        let user = this.formNewUser(email, username, password, displayName);
        users.push(user);
        this.setState((prevV) => ({
          user: user,
          users: users,
          show_page_registration: false,
          msg: [
            `You registered as ${email} ${username}`,
            `You logged as ${email} ${username}`,
          ],
        }));
      }
    }
  };

  handleShowRegistrationForm = (e) => {
    this.setState((prevV) => ({
      show_page_registration: true,
      msg: [],
    }));
  };

  handleLogout = (e) => {
    let users = [...this.state.users];
    let user = users[users.findIndex((u) => u.id === this.state.user.id)];

    user.dateLastSeen = new Date();

    this.setState((prevV) => ({
      user: null,
      users: users,
      show_page_registration: false,
      msg: ["You are logged"],
    }));
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.msg.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
        {this.state.user ? (
          <WelcomeLoggedUser
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
        ) : this.state.show_page_registration ? (
          <Registration onSubmit={this.handleRegistration} />
        ) : (
          <Login
            handleShowRegistrationForm={this.handleShowRegistrationForm}
            handleLogin={this.handleLogin}
          />
        )}
        <UserList users={this.state.users} />
      </div>
    );
  }
}
