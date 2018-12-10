import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import IssuesKanban from './IssuesKanban.js'

class Login extends Component {
  constructor(props) {
    super(props);
    this._handleUsernameChange = this._handleUsernameChange.bind(this);
    this._handlePasswordChange = this._handlePasswordChange.bind(this);
    this.state= {
      username:'',
      password:''
  }}

  _handleClick(event){
     var apiBaseUrl = "http://localhost:3000/api/";
     var self = this;
     var payload={
       "username":this.state.username,
       "password":this.state.password
     }

     axios.post(apiBaseUrl+'login', payload)
     .then(function (response) {
       console.log(response);
       if(response.data.code == 200){
         console.log("Login successful");
         self.props.changeAfterLogin(response.data.mun_id, payload.username);
       } else if(response.data.code == 204){
         alert("Username and password do not match");
       } else{
         alert("Username does not exist");
       }
       })
     .catch(function (error) {
       console.log(error);
     });
  }

  _handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
  }

  _handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
  }

  render() {
      return (
        <div>
          <MuiThemeProvider>
            <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  Welcome to the Municipality 311 App
                </Typography>
              </Toolbar>
            </AppBar>
            <br/>
             <TextField
               label="Enter Username"
               variant="outlined"
               name="username"
               value={this.state.username}
               onChange = {this._handleUsernameChange}
               />
             <br/>
               <TextField
                 type="password"
                 name="password"
                 label="Enter Password"
                 variant="outlined"
                 value={this.state.password}
                 onChange = {this._handlePasswordChange}
                 />
               <br/>
               <Button label="Login" variant="contained" color="primary" onClick={(event) => this._handleClick(event)}>
                Login
               </Button>
           </div>
           </MuiThemeProvider>
        </div>
      );
    }
}
const style = {
 margin: 15,
};
export default Login;
