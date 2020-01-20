import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import constant from "../../constants/constant";
import logo from "../../../public/images/logo-03.jpg";
import commonUtil from "../../utils/commonUtil";
/**
 * Menu Item Component
 */
class MenuOrderComponent extends Component {
  /**
   * Constructor
   * @param {} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * render
   */
  render() {
    const {
      id,
      name,
      flag,
      validFrom,
      validTo,
      product,
      colStyle
    } = this.props;
    const cssStyle =
      "col-xl-" +
      colStyle +
      " col-lg-" +
      colStyle +
      " col-md-" +
      colStyle +
      " col-sm-" +
      colStyle +
      " col-xs-6 fix-margin";
    return (
      <div className={cssStyle}>
        <Card
          border={constant.TYPE_SECONDARY}
          className="text-left card-hover pos-relative"
        >
          <Link
            to={"/menu/detail/" + id}
            className="pos-absolute"
            style={{ width: "100%", height: "100%" }}
          />
          {flag && (
            <Badge className="badge-choice pos-absolute" variant="success">
              <i className="far fa-badge-check"></i>
            </Badge>
          )}

          <Card.Img variant="top" src={logo} />
          <Card.Body className="info-menu">
            <Card.Title className="card-title">
              <span className="time-span">
                <i className="fa fa-fw fa-calendar"></i>
              </span>
              Ngày {name}
            </Card.Title>
            <Card.Text>
              <span className="time-span">
                <i className="fa fa-fw fa-calculator"></i>
              </span>
              {product} sản phẩm
            </Card.Text>
            <Card.Text>
              <span className="time-span">
                <i className="fa fa-fw fa-clock"></i>
              </span>
              {commonUtil.parseTime(validFrom)} ~{commonUtil.parseTime(validTo)}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default MenuOrderComponent;
