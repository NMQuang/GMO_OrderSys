import React, { Component } from "react";
import { Card, Badge, Image } from "react-bootstrap";
import constant from "../../constants/constant";
/**
 * Product Item Component
 */
class ProductItemComponent extends Component {
  /**
   * Contructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isOrder: this.props.isOrder ? true : false
    };
  }

  /**
   * On order product
   */
  onOrderProduct = () => {
    const { product } = this.props;
    this.props.addPayment(product);
  };

  /**
   * render
   */
  render() {
    const { product, isOrder, isAdd } = this.props;
    return (
      <div>
        <Card
          border="secondary"
          className="flex-row flex-wrap mb-2 pos-relative cs-pt"
          onClick={this.onOrderProduct}
        >
          <div className="card-horizontal img-product-order">
            <Image src={product.image} rounded />
            {isOrder && (
              <Badge
                className="badge-choice pos-absolute"
                variant={constant.TYPE_SUCCESS}
              >
                <i className="material-icons"></i>
              </Badge>
            )}
            {isAdd && (
              <span className="badge-choice pos-absolute badge badge-success">
                <i className="material-icons">Added</i>
              </span>
            )}
            <Card.Body className="">
              <div className="row">
                {this.props.showList && (
                  <Badge
                    className="badge-add pos-absolute"
                    variant={constant.TYPE_SUCCESS}
                  >
                    <i className="fas fa-plus"></i>
                  </Badge>
                )}
                <div className="col-md-9 col-sm-12">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Note: {product.note}</Card.Text>
                  <Card.Text>Price: {product.price}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </div>
        </Card>
      </div>
    );
  }
}

export default ProductItemComponent;
