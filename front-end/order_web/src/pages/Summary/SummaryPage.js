import React, { Component } from "react";
import SummaryComponent from "../../components/Summary/SummaryComponent";

// Page Summary
class SummaryPage extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * render
   */
  render() {
    const { menuId } = this.props.menuId.match.params;
    return <SummaryComponent menuId={menuId} />;
  }
}

export default SummaryPage;
