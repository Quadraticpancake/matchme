import * as MultiplayerActions from './actions';

const initialState = {
	timer: 5
}

export default function(state = initialState, action) {
	switch (action.type) {
		case MultiplayerActions.NEW_MATCH_SET:
			action.newMatchSet.prospects.forEach(function(prospect) {
				prospect.votes = {};
			});
			return Object.assign({}, state, action.newMatchSet);

		case MultiplayerActions.SET_VOTE:
			var newState = Object.assign({}, state);
			var voter = action.voteObj.voter;

			// votes are stored in a votes array for each prospect
			// push the voter's user_id into the votes array to represent one vote for that prospect
			newState.prospects.forEach(function(prospect) {
				// delete the voter's vote from both prospects, then place it again in whichever prospect was selected
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
				timer: 5
			});
	}
	return state;
}