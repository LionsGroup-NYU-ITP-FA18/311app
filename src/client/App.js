import React, { Component } from 'react';
import IssuesKanban from './components/IssuesKanban.js';
import IssuesList from './components/IssuesList.js';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  state = { username: null,
            useLanes: true};

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {username ? 
          <div>
            <h1>{`Hello ${username}, Welcome to the 311 app`}</h1> 
            <IssuesKanban />  
          </div> 
        : <h1>Loading.. please wait!</h1>}
      </div>
    );
  }
}
