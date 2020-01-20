import React, { Component } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";

// component User Input
class InputComponent extends Component {
  /**
   * constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = { code: "", status: false };
  }
  /**
   * handle event when text change
   * @param {} e
   */
  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ code: value });
    this.props.onChange(value, name);
  };
  /**
   * render
   */
  render() {
    const { icon, name, type } = this.props;
    return (
      <Form.Group className="form-margin-input">
        <InputGroup className="">
          <InputGroup.Prepend>
            <span className="form-login-span">
              <i className={icon} />
            </span>
          </InputGroup.Prepend>
          <FormControl
            className="form-border-input"
            placeholder={"Enter " + name}
            aria-label="Username"
            onChange={this.handleChange}
            aria-describedby="basic-addon1"
            value={this.state.code}
            name={name}
            type={type}
          />
        </InputGroup>
      </Form.Group>
    );
  }
}
export default InputComponent;
