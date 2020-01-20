import apiUtil from "../utils/apiUtil";
import apiConfig from "../configs/apiConfig";

const productService = {};

/**
 * Call api get all product
 */
productService.getAllProduct = async() => {
    const method = apiConfig.method.METHOD_POST;
    const body = null;
    try {
        const result = await apiUtil.callApi(apiConfig.endpoint.PRODUCT_LIST, method, body, apiConfig.header.HEADER_TOKEN)
        return result;
    } catch (error) {
        return error.response;
    }
}

/**
 * Call api get product detail
 * @param {String} productId
 */
productService.getProductDetail = async(productId) => {
    const method = apiConfig.method.METHOD_POST;
    const body = {
        productId
    };
    try {
        const result = await apiUtil.callApi(apiConfig.endpoint.PRODUCT_DETAIL, method, body, apiConfig.header.HEADER_TOKEN);
        return result;
    } catch (error) {
        return error.response;
    }
}

/**
 * Call api create new product
 * @param {String} name
 * @param {String} note
 * @param {String} price
 * @param {File} file
 */
productService.createProduct = async(name, note, price, file) => {
    const method = apiConfig.method.METHOD_POST;
    let formData = new FormData();
    formData.set("name", name);
    formData.set("note", note);
    formData.set("price", price);
    formData.append("image", file);
    try {
        const result = await apiUtil.callApi(apiConfig.endpoint.PRODUCT_CREATE, method, formData, apiConfig.header.HEADER_MULTIPART)
        return result;
    } catch (error) {
        return error.response;
    }
}

/**
 * Call api edit product
 * @param {String} productId
 * @param {String} name
 * @param {String} note
 * @param {String} price
 * @param {File} file
 */
productService.editProduct = async(productId, name, note, price, file) => {
    const method = apiConfig.method.METHOD_POST;
    let formData = new FormData();
    formData.set("productId", productId);
    formData.set("name", name);
    formData.set("note", note);
    formData.set("price", price);
    if (file) {
        formData.append("image", file);
    }
    try {
        const result = await apiUtil.callApi(apiConfig.endpoint.PRODUCT_EDIT, method, formData, apiConfig.header.HEADER_MULTIPART)
        return result;
    } catch (error) {
        return error.response;
    }
}

/**
 * Call api delete product
 * @param {String} productId
 */
productService.deleteProduct = async(productId) => {
    const method = apiConfig.method.METHOD_POST;
    const body = JSON.stringify({
        productId
    });
    try {
        const result = await apiUtil.callApi(apiConfig.endpoint.PRODUCT_DELETE, method, body, apiConfig.header.HEADER_TOKEN);
        return result;
    } catch (error) {
        return error.response;
    }
};

export default productService;