function updateLatest(state, latestMatch) {
  state.unshift(latestMatch);
  if (state.length > 5) {
    state.pop();
  }
  return state;
}

export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_LATEST':
      return updateLatest(state, action.latestMatch);
    default:
      return state;
  }
  return state;
}
