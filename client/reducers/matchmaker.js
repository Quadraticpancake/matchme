import { CHOOSE_MATCH, REQUEST_TRIAD, RECEIVE_TRIAD } from '../actions/matchmaker'

const initialState = {
  isFetching: false,
  target: {
    user_id: 3,
    first_name: 'Liam',
  },
  prospects: [
    {
      user_id: 4,
      first_name: 'Rachel'
    },
    {
      user_id: 5,
      first_name: 'Luellen'
    }
  ]
}

export default function matchmaker(state = initialState, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {

    case CHOOSE_MATCH:
      return newState

    case REQUEST_TRIAD:
      return Object.assign({}, state, {
        isFetching: true,
      })

    case RECEIVE_TRIAD:

      // let newTriad = Object.assign({}, action.triad, {
      //   isFetching: false, 
      //   lastUpdated: action.receivedAt
      // })

      let target = action.triad.pop();

      let prospects = action.triad;


      console.log('NEW TRIAD')
      return Object.assign({}, state, {
        isFetching: false, 
        lastUpdated: action.receivedAt,
        target: target,
        prospects: prospects
      })  

    default:
      return state
  }
}
