import { CHANGE_LANDING_INDEX } from '../actions/landing';

// FB.getLoginStatus()
const initialState = {
  index: 0,
  count: 4
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CHANGE_LANDING_INDEX:
      newState.index += action.indexChange;
      if (newState.index === -1) {
        newState.index += 1;
      } else if (newState.index === newState.count) {
        newState.index -= 1;
      }
      return newState;

    default:
      return state;
  }
};
