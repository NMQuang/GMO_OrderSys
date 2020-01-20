// define type action of product
const productActionType = {
  // product request
  PRODUCT_REQUEST: "PRODUCT_REQUEST",

  // reset store
  PRODUCT_RESET: "PRODUCT_RESET",

  // fetch data
  PRODUCT_FETCH_SUCCESS: "PRODUCT_FETCH_SUCCESS",
  PRODUCT_FETCH_FAILURE: "PRODUCT_FETCH_FAILURE",

  // get detail
  PRODUCT_GET_DETAIL_SUCCESS: "PRODUCT_GET_DETAIL_SUCCESS",
  PRODUCT_GET_DETAIL_FAILURE: "PRODUCT_GET_DETAIL_FAILURE",

  // create
  PRODUCT_CREATE_EDIT_SUCCESS: "PRODUCT_CREATE_EDIT_SUCCESS",
  PRODUCT_CREATE_EDIT_FAILURE: "PRODUCT_CREATE_EDIT_FAILURE",

  // delete
  PRODUCT_DELETE_SUCCESS: "PRODUCT_DELETE_SUCCESS",
  PRODUCT_DELETE_FAILURE: "PRODUCT_DELETE_FAILURE",

  //addProduct for Menu
  PRODUCT_ADD: "PRODUCT_ADD",
  PRODUCT_CANCEL: "PRODUCT_CANCEL",
  PRODUCT_LIST_EXIST: "PRODUCT_LIST_EXIST"
};

export default productActionType;