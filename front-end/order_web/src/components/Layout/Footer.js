import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Nav,
  Row,
  Col,
  Navbar,
  Image,
  Button
} from "react-bootstrap";
import "../../assets/css/footer.css";
import logo from "../../../public/images/logo-01.jpg";
// Footer component
class Footer extends Component {
  /**
   * constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = { isRedirectLogin: false };
  }

  /**
   * render
   */
  render() {
    const { isLogin } = this.props.user;
    return (
      <Container className="mt-5 container-footer">
        {isLogin && (
          <Row>
            <Col className="col ">Copyright © 2019 GMO-Z.com RUNSYSTEM.</Col>
          </Row>
        )}
      </Container>
    );
  }
}

/**
 * map state to props of component
 * @param {Object} state
 */
const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};

// export Footer component
export default connect(
  mapStateToProps,
  null
)(Footer);
