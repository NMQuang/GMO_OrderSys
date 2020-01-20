import axios from 'axios';
import apiConfig from '../configs/apiConfig';

// define util of api
const apiUtil = {};

/**
 * call api
 * @param {} endpoint
 * @param {} method
 * @param {} body
 * @return {Object} call to axios 
 */
apiUtil.callApi = (endpoint, method = apiConfig.method.METHOD_GET, body, header = apiConfig.header.HEADER_JSON) => {
    return axios({
        method: method,
        url: `${apiConfig.url}/${endpoint}`,
        data: body,
        headers: header
    });
};

export default apiUtil;