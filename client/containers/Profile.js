import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';

import ProfileForm from '../components/ProfileForm';

class Profile extends Component {

  handleSubmit(data){
    window.alert('Data submitted! ' + JSON.stringify(data));
  }

  render() {
    return (
      <div className="container">
        <ProfileForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default Profile;