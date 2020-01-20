import common from '../common/common';
import message from '../constants/message';
import ApiResponseError from '../common/ApiResponseError';
import MessageResponse from '../common/MessageResponse';
import resultCode from '../constants/resultCode';
import status from '../constants/status';

// handle error
const handleError = {};

/**
 * handle error when data not found
 * @param {} next
 * @return {} next to middeware
 */
handleError.exceptionNotFound = (next) => {
    let error = {};
    error.result_code = resultCode.CODE_ERROR_NOTFOUND;
    next(error);
};

/**
 * handle error when password wrong
 * @param {} next
 * @return {} next to middeware
 */
handleError.exceptionPasswordWrong = (next) => {
    let error = {};
    error.result_code = resultCode.CODE_ERROR_PASSWORD;
    next(error);
}

handleError.exceptionNotExist = (messageResponse, next) => {
    let error = {};
    error.result_code = resultCode.CODE_ERROR_NOTEXIST;
    error.err = messageResponse;
    next(error);
}

/**
 * handle error system
 * @param {} error
 * @param {} next
 * @return {} next to middeware
 */
handleError.exceptionSystem = (error, next) => {
    if (error.name === 'SequelizeDatabaseError') {
        error.result_code = resultCode.CODE_ERROR_SQL;
    } else if (error.name === 'JsonWebTokenError') {
        error.result_code = resultCode.CODE_ERROR_TOKEN;
    } else {
        error.result_code = resultCode.CODE_ERROR;
    }
    next(error);
};

/**
 * handle error service
 * @param {} error
 * @param {} next
 * @return {} next to middleware
 */
handleError.exceptionErrorService = (error, next) => {
    if (error.name === 'SequelizeDatabaseError') {
        error.result_code = resultCode.CODE_ERROR_SQL;
    } else if (error.name === 'JsonWebTokenError') {
        error.result_code = resultCode.CODE_ERROR_TOKEN;
    } else {
        error.result_code = resultCode.CODE_ERROR_SERVICE;
    }
    next(error);
}

/**
 * handle error validate
 * @param {} error
 * @param {} next
 * @return {} next to middeware
 */
handleError.exceptionValidate = (error, next) => {
    error.result_code = resultCode.CODE_ERROR_VALIDATE;
    next(error);
}

/**
 * handle error token
 * @param {MessageResponse} message
 * @param {} next
 * @return {} next to middeware
 */
handleError.exceptionAuthentication = (message, next) => {
    let error = {};
    error.message = message;
    error.result_code = resultCode.CODE_ERROR_AUTHENTICATION;
    next(error);
}

/**
 * handle error insert duplicate data
 * @param {MessageResponse} message
 * @param {} next
 * @return {} next to middeware
 */
handleError.exceptionDuplicate = (message, next) => {
    let error = {};
    error.message = message;
    error.result_code = resultCode.CODE_ERROR_DUP;
    next(error);
}

/** 
 * handle error login
 * @param {MessageResponse} message
 * @param {} next
 * @return {} next to middeware
 */
handleError.exceptionLogin = (next) => {
    let error = {};
    error.result_code = resultCode.CODE_ERROR_LOGIN;
    next(error);
}

/** 
 * handle error validate
 * @param {MessageResponse} message
 * @param {} next
 * @return {} next to middeware
 */
handleError.exceptionValidateCustom = (error, next) => {
    error.result_code = resultCode.CODE_ERROR_VALIDATE_CUSTOM
    next(error);
}

/**
 * handle message error
 * @param {} error
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {ApiResponseError} a message error
 */
handleError.processError = (error, req, res, next) => {
    var responseError = new ApiResponseError();
    // control result code of error
    switch (error.result_code) {

        // error system
        case resultCode.CODE_ERROR: {
            responseError.message = common.parseMessage(message.MSG_ERROR_5, ['error']);
            responseError.result_code = resultCode.CODE_ERROR;
            let err = new MessageResponse(error.name, error.message);
            responseError.error = [err];
            res.status(status.STT_ERROR_SERVER);
            break;
        }

        // error token
        case resultCode.CODE_ERROR_TOKEN: {
            responseError.message = common.parseMessage(message.MSG_AUTH_2, ['token']);
            responseError.result_code = resultCode.CODE_ERROR_TOKEN;
            let err = new MessageResponse(error.name, error.message);
            responseError.error = err;
            res.status(status.STT_ERROR_AUTH);
            break;
        }

        // error sql query
        case resultCode.CODE_ERROR_SQL: {
            responseError.message = common.parseMessage(message.MSG_ERROR_5, ['error']);
            responseError.result_code = resultCode.CODE_ERROR;
            let err = new MessageResponse(error.name, error.original.sqlMessage);
            responseError.error = err;
            res.status(status.STT_ERROR_BAD);
            break;
        }

        // error validate
        case resultCode.CODE_ERROR_VALIDATE: {
            responseError.message = common.parseMessage(message.MSG_ERROR_22, ['']);
            responseError.result_code = resultCode.CODE_ERROR_VALIDATE;
            let err = error.errors.map(err => {
                return new MessageResponse(err.param, err.msg);
            });
            responseError.error = err;
            res.status(status.STT_ERROR_AUTH);
            break;
        }
        // error data not found 
        case resultCode.CODE_ERROR_NOTFOUND: {
            responseError.message = common.parseMessage(message.MSG_ERROR_6, ['']);
            responseError.result_code = resultCode.CODE_ERROR_NOTFOUND;
            responseError.error = [];
            res.status(status.STT_ERROR_NOTFOUND);
            break;
        }
        // error data not exist 
        case resultCode.CODE_ERROR_NOTEXIST: {
            responseError.message = common.parseMessage(message.MSG_ERROR_6, ['']);
            responseError.result_code = resultCode.CODE_ERROR_NOTEXIST;
            responseError.error = [error.err];
            res.status(status.STT_ERROR_NOTFOUND);
            break;
        }

        // error authentication
        case resultCode.CODE_ERROR_AUTHENTICATION: {
            responseError.message = common.parseMessage(error.message.msg, error.message.param);
            responseError.result_code = error.result_code;
            responseError.error = [];
            res.status(status.STT_ERROR_AUTH);
            break;
        }
        // error duplicate data
        case resultCode.CODE_ERROR_DUP: {
            responseError.message = common.parseMessage(error.message.msg, ['']);
            responseError.result_code = error.result_code;
            responseError.error = [new MessageResponse(error.message.param, common.parseMessage(error.message.msg, ['']))];
            res.status(status.STT_ERROR_CONFLICT);
            break;
        }

        //error login 
        case resultCode.CODE_ERROR_LOGIN: {
            responseError.message = common.parseMessage(message.MSG_FAILED_5, ['']);
            responseError.result_code = error.result_code;
            responseError.error = [];
            res.status(status.STT_ERROR_NOTFOUND);
            break;
        }

        // error service
        case resultCode.CODE_ERROR_SERVICE: {
            responseError.message = common.parseMessage(message.MSG_ERROR_16, ['error']);
            responseError.result_code = resultCode.CODE_ERROR_SERVICE;
            let err = new MessageResponse(error.param, error.msg);
            responseError.error = [err];
            res.status(status.STT_ERROR_AUTH);
            break;
        }



        // error validate
        case resultCode.CODE_ERROR_VALIDATE_CUSTOM: {
            responseError.message = common.parseMessage(message.MSG_ERROR_5, ['error']);
            responseError.result_code = resultCode.CODE_ERROR_VALIDATE;
            let err = error.map(err => {
                return new MessageResponse(err.param, err.msg);
            });
            responseError.error = error;
            res.status(status.STT_ERROR_AUTH);
            return res.json(responseError);
        }
        // error wrong password
        case resultCode.CODE_ERROR_PASSWORD: {
            responseError.message = common.parseMessage(message.MSG_ERROR_23, ['']);
            responseError.result_code = resultCode.CODE_ERROR_PASSWORD;
            responseError.error = [];
            res.status(status.STT_ERROR_CONFLICT);
            break;
        }
        default: {
            responseError.message = error;
            break;
        }
    }
    return res.json(responseError);
}

export default handleError;