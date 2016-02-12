import * as multiplayerStore from './index';
import * as multiplayerActions from './actions';
import { getMatchSet } from '../../db/dbHelpers';
import { addMatchWithBonus } from '../../db/gameHelpers';
import { each } from 'underscore';
import { io } from '../server';
// These functions manage the game state (starting it, and progressing between stages)
// The communication of the game state with the client happens in ../sockets.js
console.log('getMatchSet', getMatchSet(0));
setInterval(() => {
	var gameTimer = multiplayerStore.getState().timer;
	if (gameTimer === 0) {
		// progress game to next state
		progressGame();
	}
	multiplayerStore.dispatch({type: multiplayerActions.DECREMENT_TIMER});
	
}, 1000);

// start the game when the server starts
	// Seeds the multiplayer game with one match set
setTimeout(() => {
	console.log('getMatchSet', getMatchSet(0));
	multiplayerStore.dispatch({type: multiplayerActions.NEW_MATCH_SET, newMatchSet: getMatchSet(0)});
}, 2000);

var progressGame = () => {
	// determine winner of this round (prospect with more votes) if one exists
	var gameState = multiplayerStore.getState();

	// count votes (votes are determined by the number of keys under each prospect's votes (where one key represents one voter))
	var prospect0Votes = Object.keys(gameState.prospects[0].votes).length;
	var prospect1Votes = Object.keys(gameState.prospects[1].votes).length;
	var roundWinner = null;

	if (prospect0Votes > prospect1Votes) {
		roundWinner = gameState.prospects[0];
	}

	if (prospect0Votes < prospect1Votes) {
		roundWinner = gameState.prospects[1];
	}

	if (roundWinner) {
		each(roundWinner.votes, function(voter, key) {
			addMatchWithBonus({matchmaker: {user_id: key}, pair: {target: gameState.target, prospect: roundWinner}});
		});
	}

	// proceed to next game state
	multiplayerStore.dispatch({type: multiplayerActions.RESET_TIMER});
	multiplayerStore.dispatch({type: multiplayerActions.NEW_MATCH_SET, newMatchSet: getMatchSet(0)});
	io.emit('getNewScore');
	io.emit('gameState', multiplayerStore.getState());


}