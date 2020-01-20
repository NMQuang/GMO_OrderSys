import {
    User
} from '../models/User';
import message from '../constants/message';
import auth from '../config/auth';
import handleError from '../handlers/handleError';
import jwtUtil from '../utils/jwtUtil';
import MessageResponse from '../common/MessageResponse';
import common from '../common/common';
import usersDto from '../dto/usersDto';
import {
    UserMaster
} from '../models/UserMaster';
import roles from '../constants/role';
import status from '../constants/status';
import userSql from '../sql/userSql';
import fs from "fs";
import path from "path";

// create user service
const usersService = {};

/**
 * login user
 * @param {} req
 * @param {} res
 * @return {User}
 */
usersService.login = async (req, res, next) => {
    const {
        code,
        password
    } = req.body;
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = '';
    messageResponse.msg = message.MSG_SUCCESS_6;

    // return res.json(messageResponse)
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async () => {

        const userDto = new usersDto();
        // check info of user when login
        let user = await User.findAll({
            attributes: ['id', 'code', 'password', 'name', 'role', 'avatar'],
            where: {
                code
            }
        });
        // return user;
        if (user.length > 0) {
            // check passowrd
            let valiPassword = await jwtUtil.comparePassword(password, user[0].dataValues.password);
            // create access token for user when login successfully
            if (valiPassword) {
                const payload = {
                    user
                }
                //create access token
                const accessToken = await jwtUtil.signToken(payload, auth.secretToken, {
                    expiresIn: auth.expiresToken
                });

                // create return result when login successful
                const resultObj = common.copyValueObject(user[0].dataValues, userDto);
                //resetting propeties of model: User
                resultObj.accessToken = accessToken;

                return [resultObj];
            } else {
                handleError.exceptionLogin(next);
            }

        } else {
            handleError.exceptionLogin(next);
        }
    });
}

/**
 * create user
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {} a info of user
 */
usersService.register = async (req, res, next) => {

    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = User.name;
    messageResponse.msg = message.MSG_SUCCESS_2;

    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_CREATE, async () => {
        const {
            code,
            password,
            name
        } = req.body;

        // hash password
        const saltRounds = 12;
        const hashPassword = await jwtUtil.hashJwt(password, saltRounds);

        // check role admin of user
        var role = roles.ROLE_USER;
        if (common.checkCodeAdmin(code)) {
            role = roles.ROLE_ADMIN;
        }
        const user = await User.create({
            code,
            password: hashPassword,
            name,
            role
        }, {
            fields: ['code', 'password', 'name', 'role']
        });
        return [new usersDto(null, code, user.name, user.role)];

    });
}

/**
 * checkUserExist
 * @param {} code code user
 * @return {} user
 */
usersService.checkUserExist = async (code) => {
    let user = await User.findAll({
        attributes: ['id', 'code', 'password', 'name'],
        where: {
            code
        }
    });
    return Promise.resolve(user);
}

/**
 * checkCodeExist
 * @param {} code code user
 * @return {} user
 */
usersService.checkCodeExist = async (code) => {
    let user = await UserMaster.findAll({
        attributes: ['id', 'code', 'name'],
        where: {
            code
        }
    });
    return Promise.resolve(user);
}

/**
 * Upload avatar
 *  @param {} req
 * @param {} res
 * @param {} next
 * @return {} a info of user
 */
usersService.uploadAvatar = async (req, res, next) => {
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = User.name;
    messageResponse.msg = message.MSG_SUCCESS_9;
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async () => {
        const {
            file
        } = req;
        const {
            userId
        } = req.body;
        // check userId exits in database
        const checkId = await User.sequelize.query(userSql.checkUserIdExist, {
            replacements: {
                userId
            },
            type: User.sequelize.QueryTypes.SELECT
        });
        // check user exits in database
        if (checkId.length !== 0) {
            return await User.sequelize.transaction(async t => {
                let avatar = "";
                let imageData = checkId[0].avatar ? checkId[0].avatar.substring(
                    checkId[0].avatar.lastIndexOf("/") + 1) : null;

                // compare new image with image in database
                if (typeof file === "undefined") {
                    avatar = null;
                } else {
                    if (imageData) {
                        // delete old image in database
                        const imageName = checkId[0].avatar.substring(
                            checkId[0].avatar.lastIndexOf("/") + 1
                        );
                        const publicPath = path.resolve("public").replace(/\\/g, "/") + "/images/";
                        fs.unlinkSync(publicPath + imageName);
                    }
                    // convert path image
                    avatar =
                        "http://" +
                        req.get("host") +
                        "/images/" + file.filename;
                }
                const upload = await User.sequelize.query(userSql.uploadAvatar, {
                    replacements: {
                        userId,
                        avatar
                    },
                    transaction: t,
                    type: User.sequelize.QueryTypes.UPDATE
                });
                //fetch information user after upload avatar
                if (upload.length > 0) {
                    const result = await User.sequelize.query(
                        userSql.getUserById, {
                            replacements: {
                                userId
                            },
                            transaction: t,
                            type: User.sequelize.QueryTypes.SELECT
                        }
                    );
                    return [new usersDto(result[0].id, result[0].code, result[0].name, result[0].role, null, result[0].avatar)];
                }
            });
        } else {
            handleError.exceptionNotFound(next);
        }
    });
}

/**
 * Change Password
 *  @param {} req
 * @param {} res
 * @param {} next
 * @return {} a info of user
 */
usersService.changePassword = async (req, res, next) => {
    const {
        userId,
        oldPassword,
        newPassword
    } = req.body;
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = '';
    messageResponse.msg = message.MSG_SUCCESS_10;

    // return res.json(messageResponse)
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async (t) => {

        // check info of user when login
        let user = await User.findAll({
            attributes: ['id', 'code', 'password', 'name', 'role', 'avatar'],
            where: {
                id: userId
            },
            transaction: t
        });
        // return user;
        if (user.length > 0) {
            // check passowrd
            let valiPassword = await jwtUtil.comparePassword(oldPassword, user[0].dataValues.password);
            // create access token for user when login successfully
            if (valiPassword) {
                // hash password
                const saltRounds = 12;
                const hashPassword = await jwtUtil.hashJwt(newPassword, saltRounds);

                const changePass = await User.sequelize.query(userSql.changePassword, {
                    replacements: {
                        userId,
                        hashPassword
                    },
                    transaction: t,
                    type: User.sequelize.QueryTypes.UPDATE
                });
                if (changePass.length > 0) {
                    const result = await User.sequelize.query(
                        userSql.getUserById, {
                            replacements: {
                                userId
                            },
                            transaction: t,
                            type: User.sequelize.QueryTypes.SELECT
                        }
                    );
                    return [new usersDto(result[0].id, result[0].code, result[0].name, result[0].role, null, result[0].avatar)];
                }
            } else {
                handleError.exceptionPasswordWrong(next);
            }

        } else {
            handleError.exceptionNotFound(next);
        }
    });
}

export default usersService;