export const FETCH_CHATS = 'FETCH_CHATS';
export const SET_CHATS = 'SET_CHATS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const EXPAND_CHAT = 'EXPAND_CHAT';
export const HEART_CONNECTION_CHANGING = 'HEART_CONNECTION_CHANGING';
export const HEART_CONNECTION_CHANGED = 'HEART_CONNECTION_CHANGED';
export const REMOVE_CHAT = 'REMOVE_CHAT';
export const COLLAPSE_CHAT = 'COLLAPSE_CHAT';

const setChats = (chats) => {
  return {
    type: SET_CHATS,
    chats
  };
};

export const fetchChats = (user_id) => {

  return (dispatch) => {
    const request = new Request(`/api/chats/${user_id}`, {method: 'GET'});
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(setChats(json)));
  };
};

export const sendMessage = (text, sender, pair_id) => {
  return (dispatch) => {
    const request = new Request('/api/chats', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender,
        pair_id,
        text //note: created_at is calculated on the server before db insert
      })
    });

    return fetch(request)
      .then(() => {
        dispatch(fetchChats(sender));
      });
  };
};

export const removeChat = (pair_id) => {
  return {
    type: REMOVE_CHAT,
    pair_id
  };
};

export const closeChat = (pair_id) => {
  return (dispatch) => {
    dispatch(removeChat(pair_id));
    const request = new Request(`/api/pairs/${pair_id}/close`, {
      method: 'PUT'
    });
    return fetch(request)
      .then(response => response.json())
      .then((pair_id) => {
        dispatch(removeChat(pair_id));
      });
  };
};

export const expandChat = (pair_id) => {
  return {
    type: EXPAND_CHAT,
    pair_id
  };
};

export const collapseChat = () => {
  return {
    type: COLLAPSE_CHAT
  };
};

export const heartConnectionChanging = (pair_id) => {
  return {
    type: HEART_CONNECTION_CHANGING,
    pair_id
  };
};

export const heartConnectionChanged = (pair_id, heartInfo) => {
  console.log(heartInfo);
  return {
    type: HEART_CONNECTION_CHANGED,
    userHeart: heartInfo.userHeart,
    pairHeart: heartInfo.pairHeart,
    pair_id
  };
};

export const heartConnection = (pair_id, user_id, is_user_one) => {
  return (dispatch) => {
    dispatch(heartConnectionChanging(pair_id));
    const request = new Request('/api/chatsheart', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id,
        pair_id,
        is_user_one
      })
    });
    return fetch(request)
      .then(response => response.json())
      .then((json) => {
        dispatch(heartConnectionChanged(pair_id, json));
      });
  };
};
