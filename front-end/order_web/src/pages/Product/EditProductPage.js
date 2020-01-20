import React, { Component } from "react";
import ProductFormComponent from "../../components/Product/ProductFormComponent";
import { connect } from "react-redux";
import productAction from "../../actions/product.action";

/**
 * Edit Product Page
 */
class EditProductPage extends Component {
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
    const { productId } = this.props.productId.match.params;
    this.props.resetStoreAction();
    this.props.getProductDetailAction(productId);
  }

  /**
   * Render
   */
  render() {
    const { productStore } = this.props;
    return (
      <>
        { productStore.productDetailData && 
          <ProductFormComponent 
            productId={productStore.productDetailData[0].id}
            name={productStore.productDetailData[0].name}
            fileUrl={productStore.productDetailData[0].image}
            note={productStore.productDetailData[0].note}
            price={productStore.productDetailData[0].price}
          />
        }
      </>
    )
  }
}

/**
 * map state to props of component
 * @param {Object} state
 * @return {Object} props
 */
const mapStateToProps = state => {
  return {
    productStore: state.productReducer
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
    getProductDetailAction: (productId) => {
      dispatch(productAction.getProductDetail(productId));
    },
    resetStoreAction: () => {
      dispatch(productAction.resetStore());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProductPage);