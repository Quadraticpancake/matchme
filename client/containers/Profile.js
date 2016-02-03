import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import ProfileForm from '../components/ProfileForm';
import * as UserActions from '../actions/user';

class Profile extends Component {

  handleSubmit(data){
    window.alert('Data submitted! ' + JSON.stringify(data));
  }
  render() {
    const {actions} = this.props;
    return (
      <div className="container">
        <ProfileForm onSubmit={actions.setUserInfo} />
      </div>
    )
  }
}

Profile.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
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
)(Profile);
