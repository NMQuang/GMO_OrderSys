import messageActionType from '../actionTypes/message.action.type';

// define init state
let initialState = {
  message: null,
  type: null
};

/**
 * reducer of message
 * @param {Object} state 
 * @param {Action Creator} action 
 */
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
  // show message
  case messageActionType.SHOW_MESSAGE:
    {
      return {
        message: action.message,
        type: action.typeMsg
      };
    };
  // hide message
  case messageActionType.HIDE_MESSAGE:
    {
      return {
        message: null,
        type: null
      };
    };
  default:
      return state;
  }
}

export default messageReducer;