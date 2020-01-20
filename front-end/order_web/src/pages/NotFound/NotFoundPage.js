import React, { Component } from "react";
import { Alert, Container } from "react-bootstrap";
import AlertComponent from "../../components/Common/AlertComponent";
import constant from "../../constants/constant";
import message from "../../constants/message";

// Page not found
class NotFoundPage extends Component {
  render() {
    return (
      <Container>
        <AlertComponent
          type={constant.TYPE_WARNING}
          heading="Warning"
          msg={message.MSG_ERROR_008}
        />
      </Container>
    );
  }
}

export default NotFoundPage;
