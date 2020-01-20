import apiUtil from "../utils/apiUtil";
import apiConfig from "../configs/apiConfig";

const menuService = {};

/**
 * Call api get menu detail
 * @param {number} menuId
 * @param {number} userId
 */
menuService.getMenuDetailAndUserOrder = async (menuId, userId) => {
  const method = apiConfig.method.METHOD_POST;
  const body = {
    menuId,
    userId
  };
  try {
    const result = await apiUtil.callApi(
      apiConfig.endpoint.MENU_DETAIL,
      method,
      body,
      apiConfig.header.HEADER_TOKEN
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

/**
 * Call api get menu by menuId
 */
menuService.getMenuByMenuId = async menuId => {
  const method = apiConfig.method.METHOD_POST;
  const body = { menuId };
  const header = {
    "Content-Type": "application/json",
    "x-access-token": localStorage.accessToken
  };
  try {
    const result = await apiUtil.callApi(
      apiConfig.endpoint.MENU_FIND,
      method,
      body,
      header
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

/**
 * Call api get all menu
 */
menuService.getAllMenu = async () => {
  const method = apiConfig.method.METHOD_POST;
  const body = {};
  const header = {
    "Content-Type": "application/json",
    "x-access-token": localStorage.accessToken
  };
  try {
    const result = await apiUtil.callApi(
      apiConfig.endpoint.MENU_LIST,
      method,
      body,
      header
    );
    return result;
  } catch (error) {
    return error.response;
  }
};
/**
 * Cal api get menu summary
 */
menuService.getSummary = async menuId => {
  const method = apiConfig.method.METHOD_POST;
  const body = {
    menuId
  };
  try {
    const result = await apiUtil.callApi(
      apiConfig.endpoint.MENU_SUMMARY,
      method,
      body,
      apiConfig.header.HEADER_TOKEN
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

/**
 * Call api get detail menu by id
 *
 */
menuService.getMenuDetail = async (menuId, userId) => {
  const method = apiConfig.method.METHOD_POST;
  const body = {
    menuId,
    userId
  };
  try {
    const result = await apiUtil.callApi(
      apiConfig.endpoint.MENU_DETAIL,
      method,
      body,
      apiConfig.header.HEADER_TOKEN
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

/**
 * Call api create menu
 *
 */
menuService.createMenu = async (validFrom, validTo, listProduct) => {
  const method = apiConfig.method.METHOD_POST;
  const body = {
    validFrom,
    validTo,
    listProduct
  };
  try {
    const result = await apiUtil.callApi(
      apiConfig.endpoint.MENU_CREATE,
      method,
      body,
      apiConfig.header.HEADER_TOKEN
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

/**
 * Call api edit menu
 *
 */
menuService.editMenu = async (menuId, validFrom, validTo, listProduct) => {
  const method = apiConfig.method.METHOD_POST;
  const body = {
    menuId,
    validFrom,
    validTo,
    listProduct
  };
  try {
    const result = await apiUtil.callApi(
      apiConfig.endpoint.MENU_EDIT,
      method,
      body,
      apiConfig.header.HEADER_TOKEN
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

/**
 * Call api clone menu
 *
 */
menuService.cloneMenu = async (menuId, validFrom, validTo) => {
  const method = apiConfig.method.METHOD_POST;
  const body = {
    menuId,
    validFrom,
    validTo
  };
  try {
    const result = await apiUtil.callApi(
      apiConfig.endpoint.MENU_CLONE,
      method,
      body,
      apiConfig.header.HEADER_TOKEN
    );
    return result;
  } catch (error) {
    return error.response;
  }
};
export default menuService;
