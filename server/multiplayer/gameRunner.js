import * as multiplayerStore from './index';
import * as multiplayerActions from './actions';
import { addMatchWithBonus, getMatchSetMP } from '../../db/gameHelpers';
import { each } from 'underscore';
import { io } from '../server';
// These functions manage the game state (starting it, and progressing between stages)
// The communication of the game state with the client happens in ../sockets.js

const progressGame = () => {
  // determine winner of this round (prospect with more votes) if one exists
  const gameState = multiplayerStore.getState();

  // count votes (votes are determined by the number of keys under each prospect's votes
  // (where one key represents one voter))
  const prospect0Votes = Object.keys(gameState.prospects[0].votes).length;
  const prospect1Votes = Object.keys(gameState.prospects[1].votes).length;
  let roundWinner = null;

  if (prospect0Votes > prospect1Votes) {
    roundWinner = gameState.prospects[0];
  }

  if (prospect0Votes < prospect1Votes) {
    roundWinner = gameState.prospects[1];
  }

  if (roundWinner) {
    each(roundWinner.votes, (voter, key) => {
      addMatchWithBonus({ matchmaker: { user_id: key },
        pair: { target: gameState.target,
        prospect: roundWinner } });
    });
  }

  // proceed to next game state
  getMatchSetMP(1).then((matchSet) => {
    multiplayerStore.dispatch({ type: multiplayerActions.RESET_TIMER });
    multiplayerStore.dispatch({ type: multiplayerActions.NEW_MATCH_SET,
    newMatchSet: matchSet.triads[0] });
    io.emit('getNewScore');
    io.emit('gameState', multiplayerStore.getState());
  });
};

setInterval(() => {
  const gameTimer = multiplayerStore.getState().timer;
  if (gameTimer === 0) {
    // progress game to next state
    progressGame();
  }
  multiplayerStore.dispatch({ type: multiplayerActions.DECREMENT_TIMER });
}, 1000);

// start the game when the server starts
// Seeds the multiplayer game with one match set
getMatchSetMP(1).then((matchSet) => {
  multiplayerStore.dispatch({ type: multiplayerActions.NEW_MATCH_SET,
  newMatchSet: matchSet.triads[0] });
});
