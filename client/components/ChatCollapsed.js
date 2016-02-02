import React, { Component } from 'react';

const chatCollapsedStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap'
};

const smallImageStyle = {
  alignSelf: 'flex-start',
  maxHeight: '4em'
};

const textStyle = {
  alignSelf: 'auto',
};

const timeStyle = {
  alignSelf: 'flex-end',
  marginLeft: 'auto',
}

export class ChatCollapsed extends Component {

  render() {
    const {chat, addMessageOnEnter, pair_id, user_id, expandChat} = this.props;
    // messages vs. chats:
    // Chats refer to all messages between a particular pair (bob and amy)
    // messages are an individual message of text sent by one user
    let renderedMessages = [];
    chat.messages.forEach((message) => {
      renderedMessages.push(<div>{message.text}</div>);
    });

    var userNotMe = chat.user_one.user_id === user_id ? chat.user_two : chat.user_one;

    return (
      <div className='well well-sm col-md-4' style={chatCollapsedStyle} onClick={() => expandChat(pair_id)}>
        <img src={userNotMe.image_url} style={smallImageStyle} />
        <div style={textStyle}>
          {userNotMe.first_name} {userNotMe.last_name} 
          <div>
            {chat.messages[chat.messages.length - 1].text}
          </div>
        </div>
        <div style={timeStyle}>
          {chat.messages[chat.messages.length - 1].created_at}
        </div>
      </div>
    );
  }
}

