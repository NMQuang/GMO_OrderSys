import common from '../common/common';
import message from '../constants/message';
import MessageResponse from '../common/MessageResponse';
import handleError from './handleError';
import security from '../auth/security';
import jwtUtil from '../utils/jwtUtil';
import auth from '../config/auth';
import usersService from '../services/usersService';
// handle authentication
const handleAuth = {};

/**
 * authorization
 * @param {} req
 * @param {} res
 * @param {} next
 */
handleAuth.authorization = async(req, res, next) => {

    // get original url
    const urlOri = req.originalUrl;
    var url = urlOri;

    // split url if url contain a numeric
    if (common.checkContain(urlOri)) {
        url = common.splitString(urlOri, '/');
    }

    /**
     * authentication url
     * if true: don't need to authenticate url
     * if false: must authentication url
     */
    if (security.authenticationUrl.includes(url)) {
        next();
    } else {
        const accessToken = req.headers['x-access-token'];

        try {
            if (!accessToken) {

                // handle error authentication when don't have token
                let messageResponse = new MessageResponse(['token'], message.MSG_AUTH_1);
                handleError.exceptionAuthentication(messageResponse, next);
            } else {
                // verify access token
                const decoded = await jwtUtil.verifyToken(accessToken, auth.secretToken);
                // check access token expired or not
                if (decoded.exp * 1000 <= Date.now()) {

                    // handle error authentication when toke is expired
                    let messageResponse = new MessageResponse(['token'], message.MSG_AUTH_4);
                    handleError.exceptionAuthentication(messageResponse, next);
                } else if (decoded.user[0].role === 'User' && !security.urlForUser.includes(url)) {
                    // handle error authentication when user access url for admin
                    let messageResponse = new MessageResponse(['token'], message.MSG_AUTH_6);
                    handleError.exceptionAuthentication(messageResponse, next);
                } else {
                    // set user and access token for request
                    req.accessToken = accessToken;
                    req.user = decoded.user[0];
                    // check exist user token
                    usersService.checkUserExist(req.user.code).then(user => {
                        if (user.length <= 0) {
                            let messageResponse = new MessageResponse(['token'], message.MSG_AUTH_5);
                            handleError.exceptionAuthentication(messageResponse, next);
                        } else {
                            // go to middleware
                            next();
                        }
                    });
                }
            }
        } catch (error) {
            // handle error system
            handleError.exceptionSystem(error, next);
        }
    }
};

export default handleAuth;