import React, { Component } from 'react';
import { Message } from './Message'

const chatStyle = {
  padding: '10px'
};

const inputStyle = {
  width: '100%'
};

const heartStyle = {
  height: '4em',
  width: '4em'
}

export class Chat extends Component {
  render() {
    const {chat, addMessageOnEnter, pair_id, user_id, heartConnection} = this.props;
    // messages vs. chats:
    // Chats refer to all messages between a particular pair (bob and amy)
    // messages are an individual message of text sent by one user
    let renderedMessages = [];
    const heartButton = 'https://freeiconshop.com/files/edd/heart-compact-flat.png';


    if (chat) {
      const is_user_one = chat.user_one.user_id === user_id;
      chat.messages.forEach((message, index) => {
        renderedMessages.push(<Message key={index} message={message} chat={chat} sender={message.sender === chat.user_one.user_id ? chat.user_one : chat.user_two}/>);
      });

      return (
        <div className='col-md-10 col-sm-11 col-xs-11 well' style={chatStyle}>
          <div style={{'display': 'flex'}}>
            <img src={heartButton} style={heartStyle} onClick={() => heartConnection(pair_id, user_id, is_user_one)} />
            Like this match? Let us know! The other user won't know you gave them a heart unless you gave them one too.
          </div>
          <div>
            {renderedMessages.length > 0 ? renderedMessages : "No messages yet"}
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

