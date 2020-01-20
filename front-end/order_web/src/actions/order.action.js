import orderService from "../services/order.service";
import orderActionType from "../actionTypes/order.action.type";
import loaderAction from "./loader.action";
import socket from "../configs/socket";
import messageAction from "./message.action";
import constant from "../constants/constant";
import commonUtil from "../utils/commonUtil";

// define action of order
const orderAction = {};

/**
 * order
 * @param {String} menuId
 * @param {String} userId
 * @param {String} productId
 * @return {} dispatch
 */
orderAction.order = (menuId, userId, productId) => {
  return async dispatch => {
    dispatch(orderAction.request());
    dispatch(loaderAction.showLoader());
    const result = await orderService.order(menuId, userId, productId);
    // check status response. if 4xx dispatch failure else dispatch success and get menu detail again
    if (result.status >= 400) {
      dispatch(orderAction.createEditFailure(result));
      dispatch(messageAction.showMessage(commonUtil.getMessageResponse(result.data), constant.TYPE_DANGER));
      dispatch(loaderAction.hideLoader());
    } else {
      socket.emit("order-update-success", menuId);
      dispatch(messageAction.showMessage(commonUtil.getMessageResponse(result.data), constant.TYPE_SUCCESS));
      dispatch(orderAction.createEditSuccess(result));
    }
  };
};

/**
 * edit
 * @param {String} orderId
 * @param {String} productId
 * @param {String} menuId
 * @param {String} userId
 * @return {} dispatch
 */
orderAction.edit = (orderId, productId, menuId, userId) => {
  return async dispatch => {
    dispatch(orderAction.request());
    dispatch(loaderAction.showLoader());
    const result = await orderService.editOrder(orderId, productId, menuId);
    // check status response. if 4xx dispatch failure else dispatch success and get menu detail again
    if (result.status >= 400) {
      dispatch(orderAction.createEditFailure(result));
      dispatch(messageAction.showMessage(commonUtil.getMessageResponse(result.data), constant.TYPE_DANGER));
      dispatch(loaderAction.hideLoader());
    } else {
      socket.emit("order-update-success", menuId);
      dispatch(messageAction.showMessage(commonUtil.getMessageResponse(result.data), constant.TYPE_SUCCESS));
      dispatch(orderAction.createEditSuccess(result));
    }
  };
};

/**
 * request, before action excute order/edit, call action request
 * @return {Action Creator}
 */
orderAction.request = () => {
  return {
    type: orderActionType.ORDER_REQUEST
  };
};

/**
 * success, when order/edit success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
orderAction.createEditSuccess = result => {
  return {
    type: orderActionType.ORDER_CREATE_EDIT_SUCCESS,
    payload: result
  };
};

/**
 * failure, when order/edit failure, call action failure
 * @param {Object} error
 * @return {Action Creator}
 */
orderAction.createEditFailure = error => {
  return {
    type: orderActionType.ORDER_CREATE_EDIT_FAILURE,
    payload: error
  };
};

export default orderAction;
