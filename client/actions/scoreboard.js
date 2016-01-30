export const UPDATE_SCOREBOARD = 'UPDATE_SCOREBOARD';

export function updateScoreboard(updatedScoreboard) {
  return {
    type: UPDATE_SCOREBOARD,
    updatedScoreboard: updatedScoreboard
  };
}
