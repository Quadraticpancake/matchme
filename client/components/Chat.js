import React, { Component } from 'react';

export class Chat extends Component {
  render() {
    const {chat} = this.props

    // messages vs. chats:
    // Chats refer to all messages between a particular pair (bob and amy)
    // messages are an individual message of text sent by one user
    var renderedMessages = [];
    chat.messages.forEach((message) => {
      renderedMessages.push(<div>{message.sender}: {message.text}</div>);
    })

    return (
      <div>
      <div>
      Chat between {chat.user_one} and {chat.user_two}
      {renderedMessages}
      </div>
      <input type='text' />
      </div>
    );
  }
}

