import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Table } from "react-bootstrap";

/**
 * Header List Model Component
 */
class HeaderListModelComponent extends Component {
  /**
   * Render
   */
  render() {
    const { listName, linkCreate } = this.props;
    return (
      <Card.Body>
        <Row className="row">
          <Table bordered responsive>
            <tbody className="list-menu-height">
              <tr>
                <td>
                  <span className="list-menu-span">
                    <i className="fa fa-fw fa-list" />
                    {listName}
                  </span>
                  <Link className="form-link" to={linkCreate}>
                    <Button
                      className="create-menu-button"
                      variant="success"
                      size="lg"
                    >
                      <i className="fas fa-plus " />
                    </Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Card.Body>
    );
  }
}

export default HeaderListModelComponent;
