import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChatsActions from '../actions/chats';
import { Chat } from '../components/Chat';
import { ChatCollapsed } from '../components/ChatCollapsed';
import { socket } from './App';

// @connect(
//   state => state.items,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )

class Chats extends Component {
  // constructor(props) {
  //   super(props);
  // }
  addMessageOnEnter(pair_id, event) {
    const { actions, user_id } = this.props;
    if (event.key === 'Enter') {
      actions.sendMessage(event.target.value, user_id, Number(pair_id));
      event.target.value = '';
    }
  }

  fetchChatsAndTellSocket() {
    const { actions, user_id, chats } = this.props;
    actions.fetchChats(user_id);
    // () => {
    //   socket.emit('joinChatrooms', { chats: chats });
    // }
  }

  componentDidMount() {
    this.fetchChatsAndTellSocket();
    socket.on('refreshChats', () => { 
      this.fetchChatsAndTellSocket();
    }.bind(this));
  }

  componentDidUpdate() {
    const { chats } = this.props;
    socket.emit('joinChatrooms', { chats: chats });
  }

  render() {
    const { chats, focus } = this.props;

    let renderedChats = [];

    if (focus === null) {
      Object.keys(chats).map((chatKey) => {
        //chatKey is the pair_id
        renderedChats.push(<ChatCollapsed chat={chats[chatKey]} addMessageOnEnter={this.addMessageOnEnter.bind(this)} pair_id={chatKey} />);
      });
    } 


    return (
      <section>
        {renderedChats}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user.user_id,
    chats: state.chats.chats,
    focus: state.chats.focus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatsActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats);
