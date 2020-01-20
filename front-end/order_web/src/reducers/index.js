import {
    combineReducers
} from 'redux';
import userReducer from './user.reducer';
import menuReducer from './menu.reducer';
import productReducer from './product.reducer';
import orderReducer from './order.reducer';
import loaderReducer from './loader.reducer';
import messageReducer from './message.reducer';

// root reducer
const appReducer = combineReducers({
    userReducer,
    productReducer,
    menuReducer,
    orderReducer,
    loaderReducer,
    messageReducer
});

export default appReducer;