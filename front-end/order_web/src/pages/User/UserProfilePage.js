import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Button, Image, Form } from "react-bootstrap";
import constant from "../../constants/constant";
import userAction from "../../actions/user.action";
import { connect } from "react-redux";
import unknownAvatar from "../../../public/images/unknownAvatar.png";
import validateUtil from "../../utils/validateUtil";
import InlineErrorComponent from "../../components/Common/InlineErrorComponent";
import message from "../../constants/message";
import commonUtil from "../../utils/commonUtil";

/**
 * User profile page
 */
class UserProfilePage extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      avatarError: [],
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
      error: {
        password: [],
        newPassword: [],
        newPasswordConfirm: []
      }
    }

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
   * Handle change avatar
   */
  handleChangeAvatar = e => {
    const { userStore } = this.props;
    e.preventDefault();
    if (this.fileInput.files[0]) {
      const error = validateUtil.fileValidate(this.fileInput.files[0]);
      if (error.length !== 0) {
        this.setState({ avatarError: error });
      } else {
        this.props.changeAvatarAction(userStore.data.id, this.fileInput.files[0]);
        this.setState({ avatarError: [] });
      }
    }
  }

  /**
   * Handle change password
   */
  handleChangePass = e => {
    e.preventDefault();

    const { password, newPassword } = this.state;
    const { userStore } = this.props;
    // check validate
    if (this.checkValidate()) {
      this.props.changePasswordAction(userStore.data.id, password, newPassword);
    }
  }

  /**
   * Check validate
   */
  checkValidate = () => {
    const { password, newPassword, newPasswordConfirm } = this.state;

    let error = {
      password: [],
      newPasswordConfirm: [],
      newPassword: []
    };
    let isValid = true;
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
    if (validateUtil.isEmpty(newPasswordConfirm)) {
      error.newPasswordConfirm.push(
        commonUtil.parseMessage(message.MSG_ERROR_001, ["Password Confirm"])
      );
      isValid = false;
    }
    if (newPasswordConfirm.length > 0 && validateUtil.minLength(newPasswordConfirm, 6)) {
      error.newPasswordConfirm.push(
        commonUtil.parseMessage(message.MSG_ERROR_004, ["New Password Confirm", "6"])
      );
      isValid = false;
    }
    if (validateUtil.isEmpty(newPassword)) {
      error.newPassword.push(
        commonUtil.parseMessage(message.MSG_ERROR_001, ["New Password"])
      );
      isValid = false;
    }
    if (newPassword.length > 0 && validateUtil.minLength(newPassword, 6)) {
      error.newPassword.push(
        commonUtil.parseMessage(message.MSG_ERROR_004, ["New Password", "6"])
      );
      isValid = false;
    }
    if (newPassword.length > 0 && !validateUtil.matchOther(newPassword, newPasswordConfirm)) {
      error.newPassword.push(
        commonUtil.parseMessage(message.MSG_ERROR_010, [""])
      );
      isValid = false;
    }
    
    this.setState({ error: error });
    return isValid;
  }

  /**
   * Render
   */
  render() {
    const { avatarError, password, newPassword, newPasswordConfirm, error } = this.state;
    const { avatar, data } = this.props.userStore;
    return (
      <Container>
        <Card>
          <Card.Header as="h4">
            <Row>
              <Col className="mt-2" xs={6}>
                Profile
              </Col>
              <Col xs={6}>
                <Link className="form-link" to="/home">
                  <Button variant="primary width-button-back ">Back</Button>
                </Link>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="padding-left text-center">
            <div className="w-100 mb-2 text-center" style={{ height: "150px" }}>
              <Image className="avatar" src={avatar ? avatar : unknownAvatar}></Image>
              <input
                className="cs-pt choice-avatar"
                type="file"
                title=""
                ref={ref => (this.fileInput = ref)}
                onChange={this.handleChangeAvatar}
              />
            </div>
            {avatarError.length > 0 && 
              <InlineErrorComponent error={avatarError} />
            }
            <div>
              <p><b>Name:</b> {data.name}</p>
              <p><b>Company:</b> GMO-Z.com Runsystem</p>
            </div>
            <Form className="form-change-pass mt-5 text-left">
              <Form.Label><b>Change Password</b></Form.Label>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                {error.password.length > 0 &&
                  <InlineErrorComponent error={error.password} />
                }
              </Form.Group>
              <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={this.handleChange}
                />
                {error.newPassword.length > 0 &&
                  <InlineErrorComponent error={error.newPassword} />
                }
              </Form.Group>
              <Form.Group controlId="newPasswordConfirm">
                <Form.Label>New Password Confirm</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password Confirm"
                  value={newPasswordConfirm}
                  onChange={this.handleChange}
                />
                {error.newPasswordConfirm.length > 0 &&
                  <InlineErrorComponent error={error.newPasswordConfirm} />
                }
              </Form.Group>
              <Button
                variant={constant.TYPE_PRIMARY}
                type="button"
                onClick={this.handleChangePass}
              >
                Change
              </Button>
            </Form>
            

                
            
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

/**
 * map state to props of component
 * @param {Object} state
 * @return {Object} props
 */
const mapStateToProps = state => {
  return {
    userStore: state.userReducer
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
    changeAvatarAction: (userId, file) => {
      dispatch(userAction.changeAvatar(userId, file));
    },
    changePasswordAction: (userId, oldPassword, newPassword) => {
      dispatch(userAction.changePassword(userId, oldPassword, newPassword));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePage);

