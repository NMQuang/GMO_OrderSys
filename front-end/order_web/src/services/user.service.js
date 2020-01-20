import apiUtil from "../utils/apiUtil";
import apiConfig from "../configs/apiConfig";

// define service( process login) of user
const userService = {};

/**
 * login
 * @param {String} code
 * @param {String} password
 * @return {} result
 */
userService.login = async(code, password) => {
    const method = apiConfig.method.METHOD_POST;
    const body = JSON.stringify({
        code,
        password
    });
    try {
        const result = await apiUtil.callApi(apiConfig.endpoint.USER_LOGIN, method, body);
        return result;
    } catch (error) {
        return error.response;
    }
};

/**
 * register
 * @param {String} code
 * @param {String} password
 * @param {String} name
 * @return {}result
 */
userService.register = async(code, password, name) => {
    const method = apiConfig.method.METHOD_POST;
    const body = JSON.stringify({
        code,
        password,
        name
    });
    try {
        const result = await apiUtil.callApi(apiConfig.endpoint.USER_REGISTER, method, body);
        return result;
    } catch (error) {
        return error.response;
    }
};

/**
 * Call api change avatar user
 * @param {String} name
 * @param {String} note
 * @param {String} price
 * @param {File} file
 */
userService.changeAvatar = async(userId, file) => {
    const method = apiConfig.method.METHOD_POST;
    let formData = new FormData();
    formData.set("userId", userId);
    formData.append("image", file);
    try {
        const result = await apiUtil.callApi(apiConfig.endpoint.USER_CHANGE_AVATAR, method, formData, apiConfig.header.HEADER_MULTIPART)
        return result;
    } catch (error) {
        return error.response;
    }
}

/**
 * change password
 * @param {String} userId
 * @param {String} oldPassword
 * @param {String} newPassword
 * @return {}result
 */
userService.changePassword = async(userId, oldPassword, newPassword) => {
    const method = apiConfig.method.METHOD_POST;
    const body = JSON.stringify({
        userId,
        oldPassword,
        newPassword
    });
    try {
        const result = await apiUtil.callApi(apiConfig.endpoint.USER_CHANGE_PASSWORD, method, body, apiConfig.header.HEADER_TOKEN);
        return result;
    } catch (error) {
        return error.response;
    }
};

export default userService;