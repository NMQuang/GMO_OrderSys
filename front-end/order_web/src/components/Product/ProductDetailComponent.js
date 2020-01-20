import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import ModalComponent from "../Common/ModalComponent";
import { connect } from "react-redux";
import productAction from "../../actions/product.action";
import constant from "../../constants/constant";
import message from "../../constants/message";

/**
 * Product Detail Component
 */
class ProductDetailComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isOrder: this.props.isOrder ? true : false,
      modalShow: false
    };
  }

  /**
   * On delete product
   */
  onDeleteProduct = () => {
    const { id } = this.props;
    this.props.delete(id);
    this.setState({ modalShow: false });
  };

  /**
   * Open modal confirm
   */
  onConfirm = () => {
    this.setState({ modalShow: true });
  };

  /**
   * On close modal
   */
  onCloseModal = () => {
    this.setState({ modalShow: false });
  };

  /**
   * Render
   */
  render() {
    const { id, image, name, note, price } = this.props;
    const { modalShow } = this.state;
    return (
      <tr>
        <td className="vertical-align">{id}</td>
        <td className="vertical-align">
          <label>{name}</label>
        </td>
        <td className="vertical-align">
          <Image src={image} rounded fluid />
        </td>
        <td className="vertical-align">
          <label>{note}</label>
        </td>
        <td className="vertical-align">
          <label>{price}</label>
        </td>
        <td className="text-align pointer-event table-layout">
          <Link className="" to={"/product/edit/" + id}>
            <Button className="button-action button-action-edit">
              <i className="fa fa-fw fa-edit fa-color" />
            </Button>
          </Link>
          <Button
            variant={constant.TYPE_DANGER}
            className="button-action"
            onClick={this.onConfirm}
          >
            <i className="fas fa-fw fa-times" />
          </Button>
        </td>
        <ModalComponent
          size="lg"
          title="Delete confirm"
          body={message.MSG_INFO_005}
          action="Delete"
          show={modalShow}
          onHide={this.onCloseModal}
          onSave={this.onDeleteProduct}
        />
      </tr>
    );
  }
}

/**
 * map dispatch to props
 * @param {ActionCreator} dispatch
 * @param {String} props
 * @return {ActionCreator}
 */
const mapDispatchToProps = (dispatch, props) => {
  return {
    delete: productId => {
      dispatch(productAction.delete(productId));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProductDetailComponent);
