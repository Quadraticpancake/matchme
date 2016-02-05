import React, { Component } from 'react';
import { uniqueId, extend } from 'underscore';

const smallImageStyle = {
  width: '4em',
  height: '4em'
};

const textStyle = {
  alignSelf: 'auto',
  paddingLeft: '1rem'
};

const timeStyle = {
  alignSelf: 'flex-end',
  marginLeft: 'auto',
}

const chatCollapsedStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  padding: '0.5em',
  marginBottom: '10px'
}

const chatCollapsedStyleIfSelected = extend({}, chatCollapsedStyle, {backgroundColor: 'white', borderColor: '#838b8b'});

var test = function () {
  console.log('this heart was clicked');
}


export class ChatCollapsed extends Component {

  

  render() {
    const {chat, addMessageOnEnter, heartConnection, pair_id, user_id, expandChat, focus, closeChat} = this.props;
    // messages vs. chats:
    // Chats refer to all messages between a particular pair (bob and amy)
    // messages are an individual message of text sent by one user

    const heartButton = 'https://freeiconshop.com/files/edd/heart-compact-flat.png';
    const closeButton = 'https://image.freepik.com/free-icon/close-button-with-a-cross-in-a-circle_318-26587.jpg'
    const is_user_one = chat.user_one.user_id === user_id;
    const userNotMe = is_user_one ? chat.user_two : chat.user_one;

    const id = uniqueId("ChatCollapsed");

    return (
      <div 
        className='well well-sm' 
        id={id} 
        style={focus === pair_id ? chatCollapsedStyleIfSelected : chatCollapsedStyle} 
        onClick={() => expandChat(pair_id)}
      >
        <style>{
          // hover uses the id generated with uniqueId, based on this example: https://jsfiddle.net/ors1vos9/ 
          "#" + id + ":hover {background-color: white} "
        }</style>
        <div style={chatCollapsedStyle}>
          <div style={ {alignSelf: 'flex-start'} }>
            <img src={userNotMe.image_url} style={smallImageStyle} />
            <img src={heartButton} style={smallImageStyle} onClick={() => heartConnection(pair_id, user_id, is_user_one)} />
            <img src={closeButton} style={smallImageStyle} onClick={() => closeChat(pair_id)} />
          </div>
          <div style={textStyle}>
            {userNotMe.first_name} {userNotMe.last_name} 
            <div>
              {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : 'No messages yet'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

