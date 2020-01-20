import React, { Component } from "react";
import { Button, Form, Image, Container, Row, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import logo from "../../../public/images/logo-01.jpg";
import InputComponent from "./InputComponent.js";
import userAction from "../../actions/user.action";
import { connect } from "react-redux";
import validateUtil from "../../utils/validateUtil";
import InlineErrorComponent from "../../components/Common/InlineErrorComponent";
import commonUtil from "../../utils/commonUtil";
import message from "../../constants/message";

// component UserLogin
class LoginComponent extends Component {
  /**
   * constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      password: "",
      error: {
        code: [],
        password: []
      }
    };
  }

  /**
   * Component will mount
   */
  componentWillMount() {
    this.props.reload();
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
    const { code, password } = this.state;
    //Check condition if value is "" then setState for error
    if (this.checkValidate()) {
      this.props.login(code, password);
    }
  };

  /**
   * Check validate
   */
  checkValidate = () => {
    const { code, password } = this.state;

    let error = {
      code: [],
      password: []
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

    this.setState({ error: error });
    return isValid;
  };

  /**
   * render
   */
  render() {
    const { error } = this.state;
    const { user } = this.props;
    if (this.props.user.isLogin) {
      return <Redirect to="home" />;
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
                          <Col xs={12}>LOGIN</Col>
                        </Form.Group>
                      </Col>
                    </Row>
                    {user.error && user.error.error.length === 0 && (
                      <Row>
                        <Col xs={12}>
                          <Form.Group className="text-center">
                            <Col xs={12}>
                              <span style={{ fontSize: 20, color: "#ff0000" }}>
                                Login Failed
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
                          type="text"
                          icon="fas fa-user form-login-i"
                          onChange={this.handleChange}
                        />
                        {error.code.length > 0 && (
                          <InlineErrorComponent error={error.code} />
                        )}
                        {user.error && (
                          <InlineErrorComponent
                            errorResponse={user.error.error}
                            field="code"
                          />
                        )}
                      </Col>
                      <Col xs={12} className="form-margin">
                        <InputComponent
                          name="password"
                          type="password"
                          icon="fas fa-key form-login-i"
                          onChange={this.handleChange}
                        />
                        {error.password.length > 0 && (
                          <InlineErrorComponent error={error.password} />
                        )}
                        {user.error && (
                          <InlineErrorComponent
                            errorResponse={user.error.error}
                            field="password"
                          />
                        )}
                      </Col>
                    </Row>
                    <Row className="login-form-button-login">
                      <Col xs={12}>
                        <Form.Group>
                          <Button
                            className="form-button form-width-button"
                            variant="primary"
                            type="submit"
                            onClick={this.handleSubmit}
                          >
                            Login
                          </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Form.Label className="d-flex justify-content-center links">
                          Don't have an account?
                          <Link className="form-link" to="/register">
                            Sign up
                          </Link>
                        </Form.Label>
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
    login: (code, password) => {
      dispatch(userAction.login(code, password));
    },
    reload: () => {
      dispatch(userAction.reload());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
