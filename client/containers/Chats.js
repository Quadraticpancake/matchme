import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../actions/user'

// @connect(
//   state => state.items,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )

class Chats extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    window.props = this.props
    const { chats } = this.props;
    return (
      <section>
      	<div>{JSON.stringify(chats[0])}</div>
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