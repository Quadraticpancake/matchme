import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import * as ProfilePictureActions from '../actions/pictureActions';

import Dropzone from 'react-dropzone';

export const fields = ['files'];

class FileUpload extends Component {

  render() {

    const formStyle = {
      clear: 'all'
    }

    const preview = {
      height: 200,
      width: 'auto',
      display: 'block',
    }

    const {
      fields: {files},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <Dropzone { ...files } onDrop={ ( filesToUpload, e ) => files.onChange(filesToUpload) }>Drop file here!</Dropzone>
          </div>
          <div>
            <img style={preview} id="preview" src='http://allthetickets.net/images/no-preview.png'/>
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting} >
            {submitting ? <i/> : <i/>} Submit
          </button>

        </div>
      </form>
    );
  }
}

FileUpload.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'profile',
  fields
},
state => ({ // mapStateToProps
  initialValues: state.user.userInfo, // will pull state into form's initialValues
}),
{}      // mapDispatchToProps (will bind action creator to dispatch)
)(FileUpload);