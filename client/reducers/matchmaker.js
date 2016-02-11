import { CHOOSE_MATCH, REQUEST_TRIAD, RECEIVE_TRIADS, UPDATE_SCORE, SET_SCORE } from '../actions/matchmaker';

const initialState = {
  isFetching: false,
  target: {
    placeholder: true,
    user_id: 3,
    first_name: '',
  },
  prospects: [
    {
      user_id: 4,
      first_name: ''
    },
    {
      user_id: 5,
      first_name: ''
    }
  ],
  triads: []
};

export default function matchmaker(state = initialState, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {

    case CHOOSE_MATCH:
      return newState;

    case REQUEST_TRIAD:
      if (newState.triads && newState.triads.length === 0) {
        return Object.assign({}, state, {
          isFetching: true,
        });
      } else {
        let triad = newState.triads.pop();
        newState.target = triad.target;
        newState.prospects = triad.prospects;
        return newState;
      }

    case RECEIVE_TRIADS:
      let triads = (action.triads).concat(newState.triads);
      console.log('WE RECIEVED TRIADS AND HERE THEY ARE', triads);
      if (newState.triads.length === 0) {
        let t = triads.pop();
        newState.triads = triads;
        newState.target = t.target;
        newState.prospects = t.prospects;
        newState.lastUpdated = action.receivedAt;
        newState.isFetching = false;
        return newState;
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          lastUpdated: action.receivedAt,
          triads: triads
        });
      }




    default:
      return state;
  }
}
