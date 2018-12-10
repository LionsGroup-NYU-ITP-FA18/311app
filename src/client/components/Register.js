import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Login from './Login.js';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      user_name:'',
      email:'',
      password:''
    }
  }

  handleClick(event){
    var apiBaseUrl = "http://localhost:3000/api/";
    console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
    "first_name": this.state.first_name,
    "last_name":this.state.last_name,
    "email":this.state.email,
    "password":this.state.password
    }
    axios.post(apiBaseUrl+'/register', payload)
   .then(function (response) {
     console.log(response);
     if(response.data.code == 200){
      //  console.log("registration successfull");
       var loginscreen=[];
       loginscreen.push(<Login parentContext={this}/>);
       var loginmessage = "Not Registered yet. Go to registration";
       self.props.parentContext.setState({loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Register",
       isLogin:true
        });
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             label="Enter First Name"
             variant="outlined"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             label="Enter Last Name"
             variant="outlined"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             label="Enter Email"
             variant="outlined"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             label="Enter Username"
             variant="outlined"
             onChange = {(event,newValue) => this.setState({user_name:newValue})}
             />
           <br/>
           <TextField
             label="Password"
             variant="outlined"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <br/>
           <Button label="Register" variant="contained" color="primary" onClick={(event) => this.handleClick(event)}>
            Register Municipality Official
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
export default Register;
