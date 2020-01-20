import React, { Component } from "react";
import { Col, Card } from "react-bootstrap";
/**
 * Menu Detail Component
 */
class MenuDetailComponent extends Component {
  /**
   * Constructor
   * @param {} props
   */
  constructor(props) {
    super(props);
    this.state;
  }
  /**
   * render
   */
  render() {
    const { name, note, price, image, id } = this.props;
    return (
      <Col xs={3} className="margin-bottom-list-product ">
        <Card>
          <Card.Img
            variant="top"
            src={image}
            style={{ maxHeight: 250, minHeight: 250 }}
          />
          <Card.Body>
            <Card.Title>Name:{name}</Card.Title>
            <Card.Text>Price: {price}</Card.Text>
            <Card.Text>Note: {note}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default MenuDetailComponent;
