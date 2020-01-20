import React, { Component } from "react";
import ProductComponent from "../../components/Product/ProductComponent";
import withListModel from "../../components/HOC/withListModel";
import constant from "../../constants/constant";

/**
 * Product Page
 */
class ProductPage extends Component {
  /**
   * render
   */
  render() {
    return <ProductList />;
  }
}

const ProductList = withListModel({
  listName: "Danh sách sản phẩm",
  linkCreate: "/product/create",
  recordPerPage: constant.RECORD_PER_PAGE_5
})(ProductComponent);

export default ProductPage;
