import { Card, Button, Col, Form, Nav } from "react-bootstrap";
import React, { Component } from "react";
import commonUtil from "../../utils/commonUtil";
import constants from "../../constants/message";

let x;

/**
 * Menu Time Order Component
 */
class MenuTimeOrderComponent extends Component {
  /**
   * constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      hours: null,
      minutes: null,
      seconds: null
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    const { menuToday, deadline } = this.props;
    let days = "";
    let hours = "";
    let minutes = "";
    let seconds = "";
    if (menuToday.id && deadline) {
      // get time valid to
      const timeValidTo = commonUtil
        .addHourToDateString(menuToday.valid_to, -7)
        .getTime();

      // set interval
      x = setInterval(() => {
        // get time valid from
        const timeValidFrom = commonUtil
          .addHourToDateString(menuToday.valid_from, -7)
          .getTime();
        // Get today's date and time
        let now = new Date().getTime();
        // Find the distance between now and the count down date
        let distance = timeValidTo - now;
        // Time calculations for days, hours, minutes and seconds
        days = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // If the count down is over, write some text
        if (timeValidTo < now || timeValidFrom > now) {
          this.setState({
            hours: "--",
            minutes: "--",
            seconds: "--"
          });
        } else {
          this.setState({
            hours: hours,
            minutes: minutes,
            seconds: seconds
          });
        }
      }, 0);
    } else {
      this.setState({
        hours: "--",
        minutes: "--",
        seconds: "--"
      });
    }
  }
  /**
   * component will unmount
   */
  componentWillUnmount() {
    clearInterval(x);
  }

  /**
   * render
   */
  render() {
    const { hours, minutes, seconds } = this.state;
    const { active, deadline } = this.props;
    let hoursStr = hours;
    let minutesStr = minutes;
    let secondsStr = seconds;
    /**
     * check if number of hours, menutes, seconds <10, add "0" in front of them
     */
    if (seconds) {
      if (hours < 10) {
        hoursStr = "0" + hoursStr;
      }
      if (minutes < 10) {
        minutesStr = "0" + minutesStr;
      }
      if (seconds < 10) {
        secondsStr = "0" + secondsStr;
      }
    }
    return (
      <div className="time-order">
        {active && deadline && (
          <React.Fragment>
            <Form.Label className="text-left-page">
              Thời gian đặt hàng còn lại:
            </Form.Label>
            <br></br>
            <Form.Label className="time-left">
              {secondsStr && (
                <div>
                  {hoursStr}:{minutesStr}:{secondsStr}
                </div>
              )}
            </Form.Label>
          </React.Fragment>
        )}
        {!active && (
          <React.Fragment>
            <Form.Label className="text-left-page">
              {constants.MSG_ERROR_012}
            </Form.Label>
          </React.Fragment>
        )}
        {!deadline && (
          <React.Fragment>
            <Form.Label className="text-left-page">
              {constants.MSG_ERROR_011}
            </Form.Label>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default MenuTimeOrderComponent;
