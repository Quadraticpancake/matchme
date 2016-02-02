import React, { Component } from 'react';

export class ChatCollapsed extends Component {
  render() {
    const {chat, addMessageOnEnter, pair_id} = this.props;
    // messages vs. chats:
    // Chats refer to all messages between a particular pair (bob and amy)
    // messages are an individual message of text sent by one user
    let renderedMessages = [];
    chat.messages.forEach((message) => {
      renderedMessages.push(<div>{message.sender}: {message.text}</div>);
    });

    return (
      <div className='col-md-10 col-sm-10 col-xs-10'>
      Chat between {chat.user_one.first_name} and {chat.user_two.first_name}
      {renderedMessages[renderedMessages.length - 1]}
      </div>
    );
  }
}

