import userActionType from '../actionTypes/user.action.type';

// define init state
let initialState = {
    registerSuccess: false,
    isLogin: localStorage.getItem('user') ? true : false,
    data: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { id: null, name: null, accessToken: null, role: "User", avatar: null },
    avatar: localStorage.getItem('avatar') && localStorage.getItem('avatar') !== 'null' ? localStorage.getItem('avatar') : null,
    error: null
};

/**
 * reducer of user
 * @param {Object} state 
 * @param {Action Creator} action 
 */
const userReducer = (state = initialState, action) => {
    switch (action.type) {

        // login request
        case userActionType.USERS_LOGIN_REQUEST:
            {
                return {
                    ...state
                };
            };
            // login success
        case userActionType.USERS_LOGIN_SUCCESS:
            {
                localStorage.setItem("user", JSON.stringify(action.payload.data.data[0]));
                localStorage.setItem("accessToken", action.payload.data.data[0].accessToken);
                localStorage.setItem("avatar", action.payload.data.data[0].avatar)
                state.data = action.payload.data.data[0];
                state.avatar = action.payload.data.data[0].avatar;
                state.isLogin = true;
                return {
                    ...state,
                    error: null
                };
            };

            // login failure
        case userActionType.USERS_LOGIN_FAILURE:
            {
                state.error = action.payload.data;
                state.isLogin = false;
                return {
                    data: { id: null, name: null, accessToken: null, role: "User", avatar: null },
                    ...state
                };
            };

            // logout request
        case userActionType.USERS_LOGOUT_REQUEST:
            {
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("avatar");
                return {
                    isRegister: false,
                    isLogin: false,
                    avatar: null,
                    data: { id: null, name: null, accessToken: null, role: "User", avatar: null },
                    error: null
                };
            };

            // register success
        case userActionType.USERS_REGISTER_SUCCESS:
            {
                return {
                    registerSuccess: true,
                    data: action.payload.data.data,
                    error: null
                };
            };

            // register failure
        case userActionType.USERS_REGISTER_FAILURE:
            {
                state.error = action.payload.data;
                return {
                    registerSuccess: false,
                    data: null,
                    ...state
                };
            }
            // reload page
        case userActionType.USERS_RELOAD_REQUEST:
            {
                return {
                    ...state,
                    data: { id: null, name: null, accessToken: null, role: "User", avatar: null },
                    error: null
                };
            }
            // change avatar success
        case userActionType.USERS_CHANGE_AVATAR_SUCCESS:
            {
                state.avatar = action.payload.data.data[0].avatar
                localStorage.setItem("avatar", action.payload.data.data[0].avatar);
                return {
                    ...state,
                };
            };
            // change avatar failure
        case userActionType.USERS_CHANGE_AVATAR_FAILURE:
            {
                return {
                    ...state,
                    data: { id: null, name: null, accessToken: null, role: "User", avatar: null },
                    error: null
                };
            }
        default:
            return state;
    }
}

export default userReducer;