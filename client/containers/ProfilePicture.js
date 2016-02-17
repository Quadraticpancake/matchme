import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProfilePictureActions from '../actions/pictureActions';
import FileUpload from '../components/FileUpload';
import * as css from './ProfilePicture.scss';

class ProfilePicture extends Component {

  componentWillMount() {
    const { actions, user } = this.props;
    actions.getAlbum(user.user_id);
  }

  componentDidMount() {
    // sets up user webcam
    const video = document.querySelector('#videoElement');
    function handleVideo(stream) {
      video.src = window.URL.createObjectURL(stream);
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, handleVideo, this.videoError);
    }
  }

  videoError(e) {
    console.log('error with video intialization', e);
  }

  takePicture() {
    // render snapshot of video to canvas
    const canvas = document.querySelector('#picDisplay');
    const video = document.querySelector('#videoElement');
    // canvas.width = 624;
    canvas.width = 465;
    canvas.height = 465;
    canvas.getContext('2d').drawImage(video, 10, 0);
  }

  uploadPictureCanvas() {
    const canvas = document.querySelector('#picDisplay');
    let imgData = canvas.toDataURL('img/png');
    imgData = imgData.replace('data:image/png;base64,', '');

    const { actions, user } = this.props;
    actions.postPicture(user.user_id, imgData);
  }

  handleClick(item) {
    const { actions, user } = this.props;
    actions.updatePic(item, user.user_id);
  }

  handleUploadSubmit(data) {
    const { actions, user } = this.props;
    const fileToLoad = data.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      let file64 = e.target.result;
      // remove header from base64 encoded image
      file64 = file64.replace(/(^[^,]*)\w/, '').slice(1);
      actions.postPicture(user.user_id, file64);
    };

    fileReader.onerror = (err) => {
      console.log('error', err);
    };

    fileReader.readAsDataURL(fileToLoad);
  }


  render() {
    const videoElementStyle = {
      width: 200,
      height: 'auto',
      clear: 'all'
    };

    const displayElementStyle = {
      width: 150,
      height: 150,
      clear: 'all',
      backgroundImage: 'url("http://allthetickets.net/images/no-preview.png")',
      backgroundSize: 'cover'
    };

    const picButtonStyle = {
      marginLeft: 5,
      marginRight: 5,
    };

    const imageStyle = {
      height: 200,
      width: 200,
      clear:'left',
      margin: 2,
      borderRadius: 5
    };

    const imgDiv = {
      float: 'left'
    };

    const divStyle = {
      clear: 'both',
      margin: 2
    };

    const albumButtonStyle = {
      margin: '5px 2px 20px 22px'
    };

    const {
      user
    } = this.props;

    let photos = Object.keys(user.album);

    photos = photos.map(function(item) {
      return user.album[item].image_url;
    });

    const self = this;

    const photosMap = photos.map(function(item,i) {
      return <div style={imgDiv}><img src={item} key={i} style={imageStyle} /><br></br><button type="button" className="btn btn-secondary" style={albumButtonStyle} onClick={self.handleClick.bind(self, item)}>Use as Profile Picture</button><br></br></div>
    });

    return (
      <div>
        <h3 style={divStyle}>Option 1. Choose from your existing photos</h3>
          <div>{photosMap}</div>

        <div className={css.hideSmall}>
          <h3 style={divStyle}>Option 2. Upload a picture</h3>
            <FileUpload onSubmit={this.handleUploadSubmit.bind(this)} />

          <h3 style={divStyle}>Option 3. No good pics? Snap the perfect shot now!</h3>

            <div style={divStyle}>
              <video style={videoElementStyle} autoPlay="true" id="videoElement"></video>
              <canvas style={displayElementStyle} id="picDisplay"></canvas>
            </div>

            <button type="button" className="btn btn-secondary" style={picButtonStyle} onClick={() => { this.takePicture()}}>Take a new Profile Picture</button>
            <button type="button" className="btn btn-secondary" style={picButtonStyle} onClick={() => { this.uploadPictureCanvas()}}>Use as Profile Picture</button>

          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

ProfilePicture.propTypes = {
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
    actions: bindActionCreators(ProfilePictureActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePicture);
