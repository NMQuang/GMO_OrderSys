import React, { Component } from "react";
import MenuDetailComponent from "./MenuDetailComponent";
import { Link, Redirect } from "react-router-dom";
import { Button, ButtonGroup, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import menuAction from "../../actions/menu.action";
import orderAction from "../../actions/order.action";
import commonUtil from "../../utils/commonUtil";
import ProductItemActionCompoment from "../Product/ProductItemActionCompoment";
import ModalComponent from "../Common/ModalComponent";
import socket from "../../configs/socket";
/**
 * Menu List Component
 */
class MenuItemsComponent extends Component {
  /**
   * Constructor
   * @param {} props
   */
  constructor(props) {
    super(props);
    this.state = {
      modalShowDetail: false,
      orverTime: true,
      isEdit: false,
      modalShowError: false,
      message: ""
    };
  }
  /**
   * handle event when click to one of list menu
   * @param {} e
   */
  showDetail = e => {
    this.props.getMenuDetailAction(
      this.props.menuId,
      this.props.userStore.data.id
    );
    this.setState({
      modalShowDetail: true
    });
  };

  /**
   * Component did mount
   */
  componentDidMount() {
    const { userStore } = this.props;
    socket.on("update-order-in-menu", menuId => {
      this.props.getMenuDetailAction(menuId, userStore.data.id);
    });
  }

  /**
   * handle event when click to close
   * @param {} e
   */
  closeModal = e => {
    this.setState({ modalShowDetail: false, modalShowError: false });
  };
  editMenu = () => {
    const now = new Date().getTime();
    const { validFrom, validTo, menuId } = this.props;
    const timeValidTo = commonUtil.addHourToDateString(validTo, -7).getTime();
    /**
     * check if time now > time valid to then no editing allowed
     */
    if (now > timeValidTo) {
      this.setState({
        orverTime: true,
        modalShowError: true,
        message: "Đã quá thời gian chỉnh sửa menu."
      });
    } else {
      this.setState({ orverTime: false, modalShowError: false });
    }
    this.setState({ isEdit: true });
  };
  summaryMenu = () => {
    const now = new Date().getTime();
    const { validFrom } = this.props;
    const timeValidFrom = commonUtil
      .addHourToDateString(validFrom, -7)
      .getTime();
    /**
     * check if time now > time valid from then no summary allowed
     */
    if (now < timeValidFrom) {
      this.setState({
        orverTime: true,
        modalShowError: true,
        message: "Chưa tồn tại bảng tính cho thực đơn này."
      });
    } else {
      this.setState({ orverTime: false, modalShowError: false });
    }
    this.setState({ isEdit: false });
  };

  /**
   * On user order
   * @param {number} productId the product id
   */
  onOrder = productId => {
    const { menuId, userStore } = this.props;
    const { menuStore } = this.props;
    // check order in menu detai. if null call api order else call api update order
    if (menuStore.detailMenuById[0].order) {
      this.props.editOrderAction(
        menuStore.detailMenuById[0].order.order_id,
        productId,
        menuId,
        userStore.data.id
      );
    } else {
      this.props.orderAction(menuId, userStore.data.id, productId);
    }
  };

  /**
   * render
   */
  render() {
    const {
      modalShowDetail,
      orverTime,
      isEdit,
      modalShowError,
      message
    } = this.state;
    const {
      validFrom,
      validTo,
      menuId,
      productQuantity,
      menuStore
    } = this.props;
    let listDetailMenuRender = [];
    /**
     * If action is edit and on time edit then Redirect to page edit
     */
    if (!orverTime && isEdit) {
      return (
        <Redirect
          className=""
          to={{
            pathname: "/menu/edit/" + menuId,
            state: { validTo: { validTo }, validFrom: { validFrom } }
          }}
        />
      );
      /**
       * If action is summary and on time edit then Redirect to page summary
       */
    } else if (!orverTime && !isEdit) {
      return <Redirect className="" to={"summary/" + menuId} />;
    }
    // check menuDetailDate in menuStore not null to render list product in menu detail
    if (
      menuStore.detailMenuById &&
      menuStore.detailMenuById[0] &&
      menuStore.detailMenuById[0].products.length !== 0
    ) {
      menuStore.detailMenuById[0].products;
      for (let i = 0; i < menuStore.detailMenuById[0].products.length; i++) {
        let product = menuStore.detailMenuById[0].products[i];
        // check product user order in menu. If user ordered render tag done for product
        if (
          menuStore.detailMenuById[0].order &&
          menuStore.detailMenuById[0].order.product.id === product.id
        ) {
          listDetailMenuRender.push(
            <ProductItemActionCompoment
              key={i}
              products={product}
              showDetail={true}
            />
          );
        } else {
          listDetailMenuRender.push(
            <ProductItemActionCompoment
              key={i}
              products={product}
              showDetail={true}
            />
          );
        }
      }
    }

    return (
      <tr>
        {modalShowError && (
          <ModalComponent
            size="lg"
            title={"Bạn không thể thực hiện chức năng này"}
            body={message}
            action={false}
            show={modalShowError}
            onHide={this.closeModal}
          />
        )}
        <td className="vertical-align">{menuId}</td>
        <td className="vertical-align">
          <label>{commonUtil.parseDateTime(validFrom)}</label>
        </td>
        <td className="vertical-align">
          <label>{commonUtil.parseDateTime(validTo)}</label>
        </td>
        <td className="vertical-align">
          <p className="text-cursor" onClick={this.showDetail}>
            {productQuantity}
          </p>
        </td>
        <td className="text-align pointer-event">
          <ButtonGroup className="button-group">
            <Button
              className=" button-action button-action-edit"
              onClick={this.editMenu}
            >
              <i className="fa fa-fw fa-edit fa-color" />
            </Button>

            <Link
              className=""
              to={{
                pathname: "/menu/clone/" + menuId,
                state: { validTo: { validTo }, validFrom: { validFrom } }
              }}
            >
              <Button className=" button-action button-action-clone">
                <i className="fa fa-fw fa-clone fa-color" />
              </Button>
            </Link>
            <Button
              className=" button-action button-action-calculator"
              onClick={this.summaryMenu}
            >
              <i className="fa fa-fw fa-calculator fa-color" />
            </Button>
          </ButtonGroup>
        </td>
        <Modal
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalShowDetail}
          onHide={this.closeModal}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Danh sách sản phẩm trong thực đơn
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row pt-5">
              <div className="col-md-12 col-lg-12">{listDetailMenuRender}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      </tr>
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
    menuStore: state.menuReducer,
    userStore: state.userReducer,
    orderStore: state.orderReducer
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
)(MenuItemsComponent);
