import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this._handleFirstnameChange = this._handleFirstnameChange.bind(this);
    this._handleLastnameChange = this._handleLastnameChange.bind(this);
    this._handleAdminChange = this._handleAdminChange.bind(this);
    this._handlePasswordChange = this._handlePasswordChange.bind(this);
    this._handleUsernameChange = this._handleUsernameChange.bind(this);
    this._handleEmailChange = this._handleEmailChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state={
      first_name:'',
      last_name:'',
      username:'',
      email:'',
      password:'',
      admin:'0'
    }
  }

    goBack(){
        this.props.history.goBack();
    }

  _handleClick(event){
    var self = this;
    // Don't use this in if statement, will evaluate to 0 and statement will fail
    var numAdmin = parseInt(this.state.admin);
    if(this.state.first_name && this.state.last_name && this.state.username
    && this.state.email && this.state.password && this.state.admin) {
        var payload={
          "first_name": this.state.first_name,
          "last_name":this.state.last_name,
          "email":this.state.email,
          "password":this.state.password,
          "admin":numAdmin,
          "username":this.state.username,
          "mun_id":self.props.mun_id
        }
        axios.post('/api/register', payload)
       .then(function (response) {
         console.log(response);
         if(response.data.code == 200){
           alert("registration successful");
           self.goBack();
            }
         })
       .catch(function (error) {
         console.log(error);
       });
     } else {
       alert("Please fill all fields before registering user!");
     }
  }

  _handleFirstnameChange(e) {
        this.setState({
            first_name: e.target.value
        });
  }

  _handleLastnameChange(e) {
        this.setState({
            last_name: e.target.value
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

  _handleAdminChange(e) {
        this.setState({
            admin: e.target.value
        });
  }

  _handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={this.props.grow}>
                User Registration
              </Typography>
              <Button variant="contained" color="primary" onClick={(event) => this.props.history.goBack()}>
                  Back to User Settings
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{display: 'flex', justifyContent: 'center'}}>
             <TextField
               name="first name"
               label="Enter First Name"
               variant="outlined"
               value={this.state.first_name}
               onChange = {this._handleFirstnameChange}
               />
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
               <TextField
                 name="last name"
                 label="Enter Last Name"
                 variant="outlined"
                 value={this.state.last_name}
                 onChange = {this._handleLastnameChange}
                 />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
               <TextField
                 name="username"
                 label="Enter User name"
                 variant="outlined"
                 value={this.state.username}
                 onChange = {this._handleUsernameChange}
                 />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
               <TextField
                 name="email"
                 label="Enter Email"
                 variant="outlined"
                 value={this.state.email}
                 onChange = {this._handleEmailChange}
                 />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                 <TextField
                   type="password"
                   name="password"
                   label="Enter Password"
                   variant="outlined"
                   value={this.state.password}
                   onChange = {this._handlePasswordChange}
                   />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Admin</FormLabel>
              <RadioGroup
                aria-label="Admin"
                name="admin"
                value={this.state.admin}
                onChange={this._handleAdminChange}
                >
                <FormControlLabel value="1" control={<Radio />} label="Admin" />
                <FormControlLabel value="0" control={<Radio />} label="Non-admin" />
              </RadioGroup>
              </FormControl>
              </div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
               <Button label="Register" variant="contained" color="primary" onClick={(event) => this._handleClick(event)}>
                Register Municipality Official
               </Button>
               </div>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;
