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
import SortIssueSelection from './SortIssueSelection.js';
import IssuesList from './IssuesList.js';
import axios from 'axios';

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
    this.getIssues = this.getIssues.bind(this);
    this.sortIssues = this.sortIssues.bind(this);
    this.changeView = this.changeView.bind(this);

    this.state = {
      issues: [],
      listview: false
    };
  }

  getIssues() {
    var self = this;
    axios.get("/api/issues/municipality/"+this.props.mun_id)
    .then(function (response) {
      console.log(response);
      self.setState({
        issues: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  changeView() {
    this.setState({
      listview: !this.state.listview
    })
  }

  sortIssues(option) {
    var temp = this.state.issues;
    if(option === "Priority") {
      temp.sort(function(a,b) {return (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0);} );
    } else if(option === "Time (Ascending)") {
      temp.sort(function(a,b) {return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);} );
    } else if(option === "Time (Descending)") {
      temp.sort(function(a,b) {return (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0);} );
    } else if(option === "User") {
      temp.sort(function(a,b) {return (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0);} );
    } else if(option === "Category") {
      temp.sort(function(a,b) {return (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0);} );
    } else {
      console.log("Invalid Option! No Sort");
    }

    this.setState({
      issues: temp
    })
  }

  componentDidMount() {
    this.getIssues();
  }

    fillColumn(str) {
      var arr = []
      this.state.issues.map((issue) => {
      if(issue.progress === str) {
        arr.push(<CustomCard issue={issue} getIssues={this.getIssues} history={this.props.history}/>)
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
                <SortIssueSelection sortIssues={this.sortIssues} />
                <Button variant="contained" color="primary" onClick={(event) => this.changeView()}>
                    Change View
                </Button>
                <Button variant="contained" color="primary" className={this.props.userButton}
                onClick={(event) => this.props.history.push('/user/'+ this.props.currentUser)} >
                  User Settings
                </Button>
                <Button variant="contained" color="primary" onClick={(event) => this.props.signOut()}>
                    Sign out
                </Button>

              </Toolbar>
            </AppBar>
            {this.state.listview ? <IssuesList issues={this.state.issues} history={this.props.history} /> :
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
            }
            </div>
          </MuiThemeProvider>
        </div>
      )
    }
}

export default withRouter(IssuesKanban);
