import React, { Component } from "react";
import { Button, Form, Image, Container, Row, Col } from "react-bootstrap";
import logo from "../../../public/images/logo-01.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import InputComponent from "./InputComponent.js";
import InlineErrorComponent from "../Common/InlineErrorComponent";
import validateUtil from "../../utils/validateUtil";
import userAction from "../../actions/user.action";
import commonUtil from "../../utils/commonUtil";
import message from "../../constants/message";

// component UserRegister
class RegisterComponent extends Component {
  /**
   * constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      password: "",
      name: "",
      error: {
        code: [],
        password: [],
        name: []
      }
    };
  }
  /**
   * handle event when text change
   * @param {} value
   * @param {} name
   */
  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };
  /**
   * handle event when submit form
   * @param {} e
   */
  handleSubmit = e => {
    e.preventDefault();

    //Check condition if value is "" then setState for error
    const { code, password, name } = this.state;
    if (this.checkValidate()) {
      this.props.register(code, password, name);
    }
  };

  /**
   * Check validate
   */
  checkValidate = () => {
    const { code, password, name } = this.state;

    let error = {
      code: [],
      password: [],
      name: []
    };
    let isValid = true;

    if (validateUtil.isEmpty(code)) {
      error.code.push(commonUtil.parseMessage(message.MSG_ERROR_001, ["Code"]));
      isValid = false;
    }
    if (code.length > 0 && !validateUtil.checkLength(code, 4)) {
      error.code.push(
        commonUtil.parseMessage(message.MSG_ERROR_002, ["Code", "4"])
      );
      isValid = false;
    }
    if (!validateUtil.checkNumber(code)) {
      error.code.push(commonUtil.parseMessage(message.MSG_ERROR_003, ["Code"]));
      isValid = false;
    }
    if (validateUtil.isEmpty(password)) {
      error.password.push(
        commonUtil.parseMessage(message.MSG_ERROR_001, ["Password"])
      );
      isValid = false;
    }
    if (password.length > 0 && validateUtil.minLength(password, 6)) {
      error.password.push(
        commonUtil.parseMessage(message.MSG_ERROR_004, ["Password", "6"])
      );
      isValid = false;
    }
    if (validateUtil.isEmpty(name)) {
      error.name.push(commonUtil.parseMessage(message.MSG_ERROR_001, ["Name"]));
      isValid = false;
    }
    this.setState({ error: error });
    return isValid;
  };

  /**
   * render
   */
  render() {
    const { error } = this.state;
    if (this.props.user.error) {
    }

    return (
      <Form.Group className="container-login100">
        <Container>
          <Row>
            <Col xs={12}>
              <Form.Group className="container-login">
                <Form.Group className="container-login-form">
                  <Form>
                    <Row className="form-logo">
                      <Col xs={12}>
                        <Image
                          src={logo}
                          roundedCircle
                          className="form-logo-img"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Form.Group className="login-form-text">
                          <Col xs={12}>Sign up</Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    {this.props.user.registerSuccess && (
                      <Row>
                        <Col xs={12}>
                          <Form.Group className="text-center">
                            <Col xs={12}>
                              <span style={{ fontSize: 20, color: "#14bb3a" }}>
                                Register Successfully
                              </span>
                            </Col>
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col xs={12} className="form-margin">
                        <InputComponent
                          name="code"
                          icon="fas fa-user form-login-i"
                          onChange={this.handleChange}
                          type="text"
                        />
                        {error.code.length > 0 && (
                          <InlineErrorComponent error={error.code} />
                        )}
                        {this.props.user.error && (
                          <InlineErrorComponent
                            errorResponse={this.props.user.error.error}
                            field="code"
                          />
                        )}
                      </Col>
                      <Col xs={12} className="form-margin">
                        <InputComponent
                          name="password"
                          icon="fas fa-key form-login-i"
                          onChange={this.handleChange}
                          type="password"
                        />
                        {error.password.length > 0 && (
                          <InlineErrorComponent error={error.password} />
                        )}
                        {this.props.user.error && (
                          <InlineErrorComponent
                            errorResponse={this.props.user.error.error}
                            field="password"
                          />
                        )}
                      </Col>
                      <Col xs={12} className="form-margin">
                        <InputComponent
                          name="name"
                          icon="fas fa-user form-login-i"
                          onChange={this.handleChange}
                          type="text"
                        />
                        {error.name.length > 0 && (
                          <InlineErrorComponent error={error.name} />
                        )}
                        {this.props.user.error && (
                          <InlineErrorComponent
                            errorResponse={this.props.user.error.error}
                            field="name"
                          />
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="login-form-button-login">
                        <Form.Group>
                          <Button
                            className="form-button form-width-button"
                            variant="primary"
                            type="button"
                            onClick={this.handleSubmit}
                          >
                            Sign up
                          </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="d-flex justify-content-center links">
                            Login with an account.
                            <Link className="form-link" to="/">
                              Login
                            </Link>
                          </Form.Label>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Form.Group>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form.Group>
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
    user: state.userReducer
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
    register: (code, password, name) => {
      dispatch(userAction.register(code, password, name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent);
