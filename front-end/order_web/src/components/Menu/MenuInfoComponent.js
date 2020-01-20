import React, { Component } from "react";
import { Card, Badge, Image } from "react-bootstrap";
import logo from "../../../public/images/food.jpg";
import commonUtil from "../../utils/commonUtil";

/**
 * Menu info component
 */
class MenuInfoComponent extends Component {
  render() {
    const { menuToday, styleOrder } = this.props;
    let validFrom = "";
    let validTo = "";
    let menuTodayName = "";
    let countProduct = 0;
    let timeNow = new Date().toLocaleString();
    if (menuToday) {
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
      <div className="">
        <Card
          border="secondary"
          className="flex-row flex-wrap mb-2 pos-relative cs-pt card-main-order"
        >
          <div className="card-horizontal">
            <Image src={logo} className="card-img" rounded />
            <Card.Body className="text-left">
              <div className="row">
                <div className="col-md-9 col-sm-12 col-xl-12 menu-user-info">
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
      </div>
    );
  }
}

export default MenuInfoComponent;
