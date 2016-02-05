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
    canvas.width = 624;
    canvas.height = 468;
    canvas.getContext('2d').drawImage(video,0,0);
  }

  uploadPicture() {
    let canvas = document.querySelector("#picDisplay");
    let imgData = canvas.toDataURL("img/png");
    // console.log('url???', imgData.toString());
    // extract data in base 64 encoded webp format
    // console.log(imgData);
    imgData = imgData.replace('data:image/png;base64,','');
    // console.log(imgData);
    // let postData = JSON.stringify({imgData: imgData});

    // console.log('postdata from webcam', postData)
    // post to server
      // ASYNC:
      // writeFile to profilePics
      //

    const {actions, user} = this.props;
    // actions.updatePic(item,user.user_id);
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
    console.log('userID in profilePicture', user.user_id)
    actions.getAlbum(user.user_id);
    console.log('USER IN PICTURES', user.user_id)
  }

  handleClick(item){
    const {actions, user} = this.props;
    actions.updatePic(item,user.user_id);
  }

  handleSubmit(data){
    const {actions, user} = this.props;
    console.log('HANDLED SUBMIT', data);
    var body = new FormData();
    // Object.keys(data).forEach(( key ) => {
    //   body.append(key, data[ key ]);
    // });
    console.log(body);
    body.append('image', data.files[0]);
    console.log(body);
    console.log(data.files[0]);
    // actions.updatePic(item,user.user_id);
    actions.postPicture(user.user_id, body);

    // fetch(`http://example.com/send/`, {
    //   method: 'POST',
    //   body: body,
    // })
    // .then(res => res.json())
    // .then(res => console.log(res))
    // .catch(err => console.error(err));
  }


  render() {
    const videoElementStyle = {
      width: 200,
      height: 'auto',
      clear: 'all'
    }

    const displayElementStyle = {
      width: 200,
      clear: 'all',
      border: '1px black'
    }

    const picButtonStyle = {
      borderRadius: 5,
      // float: 'left',
      // clear: 'all',
      display: 'block',
      borderRadius: 5,
      margin: 2
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
    }

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
      return <div style={imgDiv}><img src={item} key={i} style={imageStyle} /><br></br><button type="button" style={picButtonStyle} onClick={self.handleClick.bind(self, item)}>Use as Profile Picture</button><br></br></div>
    });

    return (
      <div>
        <h3 style={divStyle}>Option 1. Choose from your existing photos</h3>

          <p>Your pictures:</p>
          <div>{photosMap}</div>

        <h3 style={divStyle}>Option 2. Upload a picture</h3>
          <FileUpload onSubmit={this.handleSubmit.bind(this)} />
          <p>Drop file here to upload</p>
       <h3 style={divStyle}>Option 3. No good pics? Snap the perfect shot with your device camera!</h3>

          <div style={divStyle}>
            <video style={videoElementStyle} autoPlay="true" id="videoElement"></video>
            <canvas style={displayElementStyle} id="picDisplay"></canvas>
          </div>

          <button type="button" style={picButtonStyle} onClick={() => {this.takePicture()}}>Take a new Profile Picture</button>
          <button type="button" style={picButtonStyle} onClick={() => {this.uploadPicture()}}>Use as Profile Picture</button>

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


