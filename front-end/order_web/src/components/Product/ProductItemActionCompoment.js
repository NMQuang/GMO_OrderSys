import React, { Component } from "react";
import { Card, Badge, Image, Button } from "react-bootstrap";
import productAction from "../../actions/product.action";
import constant from "../../constants/constant";
import { connect } from "react-redux";
/**
 * Product Item Action Compoment
 */
class ProductItemActionCompoment extends Component {
  /**
   * Contructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * handle event when  add Product
   * @param {} e
   */
  addProduct = e => {
    const { id } = e.target;
    const { listProductsStart } = this.props;
    if (listProductsStart !== null) {
      this.props.onClick();
      this.props.addProductAction(listProductsStart, id, true);
    }
  };

  /**
   * render
   */
  render() {
    const { products, showDetail } = this.props;
    return (
      <div>
        <Card
          border="secondary"
          className="flex-row flex-wrap mb-2 pos-relative "
          onClick={this.onOrderProduct}
        >
          <div className="card-horizontal img-product-order">
            <Image src={products.image} rounded />
            <Card.Body className="">
              <div className="row">
                {!showDetail && (
                  <i
                    className="fas fa-plus add-product "
                    id={products.id}
                    onClick={this.addProduct}
                  ></i>
                )}
                <div className="col-md-9 col-sm-12">
                  <Card.Title>{products.name}</Card.Title>
                  <Card.Text>Note: {products.note}</Card.Text>
                  <Card.Text>Price: {products.price}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </div>
        </Card>
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
    listProductAddStore: state.productReducer.listProductAdd
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
    addProductAction: (listStart, listProduct, isAddProduct) => {
      dispatch(productAction.addProduct(listStart, listProduct, isAddProduct));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItemActionCompoment);
