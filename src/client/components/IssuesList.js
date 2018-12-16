import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

export default class IssuesList extends Component {

  constructor(props) {
    super(props);
    this.fillList = this.fillList.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      curExpanded: ""
    }
  }

  handleChange(event, panel){

    var check = ""
    if(this.state.curExpanded != panel) {
      check = panel;
    }

    this.setState({
      curExpanded: check
    });
  };

  fillList() {
    var arr = [];

    var issues = this.props.issues;
    issues.map((issue, index) => {
      arr.push(
        <ExpansionPanel expanded={this.state.curExpanded === 'panel'+index} onChange={event => this.handleChange(event, 'panel'+index)}>
          <ExpansionPanelSummary>
            <Typography>{issue.heading}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List component="issuesList">
              <ListItem button>
                <ListItemText primary="Category" />
                <ListItemText primary={issue.category} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Report contents" />
                <ListItemText primary={issue.content} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Time" />
                <ListItemText primary={issue.time} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Location" />
                <ListItemText primary={issue.location} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="User Assigned" />
                <ListItemText primary={issue.username === "" ?
              "Not Yet Assigned" : issue.username } />
              </ListItem>
              <ListItem>
                <Button variant="contained" color="primary" size="small"
                onClick={(event) => this.props.history.push('/issues/'+ issue.issueId)}>
                Learn More </Button>
              </ListItem>
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
    return arr
  }

  render() {

    return (
      <div>
        {this.fillList()}
      </div>
    )
  }
}
