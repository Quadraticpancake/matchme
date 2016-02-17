import { UPDATE_GAME_STATE } from '../actions/multiplayer';

const initialState = {
  target: {
    placeholder: true,
    user_id: 3,
    first_name: '',
  },
  prospects: [
    {
      user_id: 4,
      first_name: '',
      votes: {}
    },
    {
      user_id: 5,
      first_name: 'matchmaker.js',
      votes: {}
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAME_STATE:
      return action.updatedGameState;

    default:
      return state;
  }
  return state;
};
