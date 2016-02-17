import { RECEIVE_REC } from '../actions/recommendationActions.js';

const initialState = {
  image_url: 'http://change-production.s3.amazonaws.com/assets/images/global/default_user_icon.jpg?1318997831',
  first_name: 'Your Dream Match',
  gender: 'none',
  birthday: 'none',
  description: 'What are you waiting for?'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_REC:
      return action.recommendation;
    default:
      return state;
  }

};
