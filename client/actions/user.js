export const FETCH_CHATS = 'FETCH_CHATS';
export const SET_CHATS = 'SET_CHATS';

export function fetchChats() {
	return function(dispatch) {
		let request = new Request('/api/chats', {method: 'GET'});
		return fetch(request)
		.then(response => response.json())
		.then(json => dispatch(setChats(json)));
	}
}

function setChats(chats) {
	return {
		type: SET_CHATS,
		chats: chats
	}
}