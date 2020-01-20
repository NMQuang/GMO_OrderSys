import loaderActionType from "../actionTypes/loader.action.type";

// define action of loader
const loaderAction = {};

/**
 * show loader
 * @return {} dispatch
 */
loaderAction.showLoader = () => {
  return dispatch => {
      dispatch(loaderAction.showLoaderRequest());
  };
};

/**
 * hide loader
 * @return {} dispatch
 */
loaderAction.hideLoader = () => {
  return dispatch => {
      dispatch(loaderAction.hideLoaderRequest());
  };
};

/**
 * show loader request
 * @return {Action Creator}
 */
loaderAction.showLoaderRequest = () => {
  return {
    type: loaderActionType.SHOW_LOADER
  };
};

/**
 * hide loader request
 * @return {Action Creator}
 */
loaderAction.hideLoaderRequest = () => {
  return {
    type: loaderActionType.HIDE_LOADER
  };
};

export default loaderAction;
