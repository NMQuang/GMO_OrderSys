import React, { Component } from "react";
import { Card, Badge, Image } from "react-bootstrap";
import logo from "../../../public/images/logo-03.jpg";
import commonUtil from "../../utils/commonUtil";
import { Link } from "react-router-dom";
/**
 * Menu User Component
 */
class MenuUserComponent extends Component {
  /**
   * Contructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = { timeNow: new Date().toLocaleString(), flag: true };
  }
  /**
   * Component did mount
   */
  componentDidMount() {
    const { menuToday } = this.props;
    let now = new Date().getTime();
    let timeValidTo = "";
    let timeValidFrom = "";
    /**
     * If exist menu set flag show menu : true
     */
    if (menuToday.id) {
      timeValidTo = commonUtil
        .addHourToDateString(menuToday.valid_to, -7)
        .getTime();
      timeValidFrom = commonUtil
        .addHourToDateString(menuToday.valid_from, -7)
        .getTime();
      /**
       * if time now > time end order, or now < time start order then set flag : false
       */
      if (now > timeValidTo && now < timeValidFrom) {
        this.setState({ flag: false });
      } else {
        this.setState({ flag: true });
      }
    } else {
      this.setState({ flag: false });
    }
  }

  /**
   * render
   */
  render() {
    const { menuToday } = this.props;
    const { timeNow, flag } = this.state;
    let validFrom = "";
    let validTo = "";
    let menuTodayName = "";
    let countProduct = 0;
    /**
     * Check exist menu and get value date
     */
    if (flag) {
      validFrom = commonUtil
        .addHourToDateString(menuToday.valid_from, -7)
        .toLocaleTimeString();
      validTo = commonUtil
        .addHourToDateString(menuToday.valid_to, -7)
        .toLocaleTimeString();
      menuTodayName = commonUtil
        .addHourToDateString(menuToday.valid_from, -7)
        .toLocaleDateString();
      countProduct = menuToday.product;
    }

    let listRate = [];
    /**
     * Loop show Rate
     */
    for (let i = 0; i < 5; i++) {
      listRate.push(<i key={i} className="fa fa-fw fa-star"></i>);
    }
    return (
      <div className="menu-user">
        {flag && (
          <Card
            border="secondary"
            className="flex-row flex-wrap mb-2 pos-relative cs-pt"
            onClick={this.onConfirm}
          >
            <Link
              to={"/menu/detail/" + menuToday.id}
              className="pos-absolute"
              style={{ width: "100%", height: "100%" }}
            />
            <Badge className="badge-choice pos-absolute" variant="success">
              <i className="far fa-badge-check"></i>
            </Badge>
            <div className="card-horizontal">
              <Image src={logo} rounded />
              <Card.Body className="text-left">
                <div className="row">
                  <div className="col menu-user-info">
                    <Card.Title className="title-card-menu-user">
                      TP. HCM {timeNow}
                    </Card.Title>
                    <Card.Text className="menu-text">
                      Thực đơn ngày: {menuTodayName}
                    </Card.Text>
                    <br></br>
                    <Card.Text className="text-menu-user ">
                      <span className="time-span">
                        <i className="fa fa-fw fa-clock"></i>
                      </span>
                      Thời gian: {commonUtil.parseTime(validFrom)} ~
                      {commonUtil.parseTime(validTo)}
                    </Card.Text>
                    <Card.Text className="text-menu-user ">
                      <span className="time-span">
                        <i className="fa fa-fw fa-calculator"></i>
                      </span>
                      Có {countProduct} món ăn
                    </Card.Text>
                    <Card.Text className="text-menu-user">
                      <span className="time-span">
                        <i className="fa fa-fw fa-check"></i>
                      </span>
                      Đánh giá:{listRate}
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </div>
          </Card>
        )}
        {!flag && <p>Menu Comming soon.</p>}
      </div>
    );
  }
}

export default MenuUserComponent;
