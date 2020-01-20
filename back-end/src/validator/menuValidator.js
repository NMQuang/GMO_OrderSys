import {
    body
} from "express-validator";
import common from "../common/common";
import constants from "../constants/common";
import validatorUtil from "../utils/validatorUtil";

const menuValidator = {};

// check validate of model: menu
menuValidator.validateCreate = [

    //check validate of validFrom
    body('validFrom').custom(value => {
        return common.checkValidDate('validFrom', value, constants.patternDate);
    }).custom(value => {
        return common.checkValidDateBefore('validFrom', value, constants.patternDate);
    }),

    //check validate of validTo
    body('validTo').custom(value => {
        return common.checkValidDate('validTo', value, constants.patternDate);
    }).custom((value, {
        req
    }) => {
        return common.checkValidFromTo('validFrom', 'validTo', value, req.body.validFrom, constants.patternDate);
    }),

    // middleware validate
    validatorUtil.validate
]

// check validate edit menu
menuValidator.validateEdit = [

    body('validFrom').custom(value => {
        return common.checkValidDate('validFrom', value, constants.patternDate);
    }).custom(value => {
        return common.checkValidDateBefore('validFrom', value, constants.patternDate);
    }),

    // check validate of validTo
    body('validTo').custom(value => {
        return common.checkValidDate('validTo', value, constants.patternDate);
    }).custom(value => {
        return common.checkValidDateBefore('validTo', value, constants.patternDate);
    }).custom((value, {
        req
    }) => {
        return common.checkValidFromTo('validFrom', 'validTo', value, req.body.validFrom, constants.patternDate);
    }),

    //middleware validate
    validatorUtil.validate
]
export default menuValidator;