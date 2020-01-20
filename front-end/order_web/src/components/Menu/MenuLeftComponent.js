import { Button, Form, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { Component } from "react";
import constants from "../../constants/message";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuTimeOrderComponent from "./MenuTimeOrderComponent";
import menuAction from "../../actions/menu.action";
import commonUtil from "../../utils/commonUtil";

/**
 * Menu Left Component
 */
class MenuLeftComponent extends Component {
  /**
   * constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      active: true, // menu active today
      deadline: true // time order
    };
  }
  /**
   * Component did mount
   */
  componentDidMount() {
    const { userStore, menuToday, menuStore } = this.props;
    if (menuToday.id) {
      this.props.getMenuDetailAction(menuToday.id, userStore.data.id);
      // get time valid to
      const timeValidTo = commonUtil
        .addHourToDateString(menuToday.valid_to, -7)
        .getTime();
      // get time valid from
      const timeValidFrom = commonUtil
        .addHourToDateString(menuToday.valid_from, -7)
        .getTime();
      // Get today's date and time
      const now = new Date().getTime();
      // Find the distance between now and the count down date
      const distance = timeValidTo - now;
      // If the count down is over, write some text
      if (distance < 0 || timeValidFrom > now) {
        this.setState({
          deadline: false
        });
      } else {
        this.setState({
          deadline: true
        });
      }
    } else {
      this.setState({
        active: false
      });
    }
  }

  /**
   * render
   */
  render() {
    const { menuStore, menuToday } = this.props;
    const { active, deadline } = this.state;
    let products = [];
    /**
     * Check if exist menu then show time and count product order.
     */
    if (menuStore.detailMenuById && active) {
      /**
       * Loop show product order by user
       */
      for (let i = 0; i < menuStore.detailMenuById[0].products.length; i++) {
        products.push(
          <Link key={i} to={"menu/detail/" + menuToday.id}>
            <OverlayTrigger
              key={i}
              overlay={
                <Tooltip id="tooltip-top">
                  <strong>
                    {menuStore.detailMenuById[0].products[i].count
                      ? menuStore.detailMenuById[0].products[i].count + " "
                      : 0 + " "}
                  </strong>
                  người đã order.
                </Tooltip>
              }
            >
              <Button variant="outline-secondary" className="order-button">
                {menuStore.detailMenuById[0].products[i].name}
              </Button>
            </OverlayTrigger>
          </Link>
        );
      }
    }
    return (
      <div className="page-left col-lg-4 col-xs-6 col-sm-12">
        {
          <MenuTimeOrderComponent
            menuToday={menuToday}
            active={active}
            deadline={deadline}
          />
        }
        {active && (
          <React.Fragment>
            <div className="letf-order">
              <Form.Label className="text-left-page">
                Mọi người đã đặt hàng:
              </Form.Label>
              <br></br>
              <div className="items-order">{products}</div>
            </div>
          </React.Fragment>
        )}

        <div className="app-order">
          <Form.Label className="text-left-page">
            Đặt hàng bằng ứng dụng:
          </Form.Label>
          <Nav className="text-center menu-app-order">
            <Nav.Item className=" app-ios">
              <Nav.Link href="#features">
                <Button variant="outline-secondary" className="button-app">
                  <span className="apps app-ios app-color">
                    <i className="fab fa-apple"></i>IOS
                  </span>
                </Button>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#features">
                <Button variant="outline-secondary" className="button-app">
                  <span className="apps app-android  app-color">
                    <i className="fab fa-android"></i>Android
                  </span>
                </Button>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
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
    getMenuDetailAction: (menuId, userId) => {
      dispatch(menuAction.getDetailMenuByMenuId(menuId, userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuLeftComponent);
