import productService from "../services/product.service";
import productActionType from "../actionTypes/product.action.type";
import loaderAction from "./loader.action";
import socket from "../configs/socket";
import messageAction from "./message.action";
import constant from "../constants/constant";
import commonUtil from "../utils/commonUtil";

// define action of product
const productAction = {};

/**
 * fetch data
 * @return {} dispatch
 */
productAction.fetch = () => {
  return async dispatch => {
    dispatch(loaderAction.showLoader());
    dispatch(productAction.request());
    const result = await productService.getAllProduct();
    // check status response. if 4xx dispatch failure else dispatch success
    if (result.status >= 400) {
      dispatch(productAction.fetchFailure(result));
    } else {
      dispatch(productAction.fetchSuccess(result));
    }
    dispatch(loaderAction.hideLoader());
  };
};

/**
 * get product detail by id
 * @param {String} productId
 * @return {} dispatch
 */
productAction.getProductDetail = productId => {
  return async dispatch => {
    dispatch(loaderAction.showLoader());
    dispatch(productAction.request());
    const result = await productService.getProductDetail(productId);
    // check status response. if 4xx dispatch failure else dispatch success
    if (result.status >= 400) {
      dispatch(productAction.getProductDetailFailure(result));
    } else {
      dispatch(productAction.getProductDetailSuccess(result));
    }
    dispatch(loaderAction.hideLoader());
  };
};

/**
 * create
 * @param {String} name
 * @param {String} note
 * @param {String} price
 * @param {File} image
 * @return {} dispatch
 */
productAction.create = (name, note, price, image) => {
  return async dispatch => {
    dispatch(loaderAction.showLoader());
    dispatch(productAction.request());
    const result = await productService.createProduct(name, note, price, image);
    // check status response. if 4xx dispatch failure else dispatch success
    if (result.status >= 400) {
      dispatch(productAction.createEditFailure(result));
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_DANGER
        )
      );
      dispatch(loaderAction.hideLoader());
    } else {
      socket.emit("create-edit-delete-product-success", result.data.data[0].id);
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_SUCCESS
        )
      );
      dispatch(productAction.createEditSuccess(result));
    }
    dispatch(loaderAction.hideLoader());
  };
};

/**
 * edit
 * @param {String} name
 * @param {String} note
 * @param {String} price
 * @param {File} image
 * @return {} dispatch
 */
productAction.edit = (productId, name, note, price, image) => {
  return async dispatch => {
    dispatch(loaderAction.showLoader());
    dispatch(productAction.request());
    const result = await productService.editProduct(
      productId,
      name,
      note,
      price,
      image
    );
    // check status response. if 4xx dispatch failure else dispatch success
    if (result.status >= 400) {
      dispatch(productAction.createEditFailure(result));
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_DANGER
        )
      );
      dispatch(loaderAction.hideLoader());
    } else {
      socket.emit("create-edit-delete-product-success", productId);
      commonUtil.getMessageResponse(result.data);
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_SUCCESS
        )
      );
      dispatch(productAction.createEditSuccess(result));
    }
    dispatch(loaderAction.hideLoader());
  };
};

/**
 * delete
 * @param {String} productId
 * @return {} dispatch
 */
productAction.delete = productId => {
  return async dispatch => {
    dispatch(loaderAction.showLoader());
    dispatch(productAction.request());
    const result = await productService.deleteProduct(productId);
    // check status response. if 4xx dispatch failure else dispatch success and call api get all product
    if (result.status >= 400) {
      dispatch(productAction.deleteFailure(result));
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_DANGER
        )
      );
      dispatch(loaderAction.hideLoader());
    } else {
      socket.emit("create-edit-delete-product-success", productId);
      dispatch(
        messageAction.showMessage(
          commonUtil.getMessageResponse(result.data),
          constant.TYPE_SUCCESS
        )
      );
      dispatch(productAction.deleteSuccess(result));
    }
    dispatch(loaderAction.hideLoader());
  };
};
/**
 * add product
 * @param {String} productId
 * @param {boolean} isAddProduct
 * @param {array} listStart
 *
 * @return {} dispatch
 */
productAction.addProduct = (listStart, productId, isAddProduct) => {
  return async dispatch => {
    dispatch(loaderAction.showLoader());
    dispatch(productAction.request());
    if (isAddProduct) {
      dispatch(productAction.addProductSuccess(listStart, productId));
    } else {
      dispatch(productAction.calcelProductSuccess(listStart, productId));
    }
    dispatch(loaderAction.hideLoader());
  };
};
/**
 * get List Product Exist
 * @param {array} listProductsExist
 * @param {array} listProducts
 *
 * @return {} dispatch
 */
productAction.getListProductExist = (listProductsExist, listProducts) => {
  return async dispatch => {
    dispatch(loaderAction.showLoader());
    dispatch(productAction.request());
    dispatch(
      productAction.getListProductExistSuccess(listProductsExist, listProducts)
    );
    dispatch(loaderAction.hideLoader());
  };
};
/**
 * request,add product success
 * @return {Action Creator}
 */
productAction.addProductSuccess = (listStart, productId) => {
  return {
    type: productActionType.PRODUCT_ADD,
    payload: productId,
    listData: listStart
  };
};
/**
 * request, cancel product
 * @return {Action Creator}
 */
productAction.calcelProductSuccess = (listStart, productId) => {
  return {
    type: productActionType.PRODUCT_CANCEL,
    payload: productId,
    listData: listStart
  };
};
/**
 * request, get list products exist success
 * @return {Action Creator}
 */
productAction.getListProductExistSuccess = (
  listProductsExist,
  listProducts
) => {
  return {
    type: productActionType.PRODUCT_LIST_EXIST,
    payload: listProductsExist,
    listProduct: listProducts
  };
};
/**
 * Reset store
 */
productAction.resetStore = () => {
  return dispatch => {
    dispatch(productAction.reset());
  };
};

/**
 * call action reset store
 * @return {Action Creator}
 */
productAction.reset = () => {
  return {
    type: productActionType.PRODUCT_RESET
  };
};

/**
 * request, before action excute add/edit/delete, call action request
 * @return {Action Creator}
 */
productAction.request = () => {
  return {
    type: productActionType.PRODUCT_REQUEST
  };
};

/**
 * success, when fetch success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
productAction.fetchSuccess = result => {
  return {
    type: productActionType.PRODUCT_FETCH_SUCCESS,
    payload: result
  };
};

/**
 * failure, when fetch failure, call action failure
 * @param {Object} error
 * @return {Action Creator}
 */
productAction.fetchFailure = error => {
  return {
    type: productActionType.PRODUCT_FETCH_FAILURE,
    payload: error
  };
};

/**
 * success, when get detail success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
productAction.getProductDetailSuccess = result => {
  return {
    type: productActionType.PRODUCT_GET_DETAIL_SUCCESS,
    payload: result
  };
};

/**
 * failure, when get detail failure, call action failure
 * @param {Object} error
 * @return {Action Creator}
 */
productAction.getProductDetailFailure = error => {
  return {
    type: productActionType.PRODUCT_GET_DETAIL_FAILURE,
    payload: error
  };
};

/**
 * success, when create/edit success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
productAction.createEditSuccess = result => {
  return {
    type: productActionType.PRODUCT_CREATE_EDIT_SUCCESS,
    payload: result
  };
};

/**
 * failure, when create/edit failure, call action failure
 * @param {Object} error
 * @return {Action Creator}
 */
productAction.createEditFailure = error => {
  return {
    type: productActionType.PRODUCT_CREATE_EDIT_FAILURE,
    payload: error
  };
};

/**
 * success, when delete success, call action success
 * @param {Object} result
 * @return {Action Creator}
 */
productAction.deleteSuccess = result => {
  return {
    type: productActionType.PRODUCT_DELETE_SUCCESS,
    payload: result
  };
};

/**
 * failure, when delete failure, call action failure
 * @param {Object} error
 * @return {Action Creator}
 */
productAction.deleteFailure = error => {
  return {
    type: productActionType.PRODUCT_DELETE_FAILURE,
    payload: error
  };
};

export default productAction;
