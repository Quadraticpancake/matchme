import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// @connect(
//   state => state.items,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )
export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
      	<div>My Profile Goes Here</div>
      </section>
    );
  }
}
