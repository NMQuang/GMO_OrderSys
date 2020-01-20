import React, { Component } from "react";
import { Card, Badge, Container, Button } from "react-bootstrap";
import ModalComponent from "../Common/ModalComponent";
import message from "../../constants/message";
import constant from "../../constants/constant";
/**
 * Menu User Component
 */
class MenuPayMentComponent extends Component {
  /**
   * Contructor
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      initLoad: false,
      data:
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
    const { menuStore } = this.props;
    this.setState({
      data:
        menuStore.detailMenuById !== null &&
        menuStore.detailMenuById[0].order !== null
          ? menuStore.detailMenuById[0].order.product
          : this.state.data
    });
  }

  /**
   * componentWillReceiveProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.orderInfo.id) {
      this.setState({
        data: nextProps.orderInfo
      });
    }
    this.setState({
      initLoad: true
    });
  }

  /**
   * shouldComponentUpdate(nextProps, nextState)
   */
  shouldComponentUpdate(nextProps, nextState) {
    // if false: no load init component
    if (this.state.initLoad === false) {
      return false;
    }
    return true;
  }
  /**
   * onPayment
   */
  onPayment = e => {
    this.setState({ modalShow: true });
  };
  /**
   * On close modal
   */
  onCloseModal = () => {
    this.setState({ modalShow: false });
  };
  /**
   * On order product
   */
  onOrder = () => {
    // const { orderInfo } = this.props;
    const { data } = this.state;
    this.props.onOrder(data.id);
    this.setState({ modalShow: false });
  };

  /**
   * render
   */
  render() {
    const { userInfo, orderInfo } = this.props;
    const { modalShow, data } = this.state;
    return (
      <div className={"col-md-4 col-lg-4 info-order "}>
        <label className="fix-padding font-weight">Đơn hàng: </label>
        <div className=" user-oder">
          <span className="fix-padding">
            <i className="fas fa-fw fa-user "></i>
          </span>
          {userInfo.name}
          <label className="fix-padding product-order-price">
            {data !== null && Object.keys(data).length !== 0 ? "1 " : "0 "}
            món
          </label>
        </div>
        {Object.keys(data).length !== 0 && (
          <div className=" clear-both product-name-order">
            <label className=" fix-padding">
              {data.name !== "undefined" ? data.name : "Bạn chưa chọn món"}
            </label>
            <label className=" fix-padding product-order-price">
              {data.price !== "undefined" ? data.price + " đ" : ""}
            </label>
          </div>
        )}

        <div className="count-price-order">
          <label className=" fix-padding count">Tổng cộng</label>
          <label className=" fix-padding product-order-price">
            {Object.keys(data).length !== 0 && data.price !== "undefined"
              ? data.price + " đ"
              : "0 đ"}
          </label>
        </div>

        <div className="btn-payment">
          <Button variant="danger" onClick={this.onPayment}>
            Thanh toán
          </Button>
        </div>
        <ModalComponent
          size={constant.SIZE_MODAL_SM}
          title="Order confirm"
          body={message.MSG_INFO_001}
          action="Order"
          show={modalShow}
          onHide={this.onCloseModal}
          onSave={this.onOrder}
        />
      </div>
    );
  }
}

export default MenuPayMentComponent;
