import React, { Component } from "react";
import MenuOrderComponent from "../../components/Menu/MenuOrderComponent";
import commonUtil from "../../utils/commonUtil";
import { Container, Jumbotron, Row } from "react-bootstrap";
/**
 * List Menu Page
 */
class MenuListAllPage extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * render
   */
  render() {
    const { listMenu } = this.props.listMenu.location.state.listMenu;
    let listAllMenuRender = [];
    if (listMenu.length) {
      // get menu today
      let menuToday = commonUtil.checkMenuToday(listMenu);
      for (let i = 0; i < listMenu.length; i++) {
        let ele = listMenu[i];
        // if have menu is today
        if (menuToday) {
          if (menuToday.id === ele.id) {
            menuToday.name = commonUtil
              .addHourToDateString(menuToday.valid_from, -7)
              .toLocaleDateString();
            menuToday.created_at_str = commonUtil
              .addHourToDateString(menuToday.created_at, -7)
              .toLocaleString();
            menuToday.valid_from_str = commonUtil
              .addHourToDateString(menuToday.valid_from, -7)
              .toLocaleTimeString();
            menuToday.valid_to_str = commonUtil
              .addHourToDateString(menuToday.valid_to, -7)
              .toLocaleTimeString();

            listAllMenuRender.push(
              <MenuOrderComponent
                key={i}
                id={menuToday.id}
                name={menuToday.name}
                createdAt={menuToday.created_at_str}
                validFrom={menuToday.valid_from_str}
                validTo={menuToday.valid_to_str}
                product={menuToday.product}
                flag={true}
                colStyle="3"
              />
            );
          } else {
            ele.name = commonUtil
              .addHourToDateString(ele.valid_from, -7)
              .toLocaleDateString();
            ele.created_at_str = commonUtil
              .addHourToDateString(ele.created_at, -7)
              .toLocaleString();
            ele.valid_from_str = commonUtil
              .addHourToDateString(ele.valid_from, -7)
              .toLocaleTimeString();
            ele.valid_to_str = commonUtil
              .addHourToDateString(ele.valid_to, -7)
              .toLocaleTimeString();

            listAllMenuRender.push(
              <MenuOrderComponent
                key={i}
                id={ele.id}
                name={ele.name}
                createdAt={ele.created_at_str}
                validFrom={ele.valid_from_str}
                validTo={ele.valid_to_str}
                product={ele.product}
                flag={false}
                colStyle="3"
              />
            );
          }
        } else {
          ele.name = commonUtil
            .addHourToDateString(ele.valid_from, -7)
            .toLocaleDateString();
          ele.created_at_str = commonUtil
            .addHourToDateString(ele.created_at, -7)
            .toLocaleString();
          ele.valid_from_str = commonUtil
            .addHourToDateString(ele.valid_from, -7)
            .toLocaleTimeString();
          ele.valid_to_str = commonUtil
            .addHourToDateString(ele.valid_to, -7)
            .toLocaleTimeString();

          listAllMenuRender.push(
            <MenuOrderComponent
              key={i}
              id={ele.id}
              name={ele.name}
              createdAt={ele.created_at_str}
              validFrom={ele.valid_from_str}
              validTo={ele.valid_to_str}
              product={ele.product}
              flag={false}
              colStyle="3"
            />
          );
        }
      }
    }
    return (
      <div className="over-flow-auto">
        <Container>
          <Row className="header-res-collection">
            <h1 className="title">Danh sách thực đơn</h1>
          </Row>
          <Jumbotron>
            <div className="row">{listAllMenuRender}</div>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default MenuListAllPage;
