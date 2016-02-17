export const UPDATE_SCOREBOARD = 'UPDATE_SCOREBOARD';

export const updateScoreboard = (updatedScoreboard) => {
  return {
    type: UPDATE_SCOREBOARD,
    updatedScoreboard: updatedScoreboard
  };
};
