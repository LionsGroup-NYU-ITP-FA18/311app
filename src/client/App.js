import React, { Component } from 'react';
import { Route, BrowserRouter, withRouter } from 'react-router-dom';
import { Redirect, Switch } from 'react-router';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js';
import IssuesKanban from './components/IssuesKanban.js'
import UserSettings from './components/UserSettings.js'
import IssueDetail from './components/IssueDetail.js'
import Register from './components/Register.js'

const PrivateRoute = ({ component: Component, userLoggedIn, ...rest }) => (
  <Route {...rest} render={(props) => (
    userLoggedIn
      ? <Component {...props} {...rest} />
      : <Redirect to="/" />
  )} />
)

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      mun_id: -1,
      currentUser: ''
    }

    this.changeAfterLogin = this.changeAfterLogin.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  changeAfterLogin(id, username) {
    this.setState({
      loggedIn: true,
      mun_id: id,
      currentUser: username
    })
  }

  signOut() {
    this.setState({
      loggedIn: false
    })
  }

  render() {
    return (
      <div className="app-routes">
        <BrowserRouter>
          <Switch>
              <Route exact path="/" render={(props) => <Login {...props} changeAfterLogin = {this.changeAfterLogin}/>} />
              <PrivateRoute exact path="/issues" component={IssuesKanban} userLoggedIn = {this.state.loggedIn} mun_id = {this.state.mun_id} currentUser = {this.state.currentUser} signOut= {this.signOut}/>
              <PrivateRoute exact path="/issues/:issueId" component={IssueDetail} userLoggedIn = {this.state.loggedIn} />
              <PrivateRoute exact path="/user/:username" component={UserSettings} username = {this.state.currentUser} userLoggedIn = {this.state.loggedIn} mun_id = {this.state.mun_id} signOut= {this.signOut}/>
              <PrivateRoute exact path="/register" component={Register} userLoggedIn = {this.state.loggedIn}
              mun_id = {this.state.mun_id}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default withRouter(App);
