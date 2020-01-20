import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
/**
 *Summary modal detailc component
 */
class SummaryModalDetailComponent extends Component {
  /**
   * constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }
  /**
   * render
   */
  render() {
    const {
      stt,
      code,
      name,
      createAt
    } = this.props;
    return (
      <tr>
        <td className="vertical-align">{stt}</td>
        <td className="vertical-align">{code}</td>
        <td className="vertical-align">{name}</td>
        <td className="vertical-align">{new Date(createAt).toUTCString()}</td>
      </tr>
    );
  }
}
export default SummaryModalDetailComponent;
