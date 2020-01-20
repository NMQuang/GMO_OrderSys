// define url of server
const apiConfig = {};

// url of api
apiConfig.url = "http://10.1.10.59:3000";

// end point of url
apiConfig.endpoint = {
  // endpoint of user
  USER_LOGIN: "users/login",
  USER_REGISTER: "users/register",
  USER_CHANGE_AVATAR: "users/uploadAvatar",
  USER_CHANGE_PASSWORD: "users/changePassword",

  // endpoint of menu
  MENU_LIST: "menu",
  MENU_DETAIL: "menu/detail",
  MENU_CREATE: "menu/create",
  MENU_EDIT: "menu/edit",
  MENU_CLONE: "menu/clone",
  MENU_SUMMARY: "menu/summary",
  MENU_FIND: "menu/find",

  // endpornt of order
  ORDER_CREATE: "order",
  ORDER_EDIT: "order/update",

  // endpoint of product
  PRODUCT_LIST: "product",
  PRODUCT_DETAIL: "product/detail",
  PRODUCT_CREATE: "product/create",
  PRODUCT_EDIT: "product/edit",
  PRODUCT_DELETE: "product/delete",

  //  endpoint of product
  SUMMARY_LIST: "menu/summary"
  //SUMMARY_DETAIL: "menu/summary",
};

// header of url
apiConfig.header = {
  HEADER_JSON: {
    "Content-Type": "application/json"
  },
  HEADER_TOKEN: {
    "Content-Type": "application/json",
    "x-access-token": localStorage.accessToken
  },
  HEADER_MULTIPART: {
    "Content-Type": "multipart/form-data",
    "x-access-token": localStorage.accessToken
  }
};

// method of url
apiConfig.method = {
  METHOD_POST: "POST",
  METHOD_GET: "GET"
};

export default apiConfig;
