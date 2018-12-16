import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class UserSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 0,
      options: []
    };

    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    var self = this;
    axios.get('/api/users/municipality/'+this.props.mun_id)
    .then(function (response) {
      console.log(response);
      var temp = [];
      response.data.forEach(element => {
        temp.push(element.username);
      });

      self.setState({
        options: temp
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleClickListItem(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick(event, index){
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose(){
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className={this.props.root}>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Assign User to issue"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Assign user to issue"
              secondary={this.state.options[this.state.selectedIndex]}
            />
          </ListItem>
          <Button variant="contained" color="primary" onClick={(event) => this.props.assignUser(this.state.options[this.state.selectedIndex])}>
            Assign User
          </Button>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.state.options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}
