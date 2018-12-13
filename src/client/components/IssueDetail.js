import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { appURL } from '../globalURL.js';

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

export default class IssueDetail extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("/api/issues/"+this.props.mun_id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            issues: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
  }
}
