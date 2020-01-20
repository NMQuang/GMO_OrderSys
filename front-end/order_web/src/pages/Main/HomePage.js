import React, { Component } from "react";
import { withRouter } from "react-router";
import { Container, Alert, Row } from "react-bootstrap";
import { connect } from "react-redux";
import menuAction from "../../actions/menu.action";
import commonUtil from "../../utils/commonUtil";
import message from "../../constants/message";
import socket from "../../configs/socket";
import MenuLeftComponent from "../../components/Menu/MenuLeftComponent";
import ModalComponent from "../../components/Common/ModalComponent";
import MenuSlideComponent from "../../components/Menu/MenuSlideComponent";
import MenuUserComponent from "../../components/Menu/MenuUserComponent";
import MenuAdminComponent from "../../components/Menu/MenuAdminComponent";

/**
 * Home Page
 */
class HomePage extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      msgError: this.props.location.state
        ? this.props.location.state.error
        : null,
      prevLocation: this.props.location.state
        ? this.props.location.state.prevLocation
        : null,
      modalShow: true,
      isAdmin: false
    };
  }
  /**
   * On close modal
   */
  onCloseModal = () => {
    this.setState({ modalShow: false });
  };

  /**
   * On show modal
   */
  onShowModal = () => {
    this.setState({ modalShow: true });
  };
  /**
   * Component did mount
   */
  componentDidMount() {
    this.props.getListMenuAction();
    socket.on("update-count-product", menuId => {
      this.props.getListMenuAction();
    });
    this.props.history.replace();
    const { userStore } = this.props;
    if (userStore.data.role === "Admin") {
      this.setState({ isAdmin: true });
    }
  }

  /**
   * render
   */
  render() {
    const { menuStore } = this.props;
    const { msgError, prevLocation, modalShow, isAdmin } = this.state;
    let menuToday = {};
    if (menuStore.listMenu) {
      // get menu today
      menuToday = commonUtil.checkMenuToday(menuStore.listMenu);
    }

    return (
      <Container className="pos-relative container-home-page">
        {msgError && prevLocation && (
          <ModalComponent
            title="Title"
            body={message.MSG_INFO_004}
            show={modalShow}
            size="lg"
            onHide={this.onCloseModal}
          />
        )}
        {menuStore.listMenu ? (
          <Row className="full-height container">
            <MenuLeftComponent menuToday={menuToday} />

            {isAdmin && (
              <div className="container-100 page-right col-lg-8 col-xs-6 col-sm-12">
                <MenuAdminComponent listMenu={menuStore.listMenu} />
              </div>
            )}
            {!isAdmin && (
              <div className="container-100 page-right col-lg-8 col-xs-6 col-sm-12 page-right-user">
                <MenuSlideComponent />
                <MenuUserComponent menuToday={menuToday} />
              </div>
            )}
          </Row>
        ) : (
          <div className="text-center">
            <p>{commonUtil.parseMessage(message.MSG_INFO_002, ["menu"])}</p>
          </div>
        )}
      </Container>
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
    userStore: state.userReducer,
    menuStore: state.menuReducer
  };
};

/**
 * map dispatch to props
 * @param {ActionCreator} dispatch
 * @param {String} props
 * @return {ActionCreator}
 */
const mapDispatchToProps = (dispatch, props) => {
  return {
    getListMenuAction: () => {
      dispatch(menuAction.fetch());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
