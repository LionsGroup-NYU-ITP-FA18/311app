import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserSelection from './UserSelection.js';
import axios from 'axios';

export default class CustomCard extends Component {

  constructor(props) {
    super(props);
    this._progressUp = this._progressUp.bind(this);
    this._progressDown = this._progressDown.bind(this);
    this._assignUser = this._assignUser.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
  }

  updateProgress(progress) {
    var self = this;
    var payload={
      "progress":progress,
      "issueId":this.props.issue.issueId
    }

    axios.put("/api/issues/update/progress/"+this.props.issue.issueId, payload)
    .then(function (response) {
      console.log(response);
      self.props.getIssues();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  _progressUp(event) {
    var progress = this.props.issue.progress;
    if(progress === "New") {
      progress = "In Progress";
    } else if(progress === "In Progress") {
      progress = "Needs Review";
    } else if(progress === "Needs Review") {
      progress = "Done";
    }
    this.updateProgress(progress);
  }

  _progressDown(event) {
    var progress = this.props.issue.progress;
    if(progress === "Done") {
      progress = "Needs Review";
    } else if(progress === "Needs Review") {
      progress = "In Progress";
    } else if(progress === "In Progress") {
      progress = "New";
    }
    this.updateProgress(progress);
    if(progress === "New")
      this._assignUser(""); // If moved back as new issue, should not have user assigned to it
  }

  _assignUser(name) {
    var self = this;
    var payload={
      "username":name,
      "issueId":this.props.issue.issueId
    }

    axios.put("/api/issues/update/user/"+this.props.issue.issueId, payload)
    .then(function (response) {
      console.log(response);
      self.setState({
        user: name
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    if(name != "")      // Don't put issue in progress if there's no user for it
      this._progressUp();
  }

  render() {
    return (
      <Card className={this.props.card}>
        <CardContent>
          <Typography className={this.props.title} color="textSecondary" gutterBottom>
            {this.props.issue.category}
          </Typography>
          <Typography variant="h5" component="h2">
            {this.props.issue.heading}
          </Typography>
          <Typography className={this.props.pos} color="textSecondary">
            Time: {this.props.issue.time}
          </Typography>
          <Typography className={this.props.pos} color="textSecondary">
            Location: {this.props.issue.location}
          </Typography>
          <Typography className={this.props.pos} color="textSecondary">
            User assigned: {this.props.issue.username}
          </Typography>
          <Typography component="p">
            {this.props.issue.content}
          </Typography>
          {this.props.issue.progress == "New" ? <Typography component="p"> <UserSelection assignUser={this._assignUser} mun_id={this.props.issue.mun_id}/> </Typography> : <div />}
        </CardContent>
        <CardActions>
          {this.props.issue.progress != "New" ? <Button size="small" onClick={(event) => this._progressDown()}>Move left</Button> : <div />}
          {(this.props.issue.progress === "Done" || this.props.issue.progress === "New") ? <div /> : <Button size="small" onClick={(event) => this._progressUp()}>Move right</Button>}
        </CardActions>
      </Card>
    )
  }
}
