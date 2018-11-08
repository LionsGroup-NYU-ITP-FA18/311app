import React, { Component } from 'react';

export const CustomCard = props => {
    return (
      <div
      style={{backgroundColor: '#AFEEEE', padding: 6}}>
      <header
        style={{
                borderBottom: '1px solid #eee',
                paddingBottom: 6,
                marginBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
        <div style={{fontSize: 14, fontWeight: 'bold'}}>
          {props.name}
        </div>
      </header>
      <div style={{fontSize: 12, color: '#BD3B36'}}>
        <div style={{color: '#4C4C4C', fontWeight: 'bold'}}>
          {props.category}
        </div>
        <div style={{padding: '5px 0px'}}>
          <i>
            {props.desc}
            <br />
            <br />
            User: {props.user}
            <br />
            Time Created: {props.time_created}
            <br />
            Location: {props.location}
            <br />
            Priority: {props.priority}
          </i>
        </div>
      </div>
    </div>

    )
}
