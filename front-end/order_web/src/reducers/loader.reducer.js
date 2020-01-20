import loaderActionType from '../actionTypes/loader.action.type';

// define init state
let initialState = {
  isLoading: false
};

/**
 * reducer of user
 * @param {Object} state 
 * @param {Action Creator} action 
 */
const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
  // show loader
  case loaderActionType.SHOW_LOADER:
    {
      return {
        isLoading: true
      };
    };
  // hide loader
  case loaderActionType.HIDE_LOADER:
    {
      return {
        isLoading: false
      };
    };
  default:
      return state;
  }
}

export default loaderReducer;