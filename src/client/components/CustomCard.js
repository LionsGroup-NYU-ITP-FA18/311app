import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const styles = {
  card: {
    minWidth: 50,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

export default class CustomCard extends Component {
  
  constructor(props) {
    super(props);
    this._progressUp = this._progressUp.bind(this);
    this._progressDown = this._progressDown.bind(this);
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
    var self = this;
    var payload={
      "progress":progress,
      "issueId":this.props.issue.issueId
    }

    axios.put("/api/issues/update/"+this.props.issue.issueId, payload)
    .then(function (response) {
      console.log(response);
      self.props.getIssues();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  _progressDown(event) {
    var progress = this.props.issue.progress;
    if(progress === "Done") {
      progress = "Needs Review";
    } else if(progress === "In Progress") {
      progress = "New";
    } else if(progress === "Needs Review") {
      progress = "In Progress";
    }
    var self = this;
    var payload={
      "progress":progress,
      "issueId":this.props.issue.issueId
    }

    axios.put("/api/issues/update/"+this.props.issue.issueId, payload)
    .then(function (response) {
      console.log(response);
      self.props.getIssues();
    })
    .catch(function (error) {
      console.log(error);
    });
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
            {this.props.issue.location}
          </Typography>
          <Typography className={this.props.pos} color="textSecondary">
            {this.props.issue.username}
          </Typography>
          <Typography component="p">
            {this.props.issue.content}
          </Typography>
        </CardContent>
        <CardActions>  
          {this.props.issue.progress != "New" ? <Button size="small" onClick={(event) => this._progressDown()}>Move left</Button> : <div />}
          {this.props.issue.progress != "Done" ?<Button size="small" onClick={(event) => this._progressUp()}>Move  right</Button> : <div />}
        </CardActions>
      </Card>
    )
  }
}