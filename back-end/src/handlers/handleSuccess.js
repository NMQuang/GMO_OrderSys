import common from '../common/common';
import MessageResponse from '../common/MessageResponse';
import resultCode from '../constants/resultCode';
import status from '../constants/status';
import ApiResponseSuccess from '../common/ApiResponseSuccess';

// handle success
const handleSuccess = {};

/**
 * handle when process is successful
 * @param {Object} data
 * @param {MessageResponse} info message
 * @param {} req
 * @param {} res
 * @return {ApiResponseSuccess} 
 */
handleSuccess.processSuccess = (data, messageResponse, req, res, status) => {
    const responseSuccess = new ApiResponseSuccess();
    responseSuccess.data = data;
    responseSuccess.result_code = resultCode.CODE_SUCCESS;
    responseSuccess.message = common.parseMessage(messageResponse.msg, [messageResponse.param]);
    res.status(status);
    return res.json(responseSuccess);
}

export default handleSuccess;