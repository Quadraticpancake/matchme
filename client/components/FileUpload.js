import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import * as ProfilePictureActions from '../actions/pictureActions';

import Dropzone from 'react-dropzone';
export const fields = ['files'];

class FileUpload extends Component {

  handleSubmit(data) {
    console.log('HANDLED SUBMIT', data);
    var body = new FormData();
    Object.keys(data).forEach(( key ) => {
      body.append(key, data[ key ]);
    })

    fetch(`http://example.com/send/`, {
      method: 'POST',
      body: body,
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  render() {

    const formStyle = {
      clear: 'all'
    }

    const {
      fields: {files},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <form onSubmit={ handleSubmit }>
        <div>
          <div>
            <Dropzone { ...files } onDrop={ ( filesToUpload, e ) => files.onChange(filesToUpload) }></Dropzone>
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting} onClick={ handleSubmit(this.handleSubmit) }>
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