export const FETCH_CHATS = 'FETCH_CHATS';
export const SET_CHATS = 'SET_CHATS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const EXPAND_CHAT = 'EXPAND_CHAT';
export const HEART_CONNECTION_CHANGING = 'HEART_CONNECTION_CHANGING';
export const HEART_CONNECTION_CHANGED = 'HEART_CONNECTION_CHANGED';
export const REMOVE_CHAT = 'REMOVE_CHAT';

function setChats(chats) {
  return {
    type: SET_CHATS,
    chats: chats
  };
}

export function fetchChats(user_id) {
  console.log("fetch_chats");
  return function(dispatch) {
    let request = new Request(`/api/chats/${user_id}`, {method: 'GET'});
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(setChats(json)));
  };
}

export function sendMessage(text, sender, pair_id) {
  return function(dispatch) {
    let request = new Request('/api/chats', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sender: sender,
        pair_id: pair_id,
        text: text //note: created_at is calculated on the server before db insert
      })
    });

    return fetch(request)
      .then(() => {
        dispatch(fetchChats(sender));
      });
  };

}

export function closeChat(pair_id) {
  return function(dispatch) {
    let request = new Request('/api/pairs/' + pair_id + '/close', {
      method: 'PUT'
    });
    return fetch(request)
      .then(response => response.json())
      .then((pair_id) => {
        dispatch(removeChat(pair_id));
      });
  };
}

export function removeChat(pair_id) {
  return {
    type: REMOVE_CHAT,
    pair_id: pair_id
  };
}

export function expandChat(pair_id) {
  return {
    type: EXPAND_CHAT,
    pair_id: pair_id
  }
}

export function heartConnection(pair_id, user_id, is_user_one) {
  console.log('heartConnection', arguments);
  return function (dispatch) {
    dispatch(heartConnectionChanging(pair_id));
    console.log('making heart connection request');
    let request = new Request('/api/chatsheart', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        pair_id: pair_id,
        is_user_one: is_user_one
      })
    });
    return fetch(request)
      .then(response => response.json())
      .then((json) => {
        dispatch(heartConnectionChanged(pair_id, json));
      });
  }
}


export function heartConnectionChanging(pair_id) {
  return {
    type: HEART_CONNECTION_CHANGING,
    pair_id: pair_id,
  }
}

export function heartConnectionChanged(pair_id, heartInfo) {
  return {
    type: HEART_CONNECTION_CHANGED,
    userHeart: heartInfo.userHeart,
    pairHeart: heartInfo.pairHeart,
    pair_id: pair_id
  }
}

