import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CustomCard from './CustomCard.js';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 4}px`,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  divider: {
    margin: `${theme.spacing.unit * 4}px 0`,
  },
  userButton: {
    marginLeft: 20,
    marginRight: -12,
  },
});

class IssuesKanban extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      issues: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/issues/municipality/"+this.props.mun_id)
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
          <MuiThemeProvider>
            <div className={this.props.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit" className={this.props.grow}>
                  Hello {this.props.currentUser}
                </Typography>
                <Button variant="contained" color="primary" className={this.props.userButton} 
                onClick={(event) => this.props.history.push('/user/'+ this.props.currentUser)} >
                  User Settings
                </Button>
              </Toolbar>
            </AppBar>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <Paper className={this.props.paper}>
                  New  
                  <Divider />
                    {this.fillColumn("New")}
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={this.props.paper}>
                  In Progress
                  <Divider />
                    {this.fillColumn("In Progress")}
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={this.props.paper}>
                  Needs Review
                  <Divider />
                    {this.fillColumn("Needs Review")}
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={this.props.paper}>
                  Done
                  <Divider />
                    {this.fillColumn("Done")}
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </MuiThemeProvider>
        </div>
      )
    }
}

export default withRouter(IssuesKanban);