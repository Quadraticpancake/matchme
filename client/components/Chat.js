import React, { Component } from 'react';
import { Message } from './Message'

const chatStyle = {
  padding: '10px'
};

const inputStyle = {
  width: '100%'
};

export class Chat extends Component {
  render() {
    const {chat, addMessageOnEnter, pair_id} = this.props;
    window.props = this.props
    // messages vs. chats:
    // Chats refer to all messages between a particular pair (bob and amy)
    // messages are an individual message of text sent by one user
    let renderedMessages = [];

    if (chat) {
      chat.messages.forEach((message) => {
        renderedMessages.push(<Message message={message} chat={chat} sender={message.sender === chat.user_one.user_id ? chat.user_one : chat.user_two}/>);
      });

      return (
        <div className='col-md-10 col-sm-11 col-xs-11 well' style={chatStyle}>
        <div>
          {renderedMessages}
        </div>
        <div className='row'>
        <div className='col-md-12 col-sm-12 col-xs-12'>
          <input style={inputStyle} type='text' onKeyPress={addMessageOnEnter.bind(this, pair_id)} placeholder='Write a message...' />
        </div>
        </div>
        </div>
      );
      
    } else {
      return (<div />)
    }
  }
}

