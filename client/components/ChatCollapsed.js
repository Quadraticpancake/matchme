import React, { Component } from 'react';
import { uniqueId, extend } from 'underscore';
import trash from '../../static/img/icons/trash';
import css from './ChatCollapsed.scss';
import moment from 'moment';

const smallImageStyle = {
  height: '4em',
  width: '4em'
};

const trashStyle = {
  
}

const trashImageStyle = {
  width: '2em',
  height: '2em'
}

const textStyle = {
  paddingLeft: '1rem',
};

const timeStyle = {
  alignSelf: 'flex-end',
  marginLeft: 'auto',
}

export class ChatCollapsed extends Component {

  render() {
    const {chat, addMessageOnEnter, pair_id, user_id, expandChat, focus, closeChat} = this.props;
    // messages vs. chats:
    // Chats refer to all messages between a particular pair (bob and amy)
    // messages are an individual message of text sent by one user

    //const closeButton = 'https://image.freepik.com/free-icon/close-button-with-a-cross-in-a-circle_318-26587.jpg'
    const trashButton = 'https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/256/trash.png'
    const xButton = 'http://vignette4.wikia.nocookie.net/education/images/d/d3/Icon-x.svg/revision/latest?cb=20090630172726'
    const is_user_one = chat.user_one.user_id === user_id;
    const userNotMe = is_user_one ? chat.user_two : chat.user_one;

    const id = uniqueId("ChatCollapsed");

    return (
      <div 
        className={css.chatCollapsed}
        id={id} 
        onClick={() => expandChat(pair_id)}
      >
        <style>{
          // hover uses the id generated with uniqueId, based on this example: https://jsfiddle.net/ors1vos9/ 
          "#" + id + ":hover {background-color: #fdd9e3} "
        }</style>
        <img src={userNotMe.image_url} style={smallImageStyle} />
        <div style={textStyle}>
          {userNotMe.first_name} {userNotMe.last_name}
          <div>
            {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : 'No messages yet'}
          </div>
          <div>
            {chat.messages.length > 0 ? moment.utc(chat.messages[chat.messages.length - 1].created_at).local().fromNow() : ''}
          </div>
        </div>
        <div style={trashStyle}>
          <img src={xButton} style={trashImageStyle} onClick={() => closeChat(pair_id)}/>
        </div>
      </div> 
    );
  }
}

