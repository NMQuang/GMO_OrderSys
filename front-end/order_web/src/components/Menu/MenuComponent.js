import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import MenuItemsComponent from "./MenuItemsComponent";
import menuAction from "../../actions/menu.action";
import AlertComponent from "../Common/AlertComponent";
import commonUtil from "../../utils/commonUtil";
import message from "../../constants/message";

/**
 * Menu Component
 */
class MenuComponent extends Component {
  /**
   * Constructor
   * @param {} props
   */
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      msg: this.props.location.state ? this.props.location.state.msg : null,
      typeMsg: this.props.location.state ? this.props.location.state.type : null
    };
  }
  /**
   * handle event when choose page
   * @param {} pageNumber
   */
  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };
  /**
   * Component did mount
   */
  componentDidMount() {
    this.props.history.replace();
    this.props.menulist();

    //this.setState({ listMenu: this.props.listMenu });
  }

  /**
   * Component did update
   */
  componentDidUpdate() {
    const { startLoop, endLoop } = this.props;
    /**
     * check to set pagination
     */
    if (this.props.menuReducer.listMenu) {
      this.props.done(this.props.menuReducer.listMenu.length);
    }
    if (startLoop === endLoop) {
      this.props.updateCurrentPage();
    }
  }

  /**
   * render
   */
  render() {
    const { msg, typeMsg } = this.state;
    const { menuReducer, startLoop, endLoop } = this.props;
    let listMenuRender = [];

    /**
     * Check list menu exist
     */
    if (menuReducer.listMenu && menuReducer.listMenu.length > 0) {
      /**
       * Loop list menu
       */
      for (let i = startLoop; i < endLoop; i++) {
        if (i < 0) continue;
        const ele = menuReducer.listMenu[i];
        if (typeof ele === "undefined") {
          break;
        }
        listMenuRender.push(
          <MenuItemsComponent
            key={i}
            menuId={ele.id}
            validFrom={ele.valid_from}
            validTo={ele.valid_to}
            productQuantity={ele.product}
          />
        );
      }
    }
    return (
      <div>
        {msg && <AlertComponent type={typeMsg} msg={msg} />}
        {menuReducer.listMenu && menuReducer.listMenu.length > 0 ? (
          <Card.Body>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>
                    <p className="thead-table-menu">ID</p>
                    <i className="fa fa-id-card i-fa-2x" aria-hidden="true" />
                  </th>
                  <th>
                    <p className="thead-table-menu">Ngày tạo</p>
                    <i className="fa fa-calendar i-fa-2x" aria-hidden="true" />
                  </th>
                  <th>
                    <p className="thead-table-menu">Ngày kết thúc</p>
                    <span>
                      <i
                        className="fa fa-calendar i-fa-2x"
                        aria-hidden="true"
                      />
                    </span>
                  </th>
                  <th>
                    <p className="thead-table-menu">Sản phẩm</p>
                    <span>
                      <i
                        className="fa fa-product-hunt i-fa-2x"
                        aria-hidden="true"
                      />
                    </span>
                  </th>
                  <th className="action-menu">
                    <p className="thead-table-menu">Chức năng</p>
                  </th>
                </tr>
              </thead>
              <tbody>{listMenuRender}</tbody>
            </Table>
          </Card.Body>
        ) : (
          <div className="text-center">
            <p>{commonUtil.parseMessage(message.MSG_INFO_002, ["menu"])}</p>
          </div>
        )}
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
    menuReducer: state.menuReducer
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
    menulist: () => {
      dispatch(menuAction.fetch());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MenuComponent)
);
