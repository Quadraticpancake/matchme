import * as store from './scoreboard/'
import { io } from './server';

io.on('connection', (socket) => {
	// send out current scoreboard state to anyone who uses the app
	socket.emit('scoreboard', store.getState())

	// Make the user join rooms for each pair/chat he/she is a part of
	socket.on('joinChatrooms', (chats) => {
		console.log('joining chatrooms with', chats)
		Object.keys(chats.chats).forEach((chat) => {
			socket.join(`${chat}`);
		});
		console.log(socket.rooms);
	});

	socket.to('68').emit('refreshChats');
});

// Sends out updated scoreboard every time the server-side scoreboard store changes
store.subscribe(() => {
	io.emit('scoreboard', store.getState())
});