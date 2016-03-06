import fetch from 'isomorphic-fetch';

//////////////////////
// picture actions //
/////////////////////

// Get album from db

// Post new profile picture to db

export const UPDATE_PIC = 'UPDATE_PIC';

export const updatePic = (image_url, user_id) => {

  return (dispatch) => {
    dispatch(requestPic());

    const request = new Request(`/api/users/${user_id}/pictures`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_url })
    });

    return fetch(request)
      .then(response => response.json())
      .then((json) => {
        dispatch(receivePic(json));
      });
  };
};

export const UPDATE_ALBUM = 'UPDATE_ALBUM';

export const updateAlbum = (image_url, user_id) => {

  return (dispatch) => {
    dispatch(postAlbum());

    const request = new Request(`/api/users/${user_id}/album`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_url })
    });

    return fetch(request)
    .then(response => console.log('image posted to album', response));
  };
};

export const GET_ALBUM = 'GET_ALBUM';

export const getAlbum = (user_id) => {
  return (dispatch) => {
    dispatch(requestAlbum());
    let request = new Request(`/api/users/${user_id}/album`, {
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
};

export const postPicture = (user_id, image) => {

  return (dispatch) => {
    dispatch(postPic());
    let formData = new FormData();
    formData.append('type', 'base64');
    formData.append('image', image);

    return fetch('https://api.imgur.com/3/upload.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Client-ID a447505b4d4e019'// imgur specific
      },
      body: formData
     })
    .then((response) => {
      if (response.status === 200 || response.status === 0) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(updatePic(data.data.link, user_id));
      dispatch(updateAlbum(data.data.link, user_id));
    });
  };
};

///////////////////
// Network requests
///////////////////

// TARGET
export const POST_PIC = 'POST_PIC';
const postPic = () => {
  console.log('postPic');
  return {
    type: POST_PIC,
  };
};

export const POST_ALBUM = 'POST_ALBUM';
const postAlbum = () => {
  console.log('postAlbum');
  return {
    type: POST_ALBUM,
  };
};

export const REQUEST_PIC = 'REQUEST_PIC';
const requestPic = () => {
  console.log("requestPic");
  return {
    type: REQUEST_PIC,
  };
};

export const RECEIVE_PIC = 'RECEIVE_PIC';
const receivePic = (json) => {
  return {
    type: RECEIVE_PIC,
    imageUrl: json,
    receivedAt: Date.now()
  };
};

export const REQUEST_ALBUM = 'REQUEST_ALBUM';
const requestAlbum = () => {
  return {
    type: REQUEST_ALBUM
  };
};

export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
const receiveAlbum = (json) => {
  return {
    type: RECEIVE_ALBUM,
    album: json,
    receivedAt: Date.now()
  };
};
