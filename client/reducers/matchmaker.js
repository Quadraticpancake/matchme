import { CHOOSE_MATCH, REQUEST_TRIAD, RECEIVE_TRIAD, UPDATE_SCORE, SET_SCORE } from '../actions/matchmaker';

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
      first_name: 'matchmaker.js'
    }
  ]
};

export default function matchmaker(state = initialState, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {

    case CHOOSE_MATCH:
      return newState;

    case REQUEST_TRIAD:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case RECEIVE_TRIAD:

      // let newTriad = Object.assign({}, action.triad, {
      //   isFetching: false,
      //   lastUpdated: action.receivedAt
      // })
      let target = action.triad.pop();
      let prospects = action.triad;

      console.log('NEW TRIAD');
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.receivedAt,
        target: target,
        prospects: prospects
      });



    default:
      return state;
  }
}
