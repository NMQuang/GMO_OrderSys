import messageActionType from "../actionTypes/message.action.type";

// define action of message
const messageAction = {};

/**
 * show message
 * @return {} dispatch
 */
messageAction.showMessage = (message, typeMsg) => {
  return dispatch => {
    dispatch(messageAction.showMessageRequest(message, typeMsg));
    setTimeout(() => {
      dispatch(messageAction.hideMessageRequest());
    }, 1000);
  };
};

/**
 * show message request
 * @return {Action Creator}
 */
messageAction.showMessageRequest = (message, typeMsg) => {
  return {
    type: messageActionType.SHOW_MESSAGE,
    message,
    typeMsg
  };
};

/**
 * hide message request
 * @return {Action Creator}
 */
messageAction.hideMessageRequest = () => {
  return {
    type: messageActionType.HIDE_MESSAGE
  };
};

export default messageAction;