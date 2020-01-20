import React, { Component, useRef } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Button } from "react-bootstrap";
import ProductItemComponent from "../../components/Product/ProductItemComponent";
import message from "../../constants/message";
import menuAction from "../../actions/menu.action";
import orderAction from "../../actions/order.action";
import socket from "../../configs/socket";
import commonUtil from "../../utils/commonUtil";
import MenuInfoComponent from "../../components/Menu/MenuInfoComponent";
import MenuPayMentComponent from "../../components/Menu/MenuPayMentComponent";

/**
 * Menu Detail Page
 */
class MenuDetailPage extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      addPayment: false,
      orderInfo:
        this.props.menuStore.detailMenuById !== null &&
        this.props.menuStore.detailMenuById[0].order !== null
          ? this.props.menuStore.detailMenuById[0].order.product
          : {}
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    const { menuId, userStore, menuStore } = this.props;
    const menuIdUrl = +menuId.match.params.menuId;

    // call api get menu detail
    this.props.getMenuDetailAction(menuIdUrl, userStore.data.id);

    socket.on("update-order-in-menu", id => {
      if (+id === menuIdUrl) {
        this.props.getMenuDetailAction(id, userStore.data.id);
      }
    });

    socket.on("update-menu", listMenu => {
      for (let i = 0; i < listMenu.length; i++) {
        if (+listMenu[i].id === menuIdUrl) {
          this.props.getMenuDetailAction(menuIdUrl, userStore.data.id);
          return false;
        }
      }
    });
    this.setState({
      orderInfo:
        menuStore.detailMenuById !== null &&
        menuStore.detailMenuById[0].order !== null
          ? menuStore.detailMenuById[0].order.product
          : {}
    });
  }

  /**
   * add product into paymentComponent
   */
  addPayment = product => {
    this.setState({ orderInfo: product });
  };

  /**
   * On user order
   * @param {number} productId the product id
   */
  onOrder = productId => {
    const { menuId, userStore, menuStore } = this.props;
    // check order in menu detai. if null call api order else call api update order
    if (menuStore.detailMenuById[0].order) {
      this.props.editOrderAction(
        menuStore.detailMenuById[0].order.order_id,
        productId,
        menuId.match.params.menuId,
        userStore.data.id
      );
    } else {
      this.props.orderAction(
        menuId.match.params.menuId,
        userStore.data.id,
        productId
      );
    }
  };

  /**
   * render
   */
  render() {
    const { menuStore, userStore } = this.props;
    let listProductRender = [];
    let menuInfo = [];
    const { orderInfo } = this.state;
    if (
      menuStore.detailMenuByIdError &&
      menuStore.detailMenuByIdError.result_code === message.MSG_ERROR_009
    ) {
      return <Redirect to="/not-found" />;
    }

    // check menuDetailDate in menuStore not null to render list product in menu detail
    if (
      menuStore.detailMenuById &&
      menuStore.detailMenuById[0] &&
      menuStore.detailMenuById[0].products.length !== 0
    ) {
      menuInfo.push(
        <MenuInfoComponent
          key={1}
          menuToday={menuStore.detailMenuById[0].menu}
        />
      );
      for (let i = 0; i < menuStore.detailMenuById[0].products.length; i++) {
        let product = menuStore.detailMenuById[0].products[i];
        // check product user order in menu. If user ordered render tag done for product
        if (
          menuStore.detailMenuById[0].order &&
          menuStore.detailMenuById[0].order.product.id === product.id
        ) {
          listProductRender.push(
            <ProductItemComponent
              key={i}
              product={product}
              isOrder={true}
              onOrder={this.onOrder}
              addPayment={this.addPayment}
              isAdd={false}
              isAddAction={false}
              showList={true}
            />
          );
        } else {
          listProductRender.push(
            <ProductItemComponent
              key={i}
              product={product}
              onOrder={this.onOrder}
              addPayment={this.addPayment}
              isAdd={false}
              isAddAction={false}
              showList={true}
            />
          );
        }
      }
    }

    return (
      <div>
        {menuStore.detailMenuById &&
        menuStore.detailMenuById[0] &&
        menuStore.detailMenuById[0].products.length !== 0 ? (
          <div className="main-order">
            <Container className="">
              <div className="row pt-5">{menuInfo} </div>
            </Container>
            <div className="container-order">
              <Container className="info-product-order">
                <div className="col-md-8 col-lg-8 list-product">
                  {listProductRender}
                </div>
                <MenuPayMentComponent
                  userInfo={userStore.data}
                  onOrder={this.onOrder}
                  orderInfo={orderInfo}
                  menuStore={menuStore}
                />
              </Container>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>{commonUtil.parseMessage(message.MSG_INFO_002, ["product"])}</p>
          </div>
        )}
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
    },
    orderAction: (menuId, userId, productId) => {
      dispatch(orderAction.order(menuId, userId, productId));
    },
    editOrderAction: (orderId, productId, menuId, userId) => {
      dispatch(orderAction.edit(orderId, productId, menuId, userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuDetailPage);
