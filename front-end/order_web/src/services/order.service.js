import apiUtil from "../utils/apiUtil";
import apiConfig from "../configs/apiConfig";

const orderService = {};

/**
 * Call api order menu
 * @param {number} menuId
 * @param {number} userId
 * @param {number} productId
 */
orderService.order = async(menuId, userId, productId) => {
  const method = apiConfig.method.METHOD_POST;
  const body = {
      menuId,
      userId,
      productId
  };
  try {
    const result = await apiUtil.callApi(apiConfig.endpoint.ORDER_CREATE, method, body, apiConfig.header.HEADER_TOKEN);
    return result;
  } catch (error) {
      return error.response;
  }
}

/**
 * Call api update order
 * @param {number} orderId
 * @param {number} productId
 * @param {number} menuId
 */
orderService.editOrder = async(orderId, productId, menuId) => {
  const method = apiConfig.method.METHOD_POST;
  const body = {
      orderId,
      productId,
      menuId
  };
  try {
    const result = await apiUtil.callApi(apiConfig.endpoint.ORDER_EDIT, method, body, apiConfig.header.HEADER_TOKEN);
    return result;
  } catch (error) {
      return error.response;
  }
}

export default orderService;
