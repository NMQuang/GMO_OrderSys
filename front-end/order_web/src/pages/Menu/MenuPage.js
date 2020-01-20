import React, { Component } from "react";
import MenuComponent from "../../components/Menu/MenuComponent";
import withListModel from "../../components/HOC/withListModel";
import constant from "../../constants/constant";

// Page Menu
class MenuPage extends Component {
  /**
   * render
   */
  render() {
    return <MenuList />;
  }
}

const MenuList = withListModel({
  listName: "Danh sách thực đơn",
  linkCreate: "/menu/create",
  recordPerPage: constant.RECORD_PER_PAGE_5
})(MenuComponent);

export default MenuPage;
