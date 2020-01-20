import React, { Component } from "react";
import { Card, Table, Image } from "react-bootstrap";
import SummaryModalDetailComponent from "./SummaryModalDetailComponent";
import constant from "../../constants/constant";
import ModalComponent from "../Common/ModalComponent";

/**
 * Summary detail component
 */
class SummaryDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }

  /**
   * On close modal show list user order
   */
  onCloseModal = () => {
    this.setState({ modalShow: false });
  };

  /**
   * Open modal show list user order
   */
  showUsersOrder = e => {
    e.preventDefault();
    this.setState({ modalShow: true });
  };
  /**
   * render
   */
  render() {
    const { image, productName, note, price, quantity, total } = this.props;
    const { modalShow } = this.state;
    const { listUser } = this.props;
    let listSummaryDetail = [];
    //loop list summary detail
    for (let i = 0; i < listUser.length; i++) {
      const user = listUser[i];
      listSummaryDetail.push(
        <SummaryModalDetailComponent
          stt={i + 1}
          code={user.code}
          name={user.name}
          createAt={user.created_at}
          key={i}
        />
      );
    }

    return (
      <tr>
        <td className="vertical-align">
          <Image src={image} rounded fluid />
        </td>
        <td className="vertical-align">{productName}</td>
        <td className="vertical-align">{note}</td>
        <td className="vertical-align">{price}</td>
        <td className="vertical-align">
          <a href="#" onClick={this.showUsersOrder}>
            {quantity}
          </a>
        </td>
        <td className="vertical-align">{total}</td>
        <ModalComponent
          size={constant.SIZE_MODAL_LG}
          show={modalShow}
          onHide={this.onCloseModal}
          title={"List user order"}
          body={
            <Card>
              <Card.Body>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>
                        <p className="thead-table-menu">No</p>
                        <i
                          className="fa fa-id-card i-fa-2x"
                          aria-hidden="true"
                        />
                      </th>
                      <th>
                        <p className="thead-table-menu">Code</p>
                        <i
                          className="fas fa-signature i-fa-2x"
                          aria-hidden="true"
                        />
                      </th>
                      <th>
                        <p className="thead-table-menu">Name</p>
                        <span>
                          <i
                            className="fa fa-users i-fa-2x"
                            aria-hidden="true"
                          />
                        </span>
                      </th>
                      <th>
                        <p className="thead-table-menu">Order time</p>
                        <span>
                          <i
                            className="far fa-clock i-fa-2x"
                            aria-hidden="true"
                          />
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{listSummaryDetail}</tbody>
                </Table>
              </Card.Body>
            </Card>
          }
        />
      </tr>
    );
  }
}
export default SummaryDetailComponent;
