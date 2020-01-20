import {
    body
} from "express-validator";
import common from "../common/common";
import constants from "../constants/common";
import message from "../constants/message";
import validatorUtil from "../utils/validatorUtil";
import productsService from "../services/productsService";

const productValidator = {};


// check validate of model: product
productValidator.validateEdit = [

    // check validate of code
    body('productId')
    .isNumeric().withMessage(common.parseMessage(message.MSG_ERROR_1, ['productId']))
    .matches(constants.notSpecialChart, "i").withMessage(common.parseMessage(message.MSG_ERROR_9, ['productId'])),

    // check validate of name
    body('name')
    .not().isEmpty().withMessage(common.parseMessage(message.MSG_ERROR_3, ['name']))
    .matches(constants.notNumber, "i").withMessage(common.parseMessage(message.MSG_ERROR_10, ['name']))
    .matches(constants.notSpecialChart, "i").withMessage(common.parseMessage(message.MSG_ERROR_9, ['name']))
    .custom((value, {
        req
    }) => {
        return productsService.checkProductNameExistWithDifferentId(value, req.body.productId).then(product => {
            if (product.length > 0) {
                return Promise.reject(common.parseMessage(message.MSG_ERROR_7, ['name', value]));
            }
        });

    }),

    // check validate of price
    body('price')
    .not().isEmpty().withMessage(common.parseMessage(message.MSG_ERROR_3, ['price']))
    .isNumeric().withMessage(common.parseMessage(message.MSG_ERROR_1, ['price'])),

    // middleware validate
    validatorUtil.validate
]

productValidator.validateCreate = [

    // check validate of name
    body('name')
    .not().isEmpty().withMessage(common.parseMessage(message.MSG_ERROR_3, ['name']))
    .matches(constants.notNumber, "i").withMessage(common.parseMessage(message.MSG_ERROR_10, ['name']))
    .matches(constants.notSpecialChart, "i").withMessage(common.parseMessage(message.MSG_ERROR_9, ['name']))
    .custom(value => {
        return productsService.checkProductNameExist(value).then(product => {
            if (product.length > 0) {
                return Promise.reject(common.parseMessage(message.MSG_ERROR_7, ['name', value]));
            }
        });
    }),

    // check validate of price
    body('price')
    .not().isEmpty().withMessage(common.parseMessage(message.MSG_ERROR_3, ['price']))
    .isNumeric().withMessage(common.parseMessage(message.MSG_ERROR_1, ['price'])),

    // middleware validate
    validatorUtil.validate
]
export default productValidator;