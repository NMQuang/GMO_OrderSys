import React, { Component } from "react";
import MenuActionComponent from "../../components/Menu/MenuActionComponent";

// Page Menu Clone
class CloneMenuPage extends Component {
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
        name="Sao chép"
        validTo={validTo.validTo}
        validFrom={validFrom.validFrom}
        actionEdit={false}
        menuId={menuId}
        isClone={true}
      />
    );
  }
}

export default CloneMenuPage;
