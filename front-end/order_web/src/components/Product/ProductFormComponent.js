import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Image,
  Card,
  Row,
  Col
} from "react-bootstrap";
import constant from "../../constants/constant";
import validateUtil from "../../utils/validateUtil";
import InlineErrorComponent from "../../components/Common/InlineErrorComponent";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import productAction from "../../actions/product.action";
import commonUtil from "../../utils/commonUtil";
import message from "../../constants/message";

/**
 * Product Form Component
 */
class ProductFormComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name ? this.props.name : "",
      note: this.props.note ? this.props.note : "",
      price: this.props.price ? this.props.price : "",
      file: null,
      fileUrl: this.props.fileUrl ? this.props.fileUrl : "",
      error: {
        file: [],
        name: [],
        note: [],
        price: []
      },
      isRedirect: false,
      msgRedirect: ""
    };
    this.fileInput = React.createRef();
  }

  /**
   * Handle change
   */
  handleChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  /**
   * Handle change file
   */
  handleChangeFile = e => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });
  };

  /**
   * Handle submit
   */
  handleSubmit = e => {
    const { productId } = this.props;
    const { name, note, price } = this.state;
    e.preventDefault();
    if (this.checkValidate()) {
      if (!productId) {
        this.props.create(name, note, price, this.fileInput.files[0]);
      } else {
        this.props.edit(productId, name, note, price, this.fileInput.files[0]);
      }
    }
  };

  /**
   * Clear image select
   */
  clearImage = e => {
    e.preventDefault();
    this.fileInput.value = "";
    this.setState({ file: null });
  };

  /**
   * Check validte
   */
  checkValidate = () => {
    const { name, note, price } = this.state;
    const { productId } = this.props;

    let error = {
      file: [],
      name: [],
      note: [],
      price: []
    };
    let isValid = true;
    if (!productId && typeof this.fileInput.files[0] === "undefined") {
      error.file.push(
        commonUtil.parseMessage(message.MSG_ERROR_001, ["Image"])
      );
      isValid = false;
    }
    if (this.fileInput.files[0]) {
      error.file = validateUtil.fileValidate(this.fileInput.files[0]);
      if (error.file.length !== 0) {
        isValid = false;
      }
    }
    if (validateUtil.isEmpty(name)) {
      error.name.push(commonUtil.parseMessage(message.MSG_ERROR_001, ["Name"]));
      isValid = false;
    }
    if (!validateUtil.checkPattern(name, validateUtil.patternWordOnly)) {
      error.name.push(commonUtil.parseMessage(message.MSG_ERROR_005, ["Name"]));
      isValid = false;
    }
    if (validateUtil.isEmpty(note)) {
      error.note.push(commonUtil.parseMessage(message.MSG_ERROR_001, ["Note"]));
      isValid = false;
    }
    if (validateUtil.isEmpty(price)) {
      error.price.push(
        commonUtil.parseMessage(message.MSG_ERROR_001, ["Price"])
      );
      isValid = false;
    }
    if (!validateUtil.checkNumber(price)) {
      error.price.push(
        commonUtil.parseMessage(message.MSG_ERROR_003, ["Price"])
      );
      isValid = false;
    }
    this.setState({ error: error });
    return isValid;
  };

  /**
   * Render
   */
  render() {
    const { productId, product } = this.props;
    const { name, note, price, error, file, fileUrl } = this.state;
    if (product.createEditData) {
      return <Redirect to="/product" />;
    }

    return (
      <Container>
        <Card>
          <Card.Header as="h4">
            <Row>
              <Col xs={6}>
                {productId ? "Sửa thông tin sản phẩm." : "Thêm sản phẩm."}
              </Col>
              <Col xs={6}>
                <Link className="form-link" to="/product">
                  <Button variant="primary width-button-back ">Trở lại</Button>
                </Link>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="padding-left">
            <Form>
              <Form.Group controlId="image">
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Choose your image"
                  ref={ref => (this.fileInput = ref)}
                  onChange={this.handleChangeFile}
                />
                {file ? (
                  <Form.Group className="mt-2 mb-0">
                    <Image src={this.state.file} rounded />
                  </Form.Group>
                ) : (
                  fileUrl && (
                    <Form.Group className="mt-2 mb-0">
                      <Image src={fileUrl} rounded />
                    </Form.Group>
                  )
                )}
                <Button
                  className="mt-2"
                  variant={constant.TYPE_DARK}
                  onClick={this.clearImage}
                  size="lg"
                >
                  Xoá
                </Button>
                {error.file.length > 0 ? (
                  <InlineErrorComponent error={error.file} />
                ) : (
                  product.createEditError && (
                    <InlineErrorComponent
                      errorResponse={product.createEditError.error}
                      field="file"
                    />
                  )
                )}
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={this.handleChange}
                />
                {error.name.length > 0 ? (
                  <InlineErrorComponent error={error.name} />
                ) : (
                  product.createEditError && (
                    <InlineErrorComponent
                      errorResponse={product.createEditError.error}
                      field="name"
                    />
                  )
                )}
              </Form.Group>
              <Form.Group controlId="note">
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Note"
                  value={note}
                  onChange={this.handleChange}
                />
                {error.note.length > 0 ? (
                  <InlineErrorComponent error={error.note} />
                ) : (
                  product.createEditError && (
                    <InlineErrorComponent
                      errorResponse={product.createEditError.error}
                      field="note"
                    />
                  )
                )}
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={this.handleChange}
                />
                {error.price.length > 0 ? (
                  <InlineErrorComponent error={error.price} />
                ) : (
                  product.createEditError && (
                    <InlineErrorComponent
                      errorResponse={product.createEditError.error}
                      field="price"
                    />
                  )
                )}
              </Form.Group>
              <Button
                variant={constant.TYPE_PRIMARY}
                type="button"
                onClick={this.handleSubmit}
              >
                {productId ? "Sửa" : "Thêm mới"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
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
    product: state.productReducer
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
    create: (name, note, price, image) => {
      dispatch(productAction.create(name, note, price, image));
    },
    edit: (productId, name, note, price, image) => {
      dispatch(productAction.edit(productId, name, note, price, image));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductFormComponent);
