import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Card, Table, Row, Button } from "react-bootstrap";
import SummaryDetailComponent from "./SummaryDetailComponent";
import menuAction from "../../actions/menu.action";
import commonUtil from "../../utils/commonUtil";
import socket from "../../configs/socket";
import ExportFileComponent from "../Common/ExportFileComponent";
import AlertComponent from "../Common/AlertComponent";
import message from "../../constants/message";

/**
 * Summary component
 */
class SummaryComponent extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    const { menuId } = this.props;
    socket.on("update-summary", menuId => {
      if (+menuId === +this.props.menuId) {
        this.props.getSummaryAction(menuId);
      }
    });
    this.props.getSummaryAction(menuId);
  }

  /**
   * render
   */
  render() {
    const { menuStore } = this.props;
    let listSummary = [];
    let listExport = [];
    let total = 0;

    // Check menu summary data to render summary detail
    if (menuStore.menuSummaryData && menuStore.menuSummaryData.length > 0) {
      let i = 0;
      menuStore.menuSummaryData.forEach(element => {
        let product = element.product;
        let money = product.price * element.quantity;
        total += money;
        listSummary.push(
          <SummaryDetailComponent
            image={product.image}
            productName={product.name}
            note={product.note}
            price={commonUtil.formatNumberMoney(product.price.toString())}
            quantity={element.quantity}
            total={commonUtil.formatNumberMoney(money.toString())}
            listUser={element.users}
            key={i++}
          />
        );
        // export xlsx
        let summaryDto = {};
        summaryDto.name = product.name;
        summaryDto.image = product.image;
        summaryDto.note = product.note;
        summaryDto.price = commonUtil.formatNumberMoney(
          product.price.toString()
        );
        summaryDto.quantity = element.quantity;
        summaryDto.total = commonUtil.formatNumberMoney(money.toString());
        listExport.push(summaryDto);
      });
    }
    total = commonUtil.formatNumberMoney(total.toString());
    return (
      <div>
        {listExport.length === 0 && (
          <AlertComponent
            type="warning"
            msg="Currently, the menu is being ordered. "
          />
        )}
        <Container>
          {listSummary.length > 0 ? (
            <Card>
              <Card.Body>
                <Row className="row">
                  <Table bordered hover responsive>
                    <tbody className="list-menu-height">
                      <tr>
                        <td>
                          <span className="list-menu-span">
                            <i className="fa fa-fw fa-list" />
                            Chi tiết bảng tính
                          </span>
                          <Link className="form-link" to="/menu">
                            <Button variant="primary width-button-back ">
                              Trở lại
                            </Button>
                          </Link>
                          <ExportFileComponent
                            csvData={listExport}
                            fileName={"summary_" + this.props.menuId}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
              </Card.Body>
              <Card.Body>
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>
                        <p className="p">Hình ảnh</p>
                        <span>
                          <i
                            className="fas fa-images i-fa-2x"
                            aria-hidden="true"
                          />
                        </span>
                      </th>
                      <th>
                        <p className="p">Tên sản phâm</p>
                        <span>
                          <i
                            className="fas fa-signature i-fa-2x"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </th>
                      <th>
                        <p className="p">Ghi chú</p>
                        <span>
                          <i
                            className="far fa-sticky-note i-fa-2x"
                            aria-hidden="true"
                          />
                        </span>
                      </th>
                      <th>
                        <p className="p">Giá</p>
                        <span>
                          <i
                            className="fas fa-money-bill i-fa-2x"
                            aria-hidden="true"
                          />
                        </span>
                      </th>
                      <th>
                        <p className="thead-table-menu">Số lượng</p>
                        <span>
                          <i
                            className="fa fa-plus i-fa-2x"
                            aria-hidden="true"
                          />
                        </span>
                      </th>
                      <th>
                        <p className="thead-table-menu">Tổng</p>
                        <span>
                          <i
                            className="fas fa-dollar-sign i-fa-2x"
                            aria-hidden="true"
                          />
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{listSummary}</tbody>
                  {menuStore.menuSummaryData &&
                    menuStore.menuSummaryData.length > 0 && (
                      <tfoot>
                        <tr>
                          <th>
                            <b>Tổng:</b>
                          </th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>{total}</th>
                        </tr>
                      </tfoot>
                    )}
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <div className="text-center">
              <p>{message.MSG_INFO_003}</p>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

/**
 * map state to props of component
 * @param {Object} state
 * @return {Object} props
 */
const mapStateToProps = state => {
  return {
    menuStore: state.menuReducer
  };
};

/**
 * map dispatch to props
 * @param {ActionCreator} dispatch
 * @param {String} props
 * @return {ActionCreator}
 */
const mapDispatchToProps = (dispatch, props) => {
  return {
    getSummaryAction: menuId => {
      dispatch(menuAction.getMenuSummary(menuId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryComponent);
