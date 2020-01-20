import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * Modal Component
 */
class ModalComponent extends Component {
  /**
   * render
   */
  render() {
    const { show, size, title, body, action, onHide, onSave } = this.props;
    return (
      <Modal
        show={show}
        size={size}
        autoFocus={true}
        animation={true}
        centered
        onHide={onHide}
      >
        <Modal.Header>
          <div style={{ display: "flex" }}>
            <i
              className="fas fa-exclamation-circle fa-2x"
              style={{ color: "#faca2a" }}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: 25 }}>
              <p>{body}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onHide}>
            Close
          </Button>
          {action && (
            <Button variant="danger" onClick={onSave}>
              {action}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalComponent;
