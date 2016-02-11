import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import * as ProfilePictureActions from '../actions/pictureActions';
import FileUpload from '../components/FileUpload';

class ProfilePicture extends Component {

   videoError(e) {
     console.log('error with video intialization', e);
   }

   takePicture() {
    // http://matthewschrager.com/2013/05/25/how-to-take-webcam-pictures-from-browser-and-store-server-side/
    let canvas = document.querySelector("#picDisplay");
    let video = document.querySelector("#videoElement");
    // canvas.width = 624;
    canvas.width = 465;
    canvas.height = 465;
    canvas.getContext('2d').drawImage(video,10,0);
  }

  uploadPictureCanvas() {
    let canvas = document.querySelector("#picDisplay");
    let imgData = canvas.toDataURL("img/png");
    imgData = imgData.replace('data:image/png;base64,','');

    const {actions, user} = this.props;
    actions.postPicture(user.user_id, imgData);
  }

  componentDidMount(){
    // http://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm
    let video = document.querySelector("#videoElement");
    function handleVideo(stream) {
      // comment this out and then uncomment to see
      video.src = window.URL.createObjectURL(stream);
    };

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, handleVideo, this.videoError);
    }

  };

  componentWillMount(){
    const {actions, user} = this.props;
    actions.getAlbum(user.user_id);
  }

  handleClick(item){
    const {actions, user} = this.props;
    actions.updatePic(item,user.user_id);
  }

  handleUploadSubmit(data){
    console.log('handle submit', typeof data.files[0])
    const {actions, user} = this.props;
    
    let fileToLoad = data.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function(e, file) {
      let file64 = e.target.result;
      // file64 = file64.replace('data:image/jpeg;base64,','')
      file64 = file64.replace(/(^[^,]*)\w/, '').slice(1);
      actions.postPicture(user.user_id, file64);
    }

    fileReader.onerror = function(err) {
      console.log('error', err)
    }
 
    fileReader.readAsDataURL(fileToLoad);
  }


  render() {
    const videoElementStyle = {
      width: 200,
      height: 'auto',
      clear: 'all'
    }

    const displayElementStyle = {
      width: 150,
      height: 150,
      clear: 'all',
      backgroundImage: 'url("http://allthetickets.net/images/no-preview.png")',
      backgroundSize: 'cover'
    }

    const picButtonStyle = {
      marginLeft: 5,
      marginRight: 5,
    }

    const imageStyle = {
      height: 200,
      width: 200,
      clear:'left',
      margin: 2,
      borderRadius: 5
    }

    const imgDiv = {
      float: 'left'
    }

    const divStyle = {
      clear: 'both',
      margin: 2
    };

    const albumButtonStyle = {
      margin: '5px 2px 20px 22px'
    };

    const {
      actions,
      user,
      handleSubmit,
    } = this.props;

    // let photos = ['https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg', 'http://www.cats.org.uk/uploads/branches/211/5507692-cat-m.jpg']
    let photos = Object.keys(user.album);

    photos = photos.map(function(item) {
      return user.album[item].image_url;
    });

    let photoAlbum = [];

    let self = this;

    let photosMap = photos.map(function(item,i) {
      return <div style={imgDiv}><img src={item} key={i} style={imageStyle} /><br></br><button type="button" class="btn btn-secondary" style={albumButtonStyle} onClick={self.handleClick.bind(self, item)}>Use as Profile Picture</button><br></br></div>
    });

    return (
      <div>
        <h3 style={divStyle}>Option 1. Choose from your existing photos</h3>
          <div>{photosMap}</div>

        <h3 style={divStyle}>Option 2. Upload a picture</h3>
          <FileUpload onSubmit={this.handleUploadSubmit.bind(this)} />

        <h3 style={divStyle}>Option 3. No good pics? Snap the perfect shot now!</h3>

          <div style={divStyle}>
            <video style={videoElementStyle} autoPlay="true" id="videoElement"></video>
            <canvas style={displayElementStyle} id="picDisplay"></canvas>
          </div>

          <button type="button" class="btn btn-secondary" style={picButtonStyle} onClick={() => {this.takePicture()}}>Take a new Profile Picture</button>
          <button type="button" class="btn btn-secondary" style={picButtonStyle} onClick={() => {this.uploadPictureCanvas()}}>Use as Profile Picture</button>

        <br></br>
        <br></br>

      </div>
    )
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


