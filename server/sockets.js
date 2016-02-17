import * as store from './scoreboard/';
import { io } from './server';
import * as multiplayerStore from './multiplayer';
import * as multiplayerActions from './multiplayer/actions';

io.on('connection', (socket) => {
  socket.on('joinGame', () => {
    socket.emit('gameState', multiplayerStore.getState());
  });

  socket.on('vote', (data) => {
    multiplayerStore.dispatch({ type: multiplayerActions.SET_VOTE, voteObj: data });
    io.emit('gameState', multiplayerStore.getState());
  });

  // send out current scoreboard state to anyone who uses the app
  socket.emit('scoreboard', store.getState());

  // Make the user join rooms for each pair/chat he/she is a part of
  socket.on('joinChatrooms', (chats) => {
    Object.keys(chats.chats).forEach((chat) => {
      socket.join(`${chat}`);
    });
  });

  socket.to('68').emit('refreshChats');
});

// Sends out updated scoreboard every time the server-side scoreboard store changes
store.subscribe(() => {
  io.emit('scoreboard', store.getState());
});
