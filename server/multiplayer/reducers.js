import * as MultiplayerActions from './actions';

const initialState = {
  timer: 60
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MultiplayerActions.NEW_MATCH_SET:
      action.newMatchSet.prospects.forEach((prospect) => {
        prospect.votes = {};
      });
      return Object.assign({}, state, action.newMatchSet);

    case MultiplayerActions.SET_VOTE:
      const newState = Object.assign({}, state);
      const voter = action.voteObj.voter;

      // votes are stored in a votes array for each prospect
      // push the voter's user_id into the votes array to represent one vote for that prospect
      newState.prospects.forEach((prospect) => {
        // delete the voter's vote from both prospects, then place it again
        // in whichever prospect was selected
        // (this allows voters to switch their votes back and forth)
        delete prospect.votes[voter.user_id];

        if (prospect.user_id === action.voteObj.prospect.user_id) {
          prospect.votes[voter.user_id] = voter;
        }
      });
      return newState;

    case MultiplayerActions.DECREMENT_TIMER:
      return Object.assign({}, state, {
        timer: state.timer - 1
      });

    case MultiplayerActions.RESET_TIMER:
      return Object.assign({}, state, {
        timer: 60
      });

    default:
      return state;
  }
  return state;
};
