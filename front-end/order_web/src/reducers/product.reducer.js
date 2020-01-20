import productActionType from "../actionTypes/product.action.type";

// define init state
let initialState = {
  listProduct: null,
  fetchError: null,

  productDetailData: null,
  productDetailError: null,

  createEditData: null,
  createEditError: null,

  deleteData: null,
  deleteError: null,

  listProductAdd: [],
  listProductCancel: []
};

/**
 * reducer of product
 * @param {Object} state
 * @param {Action Creator} action
 */
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // product request
    case productActionType.PRODUCT_REQUEST: {
      return {
        ...state
      };
    }
    // product reset
    case productActionType.PRODUCT_RESET: {
      return {
        ...state,
        listProduct: null,
        fetchError: null,
        productDetailData: null,
        productDetailError: null,
        createEditData: null,
        createEditError: null,
        deleteData: null,
        deleteError: null,
        listProductAdd: [],
        listProductCancel: []
      };
    }
    // fetch list product success
    case productActionType.PRODUCT_FETCH_SUCCESS: {
      state.listProduct = action.payload.data.data;
      return {
        ...state,
        fetchError: null,
        createEditData: null,
        createEditError: null,
        deleteError: null
      };
    }
    // fetch list product fail
    case productActionType.PRODUCT_FETCH_FAILURE: {
      state.fetchError = action.payload.data;
      return {
        ...state,
        listProduct: null,
        createEditData: null,
        createEditError: null,
        deleteError: null
      };
    }
    // get product detail success
    case productActionType.PRODUCT_GET_DETAIL_SUCCESS: {
      state.productDetailData = action.payload.data.data;
      return {
        ...state,
        fetchError: null,
        productDetailError: null,
        createEditData: null,
        createEditError: null,
        deleteError: null
      };
    }
    // get product detail fail
    case productActionType.PRODUCT_GET_DETAIL_FAILURE: {
      state.productDetailError = action.payload.data;
      return {
        ...state,
        listProduct: null,
        productDetailData: null,
        createEditData: null,
        createEditError: null,
        deleteError: null
      };
    }
    // create success
    case productActionType.PRODUCT_CREATE_EDIT_SUCCESS: {
      state.createEditData = action.payload.data;
      return {
        ...state,
        createEditError: null
      };
    }
    // create failure
    case productActionType.PRODUCT_CREATE_EDIT_FAILURE: {
      state.createEditError = action.payload.data;
      return {
        ...state,
        createEditData: null
      };
    }
    // delete success
    case productActionType.PRODUCT_DELETE_SUCCESS: {
      state.deleteData = action.payload.data;
      return {
        ...state,
        deleteError: null
      };
    }
    // delete failure
    case productActionType.PRODUCT_DELETE_FAILURE: {
      state.deleteError = action.payload.data;
      return {
        deleteData: null,
        ...state
      };
    }
    // list Product Add success
    case productActionType.PRODUCT_ADD: {
      let idProduct = action.payload;
      let index = "";
      let listProductCan = [];
      //Loop to find value index
      for (let i = 0; i < action.listData.length; i++) {
        // If idProduct == id product in list product then get index idProduct that

        if (action.listData[i].id == idProduct) {
          index = i;
          listProductCan = [...state.listProductCancel, action.listData[i]];
          break;
        }
      }
      return {
        ...state,
        listProductAdd: action.listData.filter((_, i) => i !== index),
        listProductCancel: listProductCan
      };
    }
    // list Product Cancel success
    case productActionType.PRODUCT_CANCEL: {
      let idProduct = action.payload;
      let index = "";
      let listProductAdd = [];
      //Loop to find value index
      for (let i = 0; i < action.listData.length; i++) {
        // If idProduct == id product in list product then get index idProduct that

        if (action.listData[i].id == idProduct) {
          index = i;
          listProductAdd = [...state.listProductAdd, action.listData[i]];
          break;
        }
      }
      return {
        ...state,
        listProductCancel: action.listData.filter((_, i) => i !== index),
        listProductAdd: listProductAdd
      };
    }
    // List product excist
    case productActionType.PRODUCT_LIST_EXIST: {
      let listProductExist = [];
      listProductExist = action.payload;
      let listProductAdd = [];
      listProductAdd = action.listProduct;
      let listProductAddId = [];
      let index = "";
      //loop to get id of each product
      for (let i = 0; i < listProductExist.length; i++) {
        listProductAddId.push(listProductExist[i].id);
      }
      // Loop to find value index
      for (let i = 0; i < listProductAddId.length; i++) {
        // loop list product
        for (let j = 0; j < listProductAdd.length; j++) {
          // if id product exist === id product in list product then get index  list product
          if (listProductAddId[i] === listProductAdd[j].id) {
            index = j;
          }
        }
        listProductAdd = listProductAdd.filter((_, i) => i !== index);
      }
      return {
        ...state,
        listProductCancel: listProductExist,
        listProductAdd: listProductAdd
      };
    }

    default:
      return state;
  }
};

export default productReducer;
