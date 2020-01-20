import React, { Component } from "react";

/**
 * Inline Error Component
 * Component use to show error behind the input component
 */
class InlineErrorComponent extends Component {
  /**
   * render
   */
  render() {
    // error: error when check in client
    // errorResponse: error when check in server
    // field: attribute name of tag input
    const { error, errorResponse, field } = this.props;
    let errorList = [];
    // if error check in client => create errorList is error check in client
    // else create errorList is error check in server
    if (error) {
      for (let i = 0; i < error.length; i++) {
        errorList.push(
          <span key={i} className="form-error-input">{error[i]}<br /></span>
        );
      }
    } else {
      for (let i = 0; i < errorResponse.length; i++) {
        if (errorResponse[i].param === field) {
          errorList.push(
            <span key={i} className="form-error-input">{ errorResponse[i].msg }<br /></span>
          );
        }
      }
    }
    return (
      <div>{ errorList }</div>
    )
  }
}

export default InlineErrorComponent;
