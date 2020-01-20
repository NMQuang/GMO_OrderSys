import React, { Component } from "react";
import MenuActionComponent from "../../components/Menu/MenuActionComponent";

// Page Menu Action
class CreateMenuPage extends Component {
  /**
   * render
   */
  render() {
    return (
      <MenuActionComponent isCreate={true} name="Thêm" actionEdit={false} />
    );
  }
}

export default CreateMenuPage;
