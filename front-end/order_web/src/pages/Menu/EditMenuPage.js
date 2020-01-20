import React, { Component } from "react";
import MenuActionComponent from "../../components/Menu/MenuActionComponent";

// Page Menu Edit
class EditMenuPage extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * render
   */
  render() {
    const { menuId } = this.props.menuId.match.params;
    const { validFrom, validTo } = this.props.menuId.location.state;
    return (
      <MenuActionComponent
        name="Sửa"
        validFrom={validFrom.validFrom}
        validTo={validTo.validTo}
        actionEdit={true}
        menuId={menuId}
        isEdit={true}
      />
    );
  }
}

export default EditMenuPage;
