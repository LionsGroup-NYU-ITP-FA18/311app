import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username}, Welcome to the 311 app`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={logo} alt="react" />
      </div>
    );
  }
}
