import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChatsActions from '../actions/chats';
import { Chat } from '../components/Chat';
import { ChatCollapsed } from '../components/ChatCollapsed';
import { socket } from './App';
import { routeActions } from 'react-router-redux';


// @connect(
//   state => state.items,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )

const rowStyle = {
  marginLeft: '0px',
  marginRight: '0px'
};

const chatStyle = {
  paddingLeft: 0
};

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
    const { actions, user_id, user, routerActions } = this.props;
    routerActions.push('/home');
    return;
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
    const { chats, focus, user_id, actions } = this.props;

    let renderedChats = [];

    Object.keys(chats).map((chatKey) => {
      //chatKey is the pair_id
      renderedChats.push(<ChatCollapsed chat={chats[chatKey]} addMessageOnEnter={this.addMessageOnEnter.bind(this)} heartConnection={actions.heartConnection} pair_id={chatKey} user_id={user_id} expandChat={actions.expandChat} />);
    });

    return (
      <div className='row' style={rowStyle}>
      <div className='col-md-3 col-sm-4 col-xs-4'>
        {renderedChats}
      </div>
      <div className="col-md-8 col-sm-8 col-xs-8" style={chatStyle}>
        <Chat chat={chats[focus]} addMessageOnEnter={this.addMessageOnEnter.bind(this)} pair_id={focus} user_id={user_id} />
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user.user_id,
    user: state.user,
    chats: state.chats.chats,
    focus: state.chats.focus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatsActions, dispatch),
    routerActions: bindActionCreators(routeActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats);
