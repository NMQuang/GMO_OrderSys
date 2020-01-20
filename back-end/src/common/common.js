import handleError from "../handlers/handleError";
import handleSuccess from "../handlers/handleSuccess";
import moment from "moment";
import config from "config";
import security from "../auth/security";
import fs from "fs";
import message from "../constants/message";
import momentTimeZone from "moment"
import constants from "../constants/common";
import MessageResponse from "./MessageResponse";

var common = {};

/**
 * parse message with dynamic param
 * @param {String} message
 * @param {String[]} param
 * @return {String} parsed message
 */
common.parseMessage = (message, param) => {
    if (message === undefined || message === null || message.indexOf("%p") < 0) {
        return message;
    }
    let i = 0;
    return message.replace(/%p/g, () => param[i++]);
};

/**
 * searches a string for a specified value, or a regular expression, and returns a new string where the specified values are replaced.
 * @param {String} str
 * @param {String} subStr
 * @param {String} newSubstr
 * @return {String} new string
 */
common.replace = (str, subStr, newSubstr) => {
    return str.replace(subStr, newSubstr);
}

/**
 * split a string
 * @param {String} url
 * @param {String} op
 * @return {String} splited string
 */
common.splitString = (url, op) => url.substring(0, url.lastIndexOf(op));

/**
 * check a string contain numeric or not
 * @param {String} str
 * @return {Boolean}
 */
common.checkContain = str => /\d/.test(str);

/**
 * split a string
 * @param {String} url
 * @param {String} op
 * @return {String} splited string
 */
common.splitString = (url, op) => url.substring(0, url.lastIndexOf(op));

/**
 * check a string contain numeric or not
 * @param {String} str
 * @return {Boolean}
 */
common.checkContain = str => /\d/.test(str);

/**
 * handle process data
 * @param {MessageResponse} messageResponse
 * @param {} req
 * @param {} res
 * @param {} next
 * @param {function} callback
 */
common.processData = async (messageResponse, req, res, next, status, callback) => {
    try {
        // handle callback: process data
        const result = await callback();
        if (result || result > 0) {
            // handle when successful
            handleSuccess.processSuccess(result, messageResponse, req, res, status);
        } else {
            // handle error when data not found
            handleError.exceptionNotFound(next);
        }
    } catch (error) {
        if (req.originalUrl === "/product/create" ||
            req.originalUrl === "product/edit") {
            fs.unlinkSync(req.file.path);
        }
        // handle error system
        handleError.exceptionSystem(error, next);
    }
};

/**
 * copy value from object: inputObj to another object: outputObj
 * @param {Object} inputObj
 * @param {Object} outputObj
 * @param {String} param: option
 * @return {Object} outputObj
 */
common.copyValueObject = (inputObj, outputObj, param) => {
    if (typeof param === "undefined") {
        let listColumn = Object.keys(outputObj);
        Object.keys(inputObj).forEach(key => {
            if (listColumn.includes(key)) {
                outputObj[key] = inputObj[key];
            }
        });
    } else {
        outputObj = {
            ...inputObj,
            param
        };
    }
    return outputObj;
};

/**
 * copy value from list to another list
 * @param {List} inputList
 * @param {Object} outputObj
 * @return {List} new list
 */
common.copyValueList = (inputList, outputObj) => {
    let result = [];
    inputList.forEach(obj => {
        result.push(common.copyValueObject(obj, outputObj));
    });
    return result;
};

/**
 * convert timestamp to date with pattern
 * @param {value}
 * @param {pattern} pattern convert
 * @return {} value formart
 */
common.convertTimestampToDate = (value, pattern) => {
    return moment(value * 1000).format(pattern);
};

/**
 * convert data to Array
 * @param {field } new field
 * @param {data}
 * @return {} Array int
 */
common.convertResultData = (field, data) => {
    let list = [];
    data.forEach(element => {
        list.push(element.dataValues[field]);
    });
    return list;
};

/**
 * create file name
 * @param {file}
 */
common.createFileName = typeFile => {
    let date = new Date();
    if (!common.checkValidTypeFile(typeFile)) {
        return null;
    }
    return date.getDate() + '_' + date.getMonth() + '_' + date.getFullYear() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + typeFile.split('/')[1];

}

/**
 * read file json using config
 * @param {String} param
 * @return {Object}
 */
common.readFileJson = param => config.get(param);

/**
 * check code of admin
 * @param {String} code
 * @return {Boolean} true: code is admin; false: code is user
 */
common.checkCodeAdmin = code => security.codeAdmin.includes(code);

/**
 * check date exist
 * @param {field } name error result 
 * @param {value} value need check
 * @param {pattern} 
 * @return {} return error if valid
 */
common.checkValidDate = (field, value, pattern) => {
    value = common.convertTimestampToDate(value, pattern);
    // check date exist
    if (value && !moment(value, pattern, true).isValid()) {
        throw new Error(common.parseMessage(message.MSG_ERROR_12, [field]));
    } else {
        return true;
    }

}

/**
 * validate check value > current day
 * @param {field } name error result 
 * @param {value} value need check
 * @param {pattern} 
 * @return {} return error if valid
 */
common.checkValidDateBefore = (field, value, pattern) => {

    value = common.convertTimestampToDate(value, pattern);
    // get date now GMT +7
    const now = momentTimeZone.tz("Asia/BangKok");

    // check date with date now
    if (moment(value, pattern) <= now) {
        throw new Error(common.parseMessage(message.MSG_ERROR_13, [field]));
    } else {
        return true;
    }
}

/**
 * validate date from and date to
 * @param {fieldFrom }
 * @param {fieldTo }
 * @param {valueTo} 
 * @param {valueFrom} 
 * @param {pattern} 
 * @return {} return error if valueof(valueTo) < valueof(valueFrom)
 */
common.checkValidFromTo = (fieldFrom, fieldTo, valueTo, valueFrom, pattern) => {

    // convert pattern date
    valueTo = common.convertTimestampToDate(valueTo, pattern);
    valueFrom = common.convertTimestampToDate(valueFrom, pattern);

    // check value from and value to
    if (moment(valueTo, pattern) <= moment(valueFrom, pattern)) {
        throw new Error(common.parseMessage(message.MSG_ERROR_14, [fieldTo, fieldFrom]));
    } else {
        return true;
    }
}

/**
 * validate check file type
 * @param {} mimetype
 * @return {} return error if valid
 */
common.checkValidTypeFile = (mimetype) => {
    if (!constants.listTypeImage.includes(mimetype)) {
        return false;
    }
    return true;
}

export default common;