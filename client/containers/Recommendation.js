import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProfilePictureActions from '../actions/pictureActions';

class Recommendation extends Component {
  // handleClick(item){
  //   const {actions, user} = this.props;
  //   actions.updatePic(item,user.user_id);
  // }

  render() {
    // const style = {
    //   width: 200,
    //   height: 'auto',
    //   clear: 'all'
    // }

    const {
      actions,
      user
    } = this.props;

    return (
      <div>
        <h1>Here is our incredibly superficial recommnedation!</h1>
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


