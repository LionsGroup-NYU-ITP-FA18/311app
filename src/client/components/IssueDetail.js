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
import UserSelection from './UserSelection.js';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class IssueDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issue: {},
      comments: []
    }
    this._assignUser = this._assignUser.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  getComments() {
    var arr = []
    this.state.comments.map((comment) => {
      arr.push(<Divider />)
      arr.push(
        <ListItem button>
          <ListItemText primary={comment.content} />
        </ListItem>
      )
    })
    return arr
  }

  _assignUser(name) {
    var self = this;
    var payload={
      "username":name,
      "issueId":this.state.issue.issueId
    }

    axios.put("/api/issues/update/user/"+this.state.issue.issueId, payload)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


    var temp = this.state.issue;
    if(name != "" && this.state.issue.progress === "New") {
      temp.progress = "In Progress";
      var payload={
        "progress":"In Progress",
        "issueId":this.state.issue.issueId
      }

      axios.put("/api/issues/update/progress/"+this.state.issue.issueId, payload)
      .then(function (response) {
        console.log(response);
        self.props.getIssues();
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    // Rerender page
    temp.username = name;
    this.setState({
      issue: temp
    });
  }

  componentDidMount() {
    var self = this;
    axios.get("/api/issues/"+this.props.match.params.issueId)
    .then(function (response) {
      console.log(response);
      self.setState({
        issue: response.data[0]
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get("/api/comments/"+this.props.match.params.issueId)
    .then(function (response) {
      console.log(response);
      self.setState({
        comments : response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className={this.props.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit" className={this.props.grow}>
                  Issue Details
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
              <List component="issueDetails">
                <ListItem button>
                  <ListItemText primary="Category" />
                  <ListItemText primary={this.state.issue.category} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Heading" />
                  <ListItemText primary={this.state.issue.heading} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Report contents" />
                  <ListItemText primary={this.state.issue.content} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Location" />
                  <ListItemText primary={this.state.issue.location} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="City" />
                  <ListItemText primary={this.state.issue.city} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="County" />
                  <ListItemText primary={this.state.issue.county} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="State" />
                  <ListItemText primary={this.state.issue.state} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Upvotes" />
                  <ListItemText primary={this.state.issue.upvote} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Downvotes" />
                  <ListItemText primary={this.state.issue.downvote} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="User In Charge" />
                  <ListItemText primary={this.state.issue.username === "" ?
                "Not Yet Assigned" : this.state.issue.username } />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Progress" />
                  <ListItemText primary={this.state.issue.progress} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Priority" />
                  <ListItemText primary={this.state.issue.priority} />
                </ListItem>
              </List>
              <Divider />
              <Typography component="p">
              {this.state.issue.mun_id ?
              <UserSelection assignUser={this._assignUser}  mun_id={this.state.issue.mun_id}/>
              : <div />
              }
              </Typography>
            </div>
            <div>
              <List component="comments">
                <ListItem />
                <ListItem>
                  <ListItemText primary="User Comments" />
                </ListItem>
                {this.getComments()}
              </List>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

// Note within user selection;
// we check whether this state has updated prior to passing
// it as a prop so we guarantee it won't be undefined

IssueDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IssueDetail);
