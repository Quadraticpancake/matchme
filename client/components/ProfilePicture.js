import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';

class ProfileForm extends Component {

  render() {

    const formStyle = {

      clear: 'all'

    }

    const {
      fields: {}, // album, current profile picture
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <div>

        <h4>Option 1. Choose from your existing photos</h4>

          <p>Your pictures:</p>
          <div>{photoAlbum}</div>

        <h4>Option 2. Upload a picture</h4>

          <input type="file" id="myFile" onchange={ () => {console.log('clicked')}} />

        <h4>Option 3. Snap the perfect shot now using your device camera!</h4>

          <div>
            <video style={videoElementStyle} autoPlay="true" id="videoElement"></video>
            <canvas style={displayElementStyle} id="picDisplay"></canvas>
          </div>

          <button type="button" style={picButtonStyle} onClick={() => {this.takePicture()}}>Take a new Profile Picture</button>
          <button type="button" style={picButtonStyle} onClick={() => {console.log('clicked')}}>Use as Profile Picture</button>
        
        <br></br>
        <br></br>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'profile',
},
state => ({ // mapStateToProps
  initialValues: state.user.userInfo, // will pull state into form's initialValues
}),
{}      // mapDispatchToProps (will bind action creator to dispatch)
)(ProfileForm);
