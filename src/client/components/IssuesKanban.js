import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CustomCard from './CustomCard.js';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 2}px`,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

export default class IssuesKanban extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      issues: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/issues")
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
    
    fillColumn(str) {
      var arr = []
      this.state.issues.map((issue) => {
      if(issue.progress === str) {
        arr.push(<CustomCard issue={issue} />)
      }})
      return arr 
    }
    
    render() {
      return (
        <div>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Paper className={this.props.paper}>
              New  
                {this.fillColumn("New")}
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={this.props.paper}>
              In Progress
                {this.fillColumn("In Progress")}
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={this.props.paper}>
              Needs Review
                {this.fillColumn("Needs Review")}
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={this.props.paper}>
              Done
                {this.fillColumn("Done")}
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    }
}