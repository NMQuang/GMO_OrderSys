import userService from "../services/user.service";
import userActionType from "../actionTypes/user.action.type";
import loaderAction from "./loader.action";
import messageAction from "./message.action";
import commonUtil from "../utils/commonUtil";
import constant from "../constants/constant"; 

// define action of user
const userAction = {};

/**
 * login
 * @param {String} code
 * @param {String} password
 * @return {} dispatch
 */
userAction.login = (code, password) => {
    return async dispatch => {
        dispatch(loaderAction.showLoader());
        dispatch(userAction.request());
        const result = await userService.login(code, password);
        // check status response. if 4xx dispatch failure else dispatch success
        if (result.status >= 400) {
            dispatch(userAction.failure(result));
        } else {
            dispatch(userAction.success(result));
        }
        dispatch(loaderAction.hideLoader());
    };
};

/**
 * register
 * @param {String} code
 * @param {String} password
 * @param {String} name
 * @return {}dispatch
 */
userAction.register = (code, password, name) => {
    return async dispatch => {
        dispatch(loaderAction.showLoader());
        dispatch(userAction.request());
        const result = await userService.register(code, password, name);
        // check status response. if 4xx dispatch failure else dispatch success
        if (result.status >= 400) {
            dispatch(userAction.registerFailure(result));
        } else {
            dispatch(userAction.registerSuccess(result));
        }
        dispatch(loaderAction.hideLoader());
    }
}

/**
 * change avatar
 * @param {String} userId
 * @param {File} file
 */
userAction.changeAvatar = (userId, file) => {
    return async dispatch => {
        dispatch(loaderAction.showLoader());
        dispatch(userAction.request());
        const result = await userService.changeAvatar(userId, file);
        // check status response. if 4xx dispatch failure else dispatch success
        if (result.status >= 400) {
          dispatch(userAction.changeAvatarFailure(result));
          dispatch(messageAction.showMessage(commonUtil.getMessageResponse(result.data), constant.TYPE_DANGER));
        } else {
          dispatch(messageAction.showMessage(commonUtil.getMessageResponse(result.data), constant.TYPE_SUCCESS));
          dispatch(userAction.changeAvatarSuccess(result));
        }
        dispatch(loaderAction.hideLoader());
      };
}

/**
 * change password
 * @param {String} userId
 * @param {String} oldPassword
 * @param {String} newPassword
 */
userAction.changePassword = (userId, oldPassword, newPassword) => {
    return async dispatch => {
        dispatch(loaderAction.showLoader());
        dispatch(userAction.request());
        const result = await userService.changePassword(userId, oldPassword, newPassword);
        // check status response. if 4xx dispatch failure else dispatch success
        if (result.status >= 400) {
          dispatch(userAction.changePasswordFailure(result));
          dispatch(messageAction.showMessage(commonUtil.getMessageResponse(result.data), constant.TYPE_DANGER));
        } else {
          dispatch(messageAction.showMessage(commonUtil.getMessageResponse(result.data), constant.TYPE_SUCCESS));
          dispatch(userAction.changePasswordSuccess(result));
        }
        dispatch(loaderAction.hideLoader());
      };
}

/**
 * reload
 * @return {} dispatch
 */
userAction.reload = () => dispatch => {
    dispatch(userAction.userReload());
};

/**
 * logout
 * @return {} dispatch
 */
userAction.logout = () => dispatch => {
    dispatch(userAction.userLogout());
};

/**
 * request, before action excute login/register, call action request
 * @return {Action Creator}
 */
userAction.request = () => {
    return {
        type: userActionType.USERS_LOGIN_REQUEST
    };
};

/**
 * success, when a process success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
userAction.success = result => {
    return {
        type: userActionType.USERS_LOGIN_SUCCESS,
        payload: result
    };
};

/**
 * failure, when a process failure, call action failure
 * @param {Object} error
 * @return {Action Creator}
 */
userAction.failure = error => {
    return {
        type: userActionType.USERS_LOGIN_FAILURE,
        payload: error
    };
};

/**
 * logout, when user logout, call action logout
 * @return {Action Creator}
 */
userAction.userLogout = () => {
    return {
        type: userActionType.USERS_LOGOUT_REQUEST
    }
}

/**
 * success, when a process success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
userAction.registerSuccess = result => {
    return {
        type: userActionType.USERS_REGISTER_SUCCESS,
        payload: result
    }
}

/**
 * failure, when a process failure, call action failure
 * @param {Object} error
 * @return {Action Creator}
 */
userAction.registerFailure = error => {
    return {
        type: userActionType.USERS_REGISTER_FAILURE,
        payload: error
    }
}

/**
 * reload, when user reload page, call action reload
 * @return {Action Creator}
 */
userAction.userReload = () => {
    return {
        type: userActionType.USERS_RELOAD_REQUEST
    }
}

/**
 * success, when a process success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
userAction.changeAvatarSuccess = result => {
    return {
        type: userActionType.USERS_CHANGE_AVATAR_SUCCESS,
        payload: result
    }
}

/**
 * failure, when a process failure, call action failure
 * @param {Object} error
 * @return {Action Creator}
 */
userAction.changeAvatarFailure = error => {
    return {
        type: userActionType.USERS_CHANGE_AVATAR_FAILURE,
        payload: error
    }
}

/**
 * success, when a process success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
userAction.changePasswordSuccess = result => {
    return {
        type: userActionType.USERS_CHANGE_PASSWORD_SUCCESS,
        payload: result
    }
}

/**
 * failure, when a process failure, call action failure
 * @param {Object} error
 * @return {Action Creator}
 */
userAction.changePasswordFailure = error => {
    return {
        type: userActionType.USERS_CHANGE_PASSWORD_FAILURE,
        payload: error
    }
}

export default userAction;