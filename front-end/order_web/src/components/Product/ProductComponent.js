import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import ProductDetailComponent from "./ProductDetailComponent";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import productAction from "../../actions/product.action";
import socket from "../../configs/socket";
import commonUtil from "../../utils/commonUtil";
import message from "../../constants/message";

/**
 * Product Component
 */
class ProductComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    socket.on("update-list-product", () => {
      this.props.fetch();
    });
    this.props.fetch();
  }

  /**
   * Component did update
   */
  componentDidUpdate() {
    const { startLoop, endLoop } = this.props;
    if (this.props.product.listProduct) {
      this.props.done(this.props.product.listProduct.length);
    }
    if (startLoop === endLoop) {
      this.props.updateCurrentPage();
    }
  }

  /**
   * Fetch data when reload page
   */
  reloadPage = () => {
    this.props.fetch();
  };

  /**
   * render
   */
  render() {
    const { startLoop, endLoop, product } = this.props;
    let listProductRender = [];
    if (product.listProduct && product.listProduct.length > 0) {
      for (let i = startLoop; i < endLoop; i++) {
        if (i < 0) continue;
        const ele = product.listProduct[i];
        if (typeof ele === "undefined") {
          break;
        }
        listProductRender.push(
          <ProductDetailComponent
            key={i}
            id={ele.id}
            name={ele.name}
            image={ele.image}
            note={ele.note}
            price={ele.price}
          />
        );
      }
    }
    return (
      <Card.Body>
        {product.listProduct && product.listProduct.length > 0 ? (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>
                  <p className="p">ID</p>
                  <i className="fa fa-id-card i-fa-2x" aria-hidden="true" />
                </th>
                <th>
                  <p className="p">Tên sản phẩm</p>
                  <i
                    className="fas fa-signature i-fa-2x"
                    aria-hidden="true"
                  ></i>
                </th>
                <th>
                  <p className="p">Hình ảnh</p>
                  <span>
                    <i className="fas fa-images i-fa-2x" aria-hidden="true" />
                  </span>
                </th>
                <th>
                  <p className="p">Ghi chú</p>
                  <span>
                    <i
                      className="far fa-sticky-note i-fa-2x"
                      aria-hidden="true"
                    />
                  </span>
                </th>
                <th>
                  <p className="p">Giá</p>
                  <span>
                    <i
                      className="fas fa-money-bill i-fa-2x"
                      aria-hidden="true"
                    />
                  </span>
                </th>
                <th className="action-menu">
                  <p className="p">Chức năng</p>
                </th>
              </tr>
            </thead>
            <tbody>{listProductRender}</tbody>
          </Table>
        ) : (
          <div className="text-center">
            <p>{commonUtil.parseMessage(message.MSG_INFO_002, ["product"])}</p>
          </div>
        )}
      </Card.Body>
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
    product: state.productReducer
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
    fetch: () => {
      dispatch(productAction.fetch());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductComponent)
);
