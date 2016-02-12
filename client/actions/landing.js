export const CHANGE_LANDING_INDEX = 'CHANGE_LANDING_INDEX';

export const changeIndex = (e) => {
  var indexChange;
  if (typeof e === 'number') {
    indexChange = e;
  } else if (e.keyCode === 39) {
    indexChange = 1;
  } else if (e.keyCode === 37) {
    indexChange = -1;
  } else {
    indexChange = 0;
  }
  return dispatch => {
    dispatch(changeLandingIndexAction(indexChange));
  }
}

// Updates index for UserScore in state. indexChange increments or decrements index according to it's val
export const changeLandingIndexAction = (indexChange) => {
  return {
    type: CHANGE_LANDING_INDEX,
    indexChange: indexChange
  }
}