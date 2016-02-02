import React, { Component } from 'react';

export class Chat extends Component {
  render() {
    const {chat, addMessageOnEnter, pair_id} = this.props;
    window.props = this.props
    // messages vs. chats:
    // Chats refer to all messages between a particular pair (bob and amy)
    // messages are an individual message of text sent by one user
    let renderedMessages = [];

    if (chat > 0) {
      chat.messages.forEach((message) => {
        renderedMessages.push(<div>{message.sender}: {message.text}</div>);
      });

      return (
        <div className='col-md-10 col-sm-10 col-xs-10'>
        <div>
        Chat between {chat.user_one.first_name} and {chat.user_two.first_name}
        {renderedMessages}
        </div>
        <input type='text' onKeyPress={addMessageOnEnter.bind(this, pair_id)} />
        </div>
      );
      
    } else {
      return (<div />)
    }
  }
}

