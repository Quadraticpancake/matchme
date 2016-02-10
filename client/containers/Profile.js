import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import ProfileForm from '../components/ProfileForm';
import * as UserActions from '../actions/user';
import { routeActions } from 'react-router-redux';

class Profile extends Component {

  componentWillMount(){
    // const {user, routerActions } = this.props;
    // if (!user.isAuthenticated) {
    //   routerActions.push('/home');
    //   return;
    // }
  }

  handleSubmit(data){
    const {actions, user} = this.props;
    actions.updateUserInfo(user.user_id, data);
  }
  render() {
    return (
      <div className="container">
        <ProfileForm onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
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
    actions: bindActionCreators(UserActions, dispatch),
    routerActions: bindActionCreators(routeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
