import React, { Component } from "react";
import { Alert, Modal, Button } from "react-bootstrap";

/**
 * Alert Component
 */
class AlertComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * render
   */
  render() {
    const { type, heading, msg, show, title, onHide } = this.props;
    return (
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        autoFocus={true}
        onHide={onHide}
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={type}>{msg}</Alert>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AlertComponent;
