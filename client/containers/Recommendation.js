import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProfilePictureActions from '../actions/pictureActions';

class Recommendation extends Component {

  render() {

    const {
      actions,
      user
    } = this.props;

    return (
      <div>
        <h1>Here is our incredibly superficial recommendation!</h1>
        <img src='http://i.imgur.com/nTpf2tW.gif'/>
      </div>
    )
  }
}

Recommendation.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Recommendation, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendation);


