import orderActionType from '../actionTypes/order.action.type';

// define init state
let initialState = {
  createEditData: null,
  createEditError: null,
};

/**
 * reducer of order
 * @param {Object} state 
 * @param {Action Creator} action 
 */
const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        // order request
        case orderActionType.ORDER_REQUEST:
          {
            return {
                ...state
            };
          };
        // order/edit success
        case orderActionType.ORDER_CREATE_EDIT_SUCCESS:
          {
            state.createEditData = action.payload.data;
            return {
                ...state,
                createEditError: null
            };
          };
        // order/edit failure
        case orderActionType.ORDER_CREATE_EDIT_FAILURE:
          {
            state.createEditError = action.payload.data;
            return {
                ...state,
                createEditData: null
            };
          };
        default:
            return state;
    }
}

export default orderReducer;