export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';

export function updateGameState(gameState) {
  return {
    type: UPDATE_GAME_STATE,
    updatedGameState: gameState
  };
}
