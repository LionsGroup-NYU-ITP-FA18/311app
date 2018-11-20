import React, { Component } from 'react';
import '../App.css';

const data = require('./data.json')

export default class IssuesList extends Component {

  state = {boardData: {lanes: []}};

  setEventBus = eventBus => {
    this.setState({eventBus});
  }

  async componentDidMount() {
    var issues = await this.getIssues();
    this.setState({boardData: issues});
  }

  getIssues() {
    return new Promise(resolve => {
      resolve(data);
    })
  }

    render() {
        return (
            <div className="IssuesList">
              Issues List
            </div>
        )
    }
}
