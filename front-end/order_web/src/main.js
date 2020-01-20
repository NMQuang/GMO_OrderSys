import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./configs/store";
import "./assets/css/util.css";
import "./assets/css/main.css";
import "./assets/css/user.css";
import "./assets/css/menu.css";
import "./assets/css/summary.css";
import "./assets/css/menuBody.css";
// render component root: App
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,

  // component App will render in a DOM, which has id = app
  document.getElementById("app")
);
