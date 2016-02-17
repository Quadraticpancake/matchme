export const UPDATE_LATEST = 'UPDATE_LATEST';

export const updateLatest = (latestMatch) => {
  return {
    type: 'UPDATE_LATEST',
    latestMatch
  };
};
