import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  FormControl,
  Form
} from "react-bootstrap";
import { connect } from "react-redux";
import menuAction from "../../actions/menu.action";
import productAction from "../../actions/product.action";
import InlineErrorComponent from "../../components/Common/InlineErrorComponent";
import constant from "../../constants/constant";
import { DateTimePicker } from "react-widgets";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";
import ModalComponent from "../Common/ModalComponent";
import ProductItemActionCompoment from "../Product/ProductItemActionCompoment";
import MenuInfoActionComponent from "./MenuInfoActionComponent";
import message from "../../constants/message";
Moment.locale("en");
momentLocalizer();
/**
 * Menu Action Component
 */
class MenuActionComponent extends Component {
  /**
   * Constructor
   * @param {} props
   */
  constructor(props) {
    super(props);
    this.state = {
      validFrom: new Date(),
      validTo: new Date(),
      menuId: "",
      name: "",
      modalShow: false,
      actionEdit: false,
      isClone: false,
      isEdit: false,
      canEdit: true,
      confirmEdit: false,
      isCreate: true,
      listProductsStart: []
    };
  }

  /**
   * handle event when choose date
   * @param {} date
   */
  handleChangeFromDate = date => {
    this.setState({
      validFrom: date
    });
  };
  /**
   * handle event when choose date
   * @param {} date
   */
  handleChangeToDate = date => {
    this.setState({
      validTo: date
    });
  };
  /**
   * handle event set close modal
   * @param {} e
   */
  closeModal = e => {
    this.setState({ modalShow: false });
  };

  /**
   * handle event set close modal of edit modal
   * @param {} e
   */
  onCloseModal = e => {
    this.setState({ confirmEdit: false });
  };

  /**
   * handle event when excute action
   * @param {} e
   */
  onAction = e => {
    const { validTo, validFrom, menuId, confirmEdit } = this.state;
    const { isCreate, isClone, isEdit } = this.props;
    const { name } = e.target;
    let listProductsAdd = [];
    let listChoose = [];
    // If create then call acction create menu, else edit menu, else clone menu
    if (isCreate) {
      listProductsAdd = this.props.listProductAddStore.listProductCancel;
      if (listProductsAdd.length > 0) {
        for (let i = 0; i < listProductsAdd.length; i++) {
          listChoose.push(listProductsAdd[i].id);
        }
      }
      this.props.createMenuAction(
        Math.floor(validFrom.getTime() / 1000),
        Math.floor(validTo.getTime() / 1000),
        listChoose
      );
    } else if (isEdit) {
      let to = new Date(this.props.validTo);
      let from = new Date(this.props.validFrom);
      let listProductCancel = this.props.listProductStore.listProductCancel;
      to.setHours(to.getHours() - 7);
      from.setHours(to.getHours() - 7);

      // check this menu is being ordered or not yet
      if (from <= Date.now() && Date.now() <= to) {
        this.setState({ confirmEdit: true });
      } else {
        // Check exist data
        if (listProductCancel) {
          let listProductId = [];
          /**
           * Loop to add id product into list
           */
          for (let i = 0; i < listProductCancel.length; i++) {
            listProductId.push(listProductCancel[i].id);
          }
          // Add list product get from API when we are load list product(only one)
          this.props.editMenuAction(
            menuId,
            Math.floor(validFrom.getTime() / 1000),
            Math.floor(validTo.getTime() / 1000),
            listProductId
          );
        }
      }
    } else if (isClone) {
      this.props.cloneMenuAction(
        menuId,
        Math.floor(validFrom.getTime() / 1000),
        Math.floor(validTo.getTime() / 1000)
      );
    }
  };
  /**
   * handle event when excute action edit menu
   * @param {} e
   */
  editMenu = e => {
    const { menuId, validTo, validFrom } = this.state;
    let listProductCancel = this.props.listProductStore.listProductCancel;
    //Check exist data
    if (listProductCancel) {
      let listProductId = [];
      /**
       * Loop to add id product into list
       */
      for (let i = 0; i < listProductCancel.length; i++) {
        listProductId.push(listProductCancel[i].id);
      }
      this.props.editMenuAction(
        menuId,
        Math.floor(validFrom.getTime() / 1000),
        Math.floor(validTo.getTime() / 1000),
        listProductId
      );
    }
  };

  /**
   * Handle call from child
   *
   */
  getProductId = e => {
    this.setState({ isCreate: false });
  };

  /**
   * Component will mount
   */
  componentWillMount() {
    const { name, menuId, isCreate, isClone, isEdit } = this.props;
    this.setState({ name: name });

    /**
     * Check action Clone to hide list product
     */
    if (isClone) {
      this.setState({ isClone: true });
    } else {
      this.setState({ isClone: false });
    }
    /**
     * Check If Edit or Clone then update list product choose
     */
    if (!isCreate) {
      this.props.getDetailMenuByMenuIdAction(
        menuId,
        this.props.userStore.data.id
      );
      this.setState({ isCreate: false, isEdit: true });
    } else {
      this.props.restListProductAction();
      this.setState({ isCreate: true });
    }
    this.props.getListProductAction();
  }
  /**
   * Component did mount
   */
  componentDidMount() {
    const {
      menuId,
      validTo,
      validFrom,
      name,
      isCreate,
      isClone,
      isEdit
    } = this.props;
    // Check menu expired when edit.
    if (isEdit) {
      let to = new Date(this.props.validTo);
      to.setHours(to.getHours() - 7);
      if (to < Date.now()) {
        this.setState({ canEdit: false });
      }
    }
    /**
     * Check action for event when load data
     */
    if (isEdit || isClone) {
      let from = new Date(validFrom);
      from.setHours(from.getHours() - 7);
      let to = new Date(validTo);
      to.setHours(to.getHours() - 7);
      this.setState({
        name: name,
        menuId: menuId,
        validTo: to,
        validFrom: from
      });
    }
  }
  componentDidUpdate() {
    const { isEdit } = this.state;
    if (this.props.detailMenuStore) {
      let listProductsExist = this.props.detailMenuStore[0].products;
      let listProducts = this.props.listProductStore.listProduct;
      if (isEdit) {
        this.setState({ isEdit: false });
        this.props.getListProductExistAction(listProductsExist, listProducts);
      }
    }
  }

  /**
   * render
   */
  render() {
    const {
      name,
      menuId,
      validFrom,
      validTo,
      isClone,
      canEdit,
      confirmEdit,
      isCreate
    } = this.state;
    const { listProduct } = this.props.listProductStore;
    let listProductsStart = null;
    if (isCreate) {
      if (listProduct) {
        listProductsStart = listProduct;
      }
    } else {
      if (this.props.listProductAddStore) {
        listProductsStart = this.props.listProductAddStore.listProductAdd;
      }
    }
    let listProductRender = [];
    const { menuStore } = this.props;

    // if menu has expired when edit, redirect page list menu
    if (!canEdit) {
      return (
        <Redirect
          to={{
            pathname: "/menu",
            state: {
              msg: "Menu has expired. Cannot edit.",
              type: constant.TYPE_DANGER
            }
          }}
        />
      );
    }
    // if action success, redirect page list menu
    if (menuStore.createEditCloneData) {
      return <Redirect to="/menu" />;
    }
    /**
     * Check list product if list product not null then load list product
     */

    if (listProductsStart !== null) {
      /**
       * loop to set value
       */
      for (let i = 0; i < listProductsStart.length; i++) {
        let products = { name: "", price: "", note: "", image: "", id: "" };
        products = {
          name: listProductsStart[i].name,
          price: listProductsStart[i].price,
          note: listProductsStart[i].note,
          image: listProductsStart[i].image,
          id: listProductsStart[i].id
        };
        listProductRender.push(
          <ProductItemActionCompoment
            key={i}
            isAdd={false}
            onClick={this.getProductId}
            products={products}
            listProductsStart={listProductsStart}
          />
        );
      }
    }
    return (
      <div>
        {confirmEdit && (
          <ModalComponent
            size="lg"
            title="Edit confirm"
            body={message.MSG_INFO_006}
            action="Yes"
            show={confirmEdit}
            onHide={this.onCloseModal}
            onSave={this.editMenu}
          />
        )}
        <Container className="container-action-menu screen-body">
          <Card className="card-mune-action">
            <Card.Header as="h4">
              <Row>
                <Col xs={6}>{name} Thực Đơn</Col>
                <Col xs={6}>
                  <Link className="form-link" to="/menu">
                    <Button variant="primary width-button-back ">
                      Trở lại
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="padding-left">
              <Form className="row">
                <div className="col-5 menu-action-left">
                  {menuId && (
                    <Form.Group>
                      <Form.Label>ID</Form.Label>
                      <FormControl
                        className="input-create-menu date-time-picker"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={menuId}
                        disabled
                      />
                    </Form.Group>
                  )}
                  <Form.Group>
                    <Form.Label>Ngày tạo:</Form.Label>
                    <DateTimePicker
                      className="date-time-picker"
                      editFormat={constant.PATTERN_DATETIME}
                      value={validFrom}
                      format={constant.PATTERN_DATETIME}
                      inputProps={{ readOnly: true }}
                      onChange={this.handleChangeFromDate}
                      step={10}
                      timeFormat={constant.PATTERN_TIME}
                    />
                    {menuStore.createEditCloneError && (
                      <InlineErrorComponent
                        errorResponse={menuStore.createEditCloneError}
                        field="validFrom"
                      />
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Ngày kết thúc:</Form.Label>
                    <DateTimePicker
                      className="date-time-picker"
                      editFormat={constant.PATTERN_DATETIME}
                      value={validTo}
                      format={constant.PATTERN_DATETIME}
                      inputProps={{ readOnly: true }}
                      onChange={this.handleChangeToDate}
                      step={10}
                      timeFormat={constant.PATTERN_TIME}
                    />
                    {menuStore.createEditCloneError && (
                      <InlineErrorComponent
                        errorResponse={menuStore.createEditCloneError}
                        field="validTo"
                      />
                    )}
                  </Form.Group>
                  <div className="menu-list-product-left">
                    <MenuInfoActionComponent
                      isCreate={isCreate}
                      isClone={isClone}
                    ></MenuInfoActionComponent>
                  </div>
                  <Form.Group className="action-menu">
                    <Button
                      className="witdh-button-create-menu"
                      variant="primary"
                      name={name}
                      onClick={this.onAction}
                    >
                      {name} Thực đơn
                    </Button>
                  </Form.Group>
                </div>
                <div className="col-7 menu-action-right">
                  <Form.Group>
                    {!isClone && (
                      <div className="row ">
                        <div className="col-md-12 col-lg-12">
                          {listProductRender}
                        </div>
                      </div>
                    )}
                  </Form.Group>
                </div>
              </Form>
            </Card.Body>
          </Card>
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
    listProductStore: state.productReducer,
    userStore: state.userReducer,
    detailMenuStore: state.menuReducer.detailMenuById,
    menuStore: state.menuReducer,
    listProductAddStore: state.productReducer
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
    createMenuAction: (validFrom, validTo, listProduct) => {
      dispatch(menuAction.createMenu(validFrom, validTo, listProduct));
    },
    cloneMenuAction: (menuId, validFrom, validTo) => {
      dispatch(menuAction.cloneMenu(menuId, validFrom, validTo));
    },
    editMenuAction: (menuId, validFrom, validTo, listProduct) => {
      dispatch(menuAction.editMenu(menuId, validFrom, validTo, listProduct));
    },
    getDetailMenuByMenuIdAction: (menuId, userId) => {
      dispatch(menuAction.getDetailMenuByMenuId(menuId, userId));
    },
    getListProductAction: () => {
      dispatch(productAction.fetch());
    },
    restListProductAction: () => {
      dispatch(productAction.resetStore());
    },
    getListProductExistAction: (listProductExist, listProducts) => {
      dispatch(
        productAction.getListProductExist(listProductExist, listProducts)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuActionComponent);
