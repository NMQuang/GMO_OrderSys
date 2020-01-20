import React, { Component } from 'react'
import { Spinner } from "react-bootstrap";

/**
 * Loading Component
 */
class LoadingComponent extends Component {
  /**
   * render
   */
  render() {
    return (
      <div className="loader op-0-7 w-100 h-100">
        <div className="pos-absolute spinner">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </div>
      </div>
    )
  }
}

export default LoadingComponent;
