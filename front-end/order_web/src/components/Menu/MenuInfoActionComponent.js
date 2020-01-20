import React, { Component } from "react";
import { connect } from "react-redux";
import productAction from "../../actions/product.action";
/**
 * Menu Info Action Component
 */
class MenuInfoActionComponent extends Component {
  /**
   * Contructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * handle event when cancel product
   */
  cancelProduct = e => {
    const { listProductCancel } = this.props.listProductStore;
    if (listProductCancel !== null) {
      const { id } = e.target;
      this.props.cancelProductAction(listProductCancel, id, false);
    }
  };

  render() {
    let listProductChoose = [];
    const { listProductCancel } = this.props.listProductStore;
    const { isCreate, isClone } = this.props;
    /**
     * First load page check if create then dont show
     */
    if (!isCreate) {
      if (listProductCancel !== null) {
        for (let i = 0; i < listProductCancel.length; i++) {
          listProductChoose.push(
            <div key={i} className="count-price-order ">
              <label className="fix-margin-menu">
                {listProductCancel[i].name}
              </label>
              <span className="float-right span-cancel">
                <i
                  className="fas fa-minus-square icon-cancel"
                  onClick={this.cancelProduct}
                  id={listProductCancel[i].id}
                ></i>
              </span>
            </div>
          );
        }
      }
    }
    return (
      <div>
        {!isClone && (
          <div className=" menu-list-product-left">
            <div>Danh sách sản phẩm thêm</div>
            <div className=" clear-both product-name-order">
              <label className=" "></label>
              <label className=" fix-padding product-order-price"></label>
            </div>
            {listProductChoose}
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
    listProductStore: state.productReducer,
    detailMenuStore: state.menuReducer.detailMenuById
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
    cancelProductAction: (listProductCancel, productId, isAddProduct) => {
      dispatch(
        productAction.addProduct(listProductCancel, productId, isAddProduct)
      );
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuInfoActionComponent);
