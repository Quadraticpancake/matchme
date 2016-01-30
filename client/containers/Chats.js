import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../actions/user'
import {Chat} from '../components/Chat'

// @connect(
//   state => state.items,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )

class Chats extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { actions } = this.props
    actions.fetchChats()
  }

  render() {
    window.props = this.props;
    const { chats } = this.props;

    var renderedChats = [];

    Object.keys(chats).map((chatKey) => {
      renderedChats.push(<Chat chat={chats[chatKey]} />)
    });

    return (
      <section>
        {renderedChats}
      </section>
    );
  }
}


// Chats.propTypes = {
//   chats: PropTypes.array.isRequired
// }

function mapStateToProps(state) {
  return {
    chats: state.user.chats
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats)