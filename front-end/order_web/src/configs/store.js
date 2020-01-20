import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import appReducer from "../reducers/index";

// define composeEnhancer
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// define a store for app
const store = createStore(appReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;