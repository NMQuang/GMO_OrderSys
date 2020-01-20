import {
    body
} from "express-validator";
import common from "../common/common";
import constants from "../constants/common";
import message from "../constants/message";
import validatorUtil from "../utils/validatorUtil";
import usersService from "../services/usersService";

// define validate of use
const usersValidator = {};

// check validate of model: user
usersValidator.validateCreate = [

    //check validate of code
    body('code')
    .not().isEmpty().withMessage(common.parseMessage(message.MSG_ERROR_3, ['code']))
    .isLength({
        min: 1,
        max: 255
    }).withMessage(common.parseMessage(message.MSG_ERROR_8, ['code', '1', '255']))
    .isNumeric().withMessage(common.parseMessage(message.MSG_ERROR_1, ['code']))
    // check code exist in user master
    .custom(value => {
        /**
         * get flag from file config
         * flag = true: check code exist
         * flag = false: not check code exist
         */
        const flag = common.readFileJson('flag');
        if (flag) {
            return usersService.checkCodeExist(value).then(user => {
                if (user.length <= 0) {
                    return Promise.reject(common.parseMessage(message.MSG_ERROR_15, ['code', value]));
                }
            });
        }
        return value;
    })
    .custom(value => {
        return usersService.checkUserExist(value).then(user => {
            if (user.length > 0) {
                return Promise.reject(common.parseMessage(message.MSG_ERROR_7, ['code', value]));
            }
        });
    }),

    // check validate of password
    body('password')
    .not().isEmpty().withMessage(common.parseMessage(message.MSG_ERROR_3, ['password']))
    .isLength({
        min: 6,
        max: 128
    }).withMessage(common.parseMessage(message.MSG_ERROR_8, ['password', '6', '128']))
    .custom(value => !/\s/.test(value))
    .withMessage(common.parseMessage(message.MSG_ERROR_21, ['password'])),

    // check validate of name
    body('name')
    .not().isEmpty().withMessage(common.parseMessage(message.MSG_ERROR_3, ['name']))
    .matches(constants.notNumber, "i").withMessage(common.parseMessage(message.MSG_ERROR_10, ['name']))
    .matches(constants.notSpecialChart, "i").withMessage(common.parseMessage(message.MSG_ERROR_9, ['name']))
    .isLength({
        min: 1,
        max: 255
    }).withMessage(common.parseMessage(message.MSG_ERROR_8, ['name', '1', '255'])),


    // middleware validate
    validatorUtil.validate
]

// check validate of model: user when login
usersValidator.validateLogin = [

    //check validate of code
    body('code')
    .not().isEmpty().withMessage(common.parseMessage(message.MSG_ERROR_3, ['code']))
    .isNumeric().withMessage(common.parseMessage(message.MSG_ERROR_1, ['code']))
    .matches(constants.notSpecialChart, "i").withMessage(common.parseMessage(message.MSG_ERROR_9, ['code'])),

    // check validate of password
    body('password')
    .not().isEmpty()
    .withMessage(common.parseMessage(message.MSG_ERROR_3, ['password'])),

    // middleware validate
    validatorUtil.validate
]
export default usersValidator;