import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this._handleUserChange = this._handleUserChange.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.state = {
      user_remove:'',
      admin:0,
      email:'',
      first_name:'',
      last_name:'',
      municipality: {}
    };
  }

  componentDidMount() {
    var self = this;
    axios.get("/api/users/"+this.props.username)
    .then(function (response) {
      console.log(response);
      self.setState({
        admin: response.data[0].admin,
        email: response.data[0].email,
        first_name: response.data[0].first_name,
        last_name: response.data[0].last_name
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    // Get Municipality Info
    axios.get("/api/municipality/"+this.props.mun_id)
    .then(function (response) {
      console.log(response);
      self.setState({
        municipality: response.data[0]
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    _handleUserChange(e) {
        this.setState({
          user_remove: e.target.value
        });
    }

    removeUser(event) {
      if(this.state.user_remove === this.props.username) {
        alert("Cannot remove yourself!")
      } else {
        axios.delete("/api/users/"+this.state.user_remove)
        .then(function (response) {
          console.log(response);
          alert("User Deleted!");
          })
        .catch(function (error) {
          console.log(error);
        });
      }
    }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className={this.props.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit" className={this.props.grow}>
                  User Settings
                </Typography>
                <Button variant="contained" color="primary" onClick={(event) => this.props.history.goBack()}>
                    Back to Issues
                </Button>
                <Button variant="contained" color="primary" onClick={(event) => this.props.signOut()}>
                    Sign Out
                </Button>
              </Toolbar>
            </AppBar>
            <div className={this.props.root}>
              <List component="nav">
                <ListItem>
                  <ListItemText primary="Username" />
                  <ListItemText primary={this.props.username} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="First name" />
                  <ListItemText primary={this.state.first_name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Last name" />
                  <ListItemText primary={this.state.last_name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email" />
                  <ListItemText primary={this.state.email} />
                </ListItem>
              </List>
              <Divider />
              <List component="nav">
              {(this.state.admin === 1) ?
                <div>
              <Button variant="contained" color="primary" onClick={(event) => this.props.history.push('/register/')} >
                  Register New User
                </Button>
                <Divider />
                <TextField
                  name="Remove User"
                  label="Remove User"
                  variant="outlined"
                  value={this.state.user_remove}
                  onChange = {this._handleUserChange}
                  />
                <Button variant="contained" color="primary" onClick={(event) => this.removeUser(event)}>
                    Remove user
                </Button>
                </div>
                : <div />}
              </List>
              <List component="munDetails">
                <ListItem>
                  <ListItemText primary="Municipality Name" />
                  <ListItemText primary={this.state.municipality.mun_name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Municipality Level" />
                  <ListItemText primary={this.state.municipality.mun_level} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Municipality Contact Email" />
                  <ListItemText primary={this.state.municipality.contact_email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Municipality Contact Number" />
                  <ListItemText primary={this.state.municipality.contact_number} />
                </ListItem>
              </List>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

}

UserSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSettings);
