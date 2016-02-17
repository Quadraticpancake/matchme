import React, { Component } from 'react';
import moment from 'moment';

const messageDivStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  padding: '0.5em',
  marginBottom: '10px',
  backgroundColor: 'white',
  borderRadius: '2px',
  border: '1px solid #e3e3e3'
};

const messageImageStyle = {
  alignSelf: 'flex-start',
  height: '4em',
  width: '4em',
  marginRight: '1em'
};

const messageTextStyle = {
  alignSelf: 'auto',
};

const senderNameStyle = {
  fontWeight: 'bold'
};

const timestampStyle = {
  fontSize: 'x-small'
};

export class Message extends Component {
  render() {
    const { chat, message, sender } = this.props;
    window.moment = moment;

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
          <div style={timestampStyle}>
            {moment.utc(message.created_at).local().fromNow()}
          </div>
        </div>
      </div>
    );
  }
}

