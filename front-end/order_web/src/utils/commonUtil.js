import moment from "moment-timezone";

const commonUtil = {};

/**
 * parse message with dynamic param
 * @param {String} message
 * @param {String[]} param
 * @return {String} parsed message
 */
commonUtil.parseMessage = (message, param) => {
  if (message === undefined || message === null || message.indexOf("%p") < 0) {
    return message;
  }
  let i = 0;
  return message.replace(/%p/g, () => param[i++]);
};
/**
 * Format date is time Asia/Bangkok, format"DD/MM/YYYY HH:mm"
 */
commonUtil.parseDateTime = dateTime => {
  return moment(new Date(dateTime))
    .tz("Asia/Bangkok")
    .utc()
    .format("DD/MM/YYYY HH:mm");
};
/**
 * Format date  "HH:mm:ss" is HH:mm
 */
commonUtil.parseTime = dateTime => {
  return moment(dateTime, "HH:mm:ss").format("HH:mm");
};

/**
 * Format number is money
 * Each 3 number append a comma
 */
commonUtil.formatNumberMoney = num => {
  // remove all comma in num
  num = num.replace(/,/g, "");
  // add comma
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VND";
};

/**
 * create message to show for user from response
 * @param {data} data the data in response from server
 */
commonUtil.getMessageResponse = data => {
  if (!data.error || (data.error && data.error.length === 0)) {
    return data.message;
  } else {
    let error = {
      header: data.message,
      body: null
    };
    let listErr = [];
    data.error.forEach(err => {
      listErr.push(
        <li>
          {" "}
          {err.param}: {err.msg}{" "}
        </li>
      );
    });
    error.body = <ul> {listErr} </ul>;
    return error;
  }
};

/**
 * Add hour to date string
 * @param {String} dateStr
 * @param {Number} hours
 * @return {Date} a new Date
 */
commonUtil.addHourToDateString = (dateStr, hour) => {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + hour);
  return date;
};

/**
 * get menu today
 * @param {List} listData
 * @return {Object} menu
 */
commonUtil.checkMenuToday = listData => {
  let result = {};
  listData.forEach(ele => {
    const date = commonUtil.addHourToDateString(ele.valid_from, -7);
    if (
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      result = ele;
      return false;
    }
  });
  return result;
};

export default commonUtil;
