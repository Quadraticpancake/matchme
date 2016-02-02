import React, { Component } from 'react';

const messageDivStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  padding: '0.5em',
  marginBottom: '10px',
  backgroundColor: 'white',
  borderRadius: '4px', 
  border: '1px solid #e3e3e3'
};

const messageImageStyle = {
  alignSelf: 'flex-start',
  height: '2em',
  width: '2em',
  marginRight: '1em'
};

const messageTextStyle = {
  alignSelf: 'auto',
};

const senderNameStyle = {
  fontWeight: 'bold'
};

export class Message extends Component {
  render() {
    const {chat, message, sender} = this.props;

    return (
      <div style={messageDivStyle}>
        <img src={sender.image_url} style={messageImageStyle}>
        </img>
        <div>
          <div style={senderNameStyle}>
            {sender.first_name} {sender.last_name}
          </div>
          <div style={messageTextStyle}>
            {message.text}
          </div>
        </div>
      </div>
    )
  }
}

