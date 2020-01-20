import menuActionType from "../actionTypes/menu.action.type";
let initialState = {
  listMenu: null,
  listMenuError: null,

  detailMenuById: null,
  detailMenuByIdError: null,

  menuSummaryData: null,
  menuSummaryError: null,

  createEditCloneData: null,
  createEditCloneError: null
};
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * Menu Request
     *
     */
    case menuActionType.MENU_REQUEST: {
      return {
        ...state
      };
    }
    // get menu summary success
    case menuActionType.MENU_GET_SUMMARY_SUCCESS: {
      state.menuSummaryData = action.payload.data.data;
      return {
        ...state,
        menuSummaryError: null
      };
    }
    // get menu summary failure
    case menuActionType.MENU_GET_SUMMARY_FAILURE: {
      state.menuSummaryError = action.payload.data;
      return {
        ...state,
        menuSummaryData: null
      };
    }
    /**
     * Menu List Success
     *
     */
    case menuActionType.MENU_LIST_SUCCESS: {
      state.listMenu = action.payload.data.data;
      return {
        ...state,
        listMenuError: null,
        detailMenuById: null,
        detailMenuByIdError: null,
        createEditCloneData: null,
        createEditCloneError: null,
        infoMenu: null
      };
    }
    /**
     * Menu List Fail
     *
     */
    case menuActionType.MENU_LIST_FAILURE: {
      state.listMenuError = action.payload.error;
      return {
        ...state,
        listMenu: null,
        detailMenuById: null,
        detailMenuByIdError: null,
        createEditCloneData: null,
        createEditCloneError: null,
        infoMenu: null
      };
    }

    /**
     * Menu Get Detail Success
     *
     */
    case menuActionType.MENU_GET_DETAIL_SUCCESS: {
      state.detailMenuById = action.payload.data.data;
      return {
        ...state,
        detailMenuByIdError: null,
        createEditCloneData: null,
        createEditCloneError: null
      };
    }
    /**
     * Menu Get Detail Fail
     *
     */
    case menuActionType.MENU_GET_DETAIL_FAILURE: {
      state.detailMenuByIdError = action.payload.data;
      return {
        ...state,
        detailMenuById: null,
        createEditCloneData: null,
        createEditCloneError: null,
        infoMenu: null
      };
    }

    /**
     * Menu Success
     *
     */
    case menuActionType.MENU_CREATE_SUCCESS: {
      state.createEditCloneData = action.payload.data;
      return {
        ...state,
        createEditCloneError: null,
        listMenu: null,
        listMenuError: null,
        detailMenuById: null,
        detailMenuByIdError: null,
        infoMenu: null
      };
    }

    /**
     * Menu Create Fail
     *
     */
    case menuActionType.MENU_CREATE_FAILURE: {
      state.createEditCloneError = action.payload.data;
      return {
        ...state,
        createEditCloneData: null,
        listMenu: null,
        listMenuError: null,
        detailMenuById: null,
        detailMenuByIdError: null,
        infoMenu: null
      };
    }

    /**
     * Menu Edit Success
     *
     */
    case menuActionType.MENU_EDIT_SUCCESS: {
      state.createEditCloneData = action.payload.data;
      return {
        ...state,
        createEditCloneError: null,
        listMenu: null,
        listMenuError: null,
        detailMenuById: null,
        detailMenuByIdError: null,
        infoMenu: null
      };
    }
    /**
     * Menu Edit Fail
     *
     */
    case menuActionType.MENU_EDIT_FAILURE: {
      state.createEditCloneError = action.payload.data;
      return {
        ...state,
        createEditCloneData: null,
        listMenu: null,
        listMenuError: null,
        detailMenuById: null,
        detailMenuByIdError: null,
        infoMenu: null
      };
    }

    /**
     * Menu Clone Success
     *
     */
    case menuActionType.MENU_CLONE_SUCCESS: {
      state.createEditCloneData = action.payload.data;
      return {
        ...state,
        createEditCloneError: null,
        listMenu: null,
        listMenuError: null,
        detailMenuById: null,
        detailMenuByIdError: null,
        infoMenu: null
      };
    }
    /**
     * Menu Clone Fail
     *
     */
    case menuActionType.MENU_CLONE_FAILURE: {
      state.createEditCloneError = action.payload.data;
      return {
        ...state,
        createEditCloneData: null,
        listMenu: null,
        listMenuError: null,
        detailMenuById: null,
        detailMenuByIdError: null,
        infoMenu: null
      };
    }
    default:
      return state;
  }
};

export default menuReducer;
