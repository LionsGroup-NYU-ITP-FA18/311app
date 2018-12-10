import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js';
import IssuesKanban from './components/IssuesKanban.js'

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      mun_id: -1,
      currentUser: ''
    }
    
    this.changeAfterLogin = this.changeAfterLogin.bind(this);
  }
  
  changeAfterLogin(id, username) {
    this.setState({
      loggedIn: true,
      mun_id: id,
      currentUser: username
    })
  }

  render() {
    return (
      <div className="app-routes">
        {this.state.loggedIn ? 
          <div className="app-page">
            <IssuesKanban mun_id = {this.state.mun_id} currentUser = {this.state.currentUser}/>
          </div> 
          : <Login changeAfterLogin = {this.changeAfterLogin}/>}
      </div>
    );
  }
}
