import React, { Component } from "react";
import MenuOrderComponent from "./MenuOrderComponent";
import commonUtil from "../../utils/commonUtil";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
/**
 * MenuAdminComponent
 */
class MenuAdminComponent extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * function sort Array
   * @param {array} list
   */
  sortArray(list) {
    let listArray = [];
    let minValue = "";
    let index = "";
    let listTemp = [];
    let listIndexSort = [];
    //Loop to push value convert valid_from from list menu to listTemp
    for (let i = 0; i < list.length; i++) {
      listTemp.push(new Date(list[i].valid_from).getTime());
    }
    //Loop to sort list Temp
    for (let i = 0; i < listTemp.length; i++) {
      minValue = Math.min(...listTemp.map(item => item));
      for (let j = 0; j < listTemp.length; j++) {
        //Check min value of list, push from min to max into array
        if (minValue === listTemp[j]) {
          index = j;
          listArray.push(minValue);
          listTemp = listTemp.filter((_, i) => i !== index);
          i = -1;
          j = -1;
        }
      }
    }
    //Loop to get index of list
    for (let i = 0; i < listArray.length; i++) {
      for (let j = 0; j < list.length; j++) {
        if (listArray[i] === new Date(list[j].valid_from).getTime()) {
          listIndexSort.push(j);
        }
      }
    }
    //Rely on the index to push into the array in order
    for (let i = 0; i < listIndexSort.length; i++) {
      listTemp.push(list[listIndexSort[i]]);
    }
    return listTemp;
  }
  /**
   * render
   */
  render() {
    const { listMenu } = this.props;
    let listMenuRender = [];
    let numberMenuShow = 6;
    //check exist list menu
    if (listMenu.length) {
      // get menu today
      let menuToday = commonUtil.checkMenuToday(listMenu);

      let showCountMenu = 6;
      let listTempLeft = [];
      let listTempRight = [];
      let listSort = this.sortArray(listMenu);
      //check list menu < count menu need show
      if (listSort.length < showCountMenu) {
        listSort = listMenu;
      } else {
        //Loop Get list right > menu today and get list left < menu today of list menu
        for (let i = 0; i < listSort.length; i++) {
          //check menu >menu today and push into list menu right else list menu left
          if (listSort[i].valid_from >= menuToday) {
            listTempRight.push(listSort[i]);
          } else {
            listTempLeft.push(listSort[i]);
          }
        }
        //check if list menu right < count menu show
        if (listTempRight.length <= showCountMenu) {
          //The number to be need from the list on the left
          let count = showCountMenu - listTempRight.length;
          //check count menu left > count
          if (listTempLeft.length > count) {
            let countLength = listTempLeft.length - 1;
            listSort = [];

            //The loop pushes values lower than today's menu into the list array
            for (let i = 0; i < count; i++) {
              listSort.push(listTempLeft[countLength - i]);
            }
            //The loop pushes values ​​higher than today's menu into the list array
            for (let i = 0; i < listTempRight.length; i++) {
              listSort.push(listTempRight[i]);
            }
          }
          listSort = this.sortArray(listSort);
        } else {
          listSort = [];
          // reorder list sorted
          for (let i = 0; i < showCountMenu; i++) {
            listSort.push(listTempRight[i]);
          }
        }
      }
      //Loop render product
      for (let i = 0; i < listSort.length; i++) {
        let ele = listSort[i];
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

            listMenuRender.push(
              <MenuOrderComponent
                key={i}
                id={menuToday.id}
                name={menuToday.name}
                createdAt={menuToday.created_at_str}
                validFrom={menuToday.valid_from_str}
                validTo={menuToday.valid_to_str}
                product={menuToday.product}
                flag={true}
                colStyle="4"
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

            listMenuRender.push(
              <MenuOrderComponent
                key={i}
                id={ele.id}
                name={ele.name}
                createdAt={ele.created_at_str}
                validFrom={ele.valid_from_str}
                validTo={ele.valid_to_str}
                product={ele.product}
                flag={false}
                colStyle="4"
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

          listMenuRender.push(
            <MenuOrderComponent
              key={i}
              id={ele.id}
              name={ele.name}
              createdAt={ele.created_at_str}
              validFrom={ele.valid_from_str}
              validTo={ele.valid_to_str}
              product={ele.product}
              flag={false}
              colStyle="4"
            />
          );
        }
      }
    }
    return (
      <div className="list-menu">
        <div className="show-all-menu">
          <Link
            to={{
              pathname: "/menu/list",
              state: {
                listMenu: {
                  listMenu
                }
              }
            }}
          >
            <i className="far fa-list-alt icon-list"> </i>
            Xem tất cả
          </Link>
        </div>
        <div className="row limit-height"> {listMenuRender} </div>
      </div>
    );
  }
}

export default MenuAdminComponent;
