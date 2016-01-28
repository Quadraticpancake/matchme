import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// @connect(
//   state => state.items,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )
export default class MyChats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
      	<div>My Chats Go Here!</div>
      </section>
    );
  }
}
