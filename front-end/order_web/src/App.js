import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./configs/routes";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import PrivateRoute from "./components/Routes/PrivateRoute";
import { connect } from "react-redux";
import AdminRoute from "./components/Routes/AdminRoute";
import LoadingComponent from "./components/Common/LoadingComponent";
import AlertComponent from "./components/Common/AlertComponent";

// define component App
class App extends Component {
  /**
   * init route
   * @param {List} list routes
   * @return {Switch}
   */
  initRoutes = routes => {
    var result = null;
    // check list routes is exist or not
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        console.log(route);
        // Check route is private or public.
        // If private create PrivateRoute else create Route
        if (route.loggedIn) {
          if (route.isAdmin) {
            return (
              <AdminRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
                role={this.props.user.data.role}
              />
            );
          }
          return (
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
              loggedIn={this.props.user.isLogin}
            />
          );
        }
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return (
      <div>
        <Switch>{result}</Switch>
      </div>
    );
  };
  /**
   * On close modal
   */
  onCloseModal = () => {};
  /**
   * render component to web
   * @param {}
   * @return {}
   */
  render() {
    const { loaderStore, messageStore } = this.props;
    let alertModal = {};
    if (messageStore.message === null && messageStore.type === null) {
      alertModal = <AlertComponent show={false} onHide={this.onCloseModal} />;
    } else if (
      messageStore.message &&
      typeof messageStore.message === "object"
    ) {
      alertModal = (
        <AlertComponent
          type={messageStore.type}
          heading={messageStore.type}
          msg={messageStore.message.body}
          onHide={this.onCloseModal}
          show={true}
        />
      );
    } else {
      alertModal = (
        <AlertComponent
          type={messageStore.type}
          heading={messageStore.type}
          msg={messageStore.message}
          onHide={this.onCloseModal}
          show={true}
        />
      );
    }
    return (
      <React.Fragment>
        <Header />
        {alertModal}
        {this.initRoutes(routes)}
        <Footer />
        {loaderStore.isLoading && <LoadingComponent />}
      </React.Fragment>
    );
  }
}

/**
 * map state to props of component
 * @param {Object} state
 * @return {Object} props
 */
const mapStateToProps = state => {
  return {
    user: state.userReducer,
    loaderStore: state.loaderReducer,
    messageStore: state.messageReducer
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
