import React, { Component } from 'react';
import {Board} from 'react-trello';
import '../App.css';

const data = require('./data.json')

export default class DashBoard extends Component {
  state = {boardData: {lanes: []}};

  setEventBus = eventBus => {
    this.setState({eventBus});
  }

  async componentDidMount() {
    const response = await this.getBoard();
    this.setState({boardData: response});
  }

  getBoard() {
    return new Promise(resolve => {
      resolve(data);
    })
  }

  completeCard = () => {
      this.state.eventBus.publish({
          type: 'ADD_CARD',
          laneId: 'COMPLETED',
          card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app'}
      })
      this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk'})
  }

  addCard = () => {
      this.state.eventBus.publish({
          type: 'ADD_CARD',
          laneId: 'BLOCKED',
          card: {id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down'}
      })
  }

  shouldReceiveNewData = nextData => {
      console.log('New card has been added')
      console.log(nextData)
  }

	handleCardAdd = (card, laneId) => {
		console.log(`New card added to lane ${laneId}`)
		console.dir(card)
	}

    render() {
        return (
            <div className="Board">
                <Board
                    editable
										onCardAdd={this.handleCardAdd}
                    data={this.state.boardData}
                    draggable
                    eventBusHandle={this.setEventBus}
                />
            </div>
        )
    }
}
