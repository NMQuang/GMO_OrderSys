import React, { Component } from "react";
import { connect } from "react-redux";
import userAction from "../../actions/user.action";
import {
  Container,
  Nav,
  Row,
  Navbar,
  Image,
  OverlayTrigger,
  Tooltip,
  NavDropdown,
  Badge,
  Button
} from "react-bootstrap";
import "../../assets/css/header.css";
import logo from "../../../public/images/logo-01.jpg";
import unknownAvatar from "../../../public/images/unknownAvatar.png";
import menuAction from "../../actions/menu.action";
import socket from "../../configs/socket";
// Header component
class Header extends Component {
  /**
   * constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  redirectToLogin = e => {
    e.preventDefault();
    this.props.logout();
  };

  /**
   * render
   */
  render() {
    const { isLogin, avatar, data } = this.props.userStore;
    const { menuStore } = this.props;
    const orderName =
      menuStore.detailMenuById !== null &&
      menuStore.detailMenuById[0].order !== null
        ? menuStore.detailMenuById[0].order.product.name
        : null;
    return (
      <>
        {isLogin && (
          <Container className="mb-100 container-header" fluid>
            <Navbar bg="light" expand="sm" className="navbar-header">
              <Navbar.Brand
                className="navbar-logo"
                href="/home"
                id="responsive-navbar-nav"
              >
                <Image src={logo} roundedCircle />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="nav-sign mr-auto">
                  <Nav.Link href="/home">
                    <span>
                      <i className="fa fa-fw fa-home " />
                      Trang chủ
                    </span>
                  </Nav.Link>
                  <Nav.Link href="/menu">
                    <span>
                      <i className="fa fa-fw fa-list" />
                      Thực đơn
                    </span>
                  </Nav.Link>
                  <Nav.Link href="/product">
                    <span>
                      <i className="fas fa-book fa-fw" />
                      Sản phẩm
                    </span>
                  </Nav.Link>
                </Nav>

                <NavDropdown
                  title={
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">{orderName}</Tooltip>
                      }
                      placement="left"
                    >
                      <i className="fa fa-fw fa-shopping-cart"></i>
                    </OverlayTrigger>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item disabled>
                    Bạn đã đặt: <br></br>
                    {orderName}
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  className="avatar-user"
                  title={
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">{data.name}</Tooltip>
                      }
                      placement="left"
                    >
                      <Image src={avatar ? avatar : unknownAvatar} />
                    </OverlayTrigger>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item disabled>{data.name}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={"/user/" + data.id}>
                    Chỉnh sửa hồ sơ
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={this.redirectToLogin} href="/">
                    Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        )}
      </>
    );
  }
}

/**
 * map state to props of component
 * @param {Object} state
 */
const mapStateToProps = state => {
  return {
    userStore: state.userReducer,
    menuStore: state.menuReducer,
    orderStore: state.orderReducer
  };
};

/**
 * map dispatch to props of component
 * @param {Action Creator} dispatch
 * @param {Object} props
 */
const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => {
      dispatch(userAction.logout());
    },
    getMenuDetailAction: (menuId, userId) => {
      dispatch(menuAction.getDetailMenuByMenuId(menuId, userId));
    }
  };
};

// export Header component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
