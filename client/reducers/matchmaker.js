import { CHOOSE_MATCH, REQUEST_TARGET, RECEIVE_TARGET } from '../actions/matchmaker'

const initialState = {
  target: {
    name: 'Liam',
    isFetching: false
  },
  prospects: {
    isFetching: false,
    items: [
      {
        name: 'Rachel'
      },
      {
        name: 'Luellen'
      }
    ]
  }
}

export default function matchmaker(state = initialState, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {

    case CHOOSE_MATCH:
      return newState

    case REQUEST_TARGET:
      return Object.assign({}, state, {
        isFetching: true,
      })

    case RECEIVE_TARGET:

      let newTarget = Object.assign({}, action.target, {
        isFetching: false, 
        lastUpdated: action.receivedAt
      })

      console.log('NEW TARGET', newTarget.name)
      return Object.assign({}, state, {
        target: newTarget
      })

    default:
      return state
  }
}
