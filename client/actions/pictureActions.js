import fetch from 'isomorphic-fetch';
import imgur from 'imgur'; 

//////////////////////
// picture actions //
/////////////////////

// Get album from db

// Post new profile picture to db

export const UPDATE_PIC = 'UPDATE_PIC';

export function updatePic(image_url, user_id) {
  console.log('updatePic called');
  console.log('IN UPDATE PIC', image_url);

  return function(dispatch) {

    dispatch(requestPic());

    let request = new Request(`/api/pictures/${user_id}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_url:  image_url})
    });

    return fetch(request)
      .then(response => response.json())
      .then((json) => {
        dispatch(receivePic(json));
      });
  };
}

export const GET_ALBUM = 'GET_ALBUM';

export function getAlbum(user_id) {
  console.log('got to getAlbum', user_id)
  return function(dispatch) {
    dispatch(requestAlbum());
    let request = new Request(`/api/album/${user_id}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    return fetch(request)
      .then(response => response.json())
      .then((json) => {

        dispatch(receiveAlbum(json));
      });
  };
}

export function postPicture(user_id, image) {
  console.log('posting picture', image)
  //////////////imgur stuff///////////////////////
  imgur.setClientId('a447505b4d4e019');
  // imgur.setCredentials('email@domain.com', 'password', 'a447505b4d4e019');
  imgur.uploadBase64(image)
      .then(function (json) {
          console.log(json.data.link);
      })
      .catch(function (err) {
          console.error(err.message);
      });
  ///////////////////////////////////////////////

  // return (dispatch) => {
  //   //dispatch(postPic Action)
  //   let request = new Request('https://api.imgur.com/3/image', {
  //     method: 'post',
  //     headers: {
  //       'Authorization': 'Client-ID a447505b4d4e019'
  //     },
  //     data: {
  //       image: 'http://i.imgur.com/RVyKk5g.jpg',
  //       type: 'url'
  //     },
  //   });

  //   return fetch(request)
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json);
  //     });
  // };
}

///////////////////
// Network requests
///////////////////


// TARGET

export const REQUEST_PIC = 'REQUEST_PIC';
function requestPic() {
  return {
    type: REQUEST_PIC,
  };
}

export const RECEIVE_PIC = 'RECEIVE_PIC';
function receivePic(json) {
  return {
    type: RECEIVE_PIC,
    imageUrl: json,
    receivedAt: Date.now()
  };
}

export const REQUEST_ALBUM = 'REQUEST_ALBUM';
function requestAlbum() {
  return {
    type: REQUEST_ALBUM
  };
}

export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
function receiveAlbum(json) {
  return {
    type: RECEIVE_ALBUM,
    album: json,
    receivedAt: Date.now()
  };
}