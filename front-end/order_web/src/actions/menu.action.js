import menuActionType from "../actionTypes/menu.action.type";
import menuService from "../services/menu.service";
import loaderAction from "./loader.action";
import messageAction from "./message.action";
import constant from "../constants/constant";
import commonUtil from "../utils/commonUtil";
import socket from "../configs/socket";

const menuAction = {};

/**
 * fetch data
 * @return {} dispatch
 */
menuAction.fetch = () => {
  return async dispatch => {
    dispatch(menuAction.request());
    dispatch(loaderAction.showLoader());
    const result = await menuService.getAllMenu();
    // check status response. if 4xx dispatch failure else dispatch success
    if (result.status >= 400) {
      dispatch(menuAction.fetchFailure(result));
    } else {
      dispatch(menuAction.fetchSuccess(result));
    }
    dispatch(loaderAction.hideLoader());
  };
};
/**
 * Get detail menu by menu id
 * @param {String} menuId
 * @param {String} userId
 * @return {} dispatch
 */
menuAction.getDetailMenuByMenuId = (menuId, userId) => {
  return async dispatch => {
    dispatch(menuAction.request());
    dispatch(loaderAction.showLoader());
    const result = await menuService.getMenuDetail(menuId, userId);
    // check status response. if 4xx dispatch failure else dispatch success
    if (result.status >= 400) {
      dispatch(menuAction.menuDetailFailure(result));
    } else {
      dispatch(menuAction.menuDetailSuccess(result));
    }
    dispatch(loaderAction.hideLoader());
  };
};
/**
 * Create Menu
 * @param {datetime} valid_from
 * @param {datetime} valid_to
 * @param {array} listProduct
 * @return {} dispatch
 */
menuAction.createMenu = (valid_from, valid_to, listProduct) => {
  return async dispatch => {
    dispatch(menuAction.request());
    dispatch(loaderAction.showLoader());
    const result = await menuService.createMenu(
      valid_from,
      valid_to,
      listProduct
    );
    // check status response. if 4xx dispatch failure else dispatch success
    if (result.status >= 400) {
      dispatch(menuAction.createMenuFailure(result));
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_DANGER
        )
      );
    } else {
      dispatch(menuAction.createMenuSuccess(result));
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_SUCCESS
        )
      );
    }
    dispatch(loaderAction.hideLoader());
  };
};
/**
 * Create Menu
 * @param {datetime} valid_from
 * @param {datetime} valid_to
 * @param {String} menuId
 * @param {array} listProduct
 * @return {} dispatch
 */
menuAction.editMenu = (menuId, valid_from, valid_to, listProduct) => {
  return async dispatch => {
    dispatch(menuAction.request());
    dispatch(loaderAction.showLoader());
    const result = await menuService.editMenu(
      menuId,
      valid_from,
      valid_to,
      listProduct
    );
    // check status response. if 4xx dispatch failure else dispatch success
    if (result.status >= 400) {
      dispatch(menuAction.editMenuFailure(result));
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_DANGER
        )
      );
    } else {
      socket.emit("create-edit-menu-success", menuId);
      dispatch(menuAction.editMenuSuccess(result));
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_SUCCESS
        )
      );
    }
    dispatch(loaderAction.hideLoader());
  };
};

/**
 * clone Menu
 * @param {datetime} valid_from
 * @param {datetime} valid_to
 * @param {String} menuId
 * @return {} dispatch
 */
menuAction.cloneMenu = (menuId, valid_from, valid_to) => {
  return async dispatch => {
    dispatch(menuAction.request());
    dispatch(loaderAction.showLoader());
    const result = await menuService.cloneMenu(menuId, valid_from, valid_to);
    // check status response. if 4xx dispatch failure else dispatch success
    if (result.status >= 400) {
      dispatch(menuAction.cloneMenuFailure(result));
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_DANGER
        )
      );
    } else {
      dispatch(menuAction.cloneMenuSuccess(result));
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_SUCCESS
        )
      );
    }
    dispatch(loaderAction.hideLoader());
  };
};
/**
 * get menu summary
 * @param {String} menuId
 * @return {} dispatch
 */
menuAction.getMenuSummary = menuId => {
  return async dispatch => {
    dispatch(menuAction.request());
    dispatch(loaderAction.showLoader());
    const result = await menuService.getSummary(menuId);
    // check status response. if 4xx dispatch failure else dispatch success
    if (result.status >= 400) {
      dispatch(menuAction.getSummaryFailure(result));
    } else {
      dispatch(menuAction.getSummarySuccess(result));
    }
    dispatch(loaderAction.hideLoader());
  };
};
/**
 * request, before action excute add/edit/delete, call action request
 * @return {Action Creator}
 */
menuAction.request = () => {
  return {
    type: menuActionType.MENU_REQUEST
  };
};

/**
 * success, when get detail success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
menuAction.menuDetailSuccess = result => {
  return {
    type: menuActionType.MENU_GET_DETAIL_SUCCESS,
    payload: result
  };
};
/**
 * fail, when get detail fail, call action fail
 * @param {Object} error
 * @return {Action Creator}
 */
menuAction.menuDetailFailure = error => {
  return {
    type: menuActionType.MENU_GET_DETAIL_FAILURE,
    payload: error
  };
};

/**
 * success, when create success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
menuAction.createMenuSuccess = result => {
  return {
    type: menuActionType.MENU_CREATE_SUCCESS,
    payload: result
  };
};
/**
 * fail, when clone fail, call action fail
 * @param {Object} error
 * @return {Action Creator}
 */
menuAction.createMenuFailure = error => {
  return {
    type: menuActionType.MENU_CREATE_FAILURE,
    payload: error
  };
};
/**
 * success, when edit success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
menuAction.editMenuSuccess = result => {
  return {
    type: menuActionType.MENU_EDIT_SUCCESS,
    payload: result
  };
};
/**
 * fail, when edit fail, call action fail
 * @param {Object} error
 * @return {Action Creator}
 */
menuAction.editMenuFailure = error => {
  return {
    type: menuActionType.MENU_EDIT_FAILURE,
    payload: error
  };
};
/**
 * success, when clone success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
menuAction.cloneMenuSuccess = result => {
  return {
    type: menuActionType.MENU_CLONE_SUCCESS,
    payload: result
  };
};
/**
 * fail, when clone fail, call action fail
 * @param {Object} error
 * @return {Action Creator}
 */
menuAction.cloneMenuFailure = error => {
  return {
    type: menuActionType.MENU_CLONE_FAILURE,
    payload: error
  };
};

/**
 * success, when fetch success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
menuAction.fetchSuccess = result => {
  return {
    type: menuActionType.MENU_LIST_SUCCESS,
    payload: result
  };
};
/**
 * fail, when fetch fail, call action fail
 * @param {Object} error
 * @return {Action Creator}
 */
menuAction.fetchFailure = error => {
  return {
    type: menuActionType.MENU_LIST_FAILURE,
    payload: error
  };
};
/**
 * success, when get summary success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
menuAction.getSummarySuccess = result => {
  return {
    type: menuActionType.MENU_GET_SUMMARY_SUCCESS,
    payload: result
  };
};

/**
 * failure, when get summary failure, call action failure
 * @param {Object} error
 * @return {Action Creator}
 */
menuAction.getSummaryFailure = error => {
  return {
    type: menuActionType.MENU_GET_SUMMARY_FAILURE,
    payload: error
  };
};

export default menuAction;
