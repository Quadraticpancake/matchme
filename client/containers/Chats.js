import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import {Chat} from '../components/Chat';

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

  componentDidMount() {
    const { actions, user_id } = this.props;
    actions.fetchChats(user_id);
  }

  render() {
    const { chats } = this.props;

    let renderedChats = [];

    Object.keys(chats).map((chatKey) => {
      //chatKey is the pair_id
      renderedChats.push(<Chat chat={chats[chatKey]} addMessageOnEnter={this.addMessageOnEnter.bind(this)} pair_id={chatKey} />);
    });

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
    chats: state.user.chats
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats);
