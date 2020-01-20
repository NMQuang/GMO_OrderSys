import {
    body
} from "express-validator";
import common from "../common/common";
import message from "../constants/message";
import validatorUtil from "../utils/validatorUtil";
import ordersService from "../services/ordersService";
const orderValidator = {};


// check validate of model: order
orderValidator.validate = [

    //check validate menuid
    body('menuId')
    .custom(value => {
        return ordersService.validTimeMenu(value).then(val => {
            if (val < 1) {
                return Promise.reject(common.parseMessage(message.MSG_ERROR_11, ['order']));
            }
        });

    })
    .custom(value => {
        return ordersService.checkStatusMenu(value).then(status => {
            if (status !== 1) {
                return Promise.reject(common.parseMessage(message.MSG_ERROR_11, ['order']));
            }
        })
    }),

    // middleware validate
    validatorUtil.validate
]
export default orderValidator;