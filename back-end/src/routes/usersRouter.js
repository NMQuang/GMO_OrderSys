import express from 'express';
import usersService from '../services/usersService';
import usersValidator from '../validator/usersValidator';
import uploadFileService from '../services/uploadFileService';

const usersRouter = express.Router();

// login user
usersRouter.post('/login', usersValidator.validateLogin, usersService.login);

// register user
usersRouter.post('/register', usersValidator.validateCreate, usersService.register);

// upload avatar user
usersRouter.post('/uploadAvatar', uploadFileService.uploadFile, uploadFileService.checkFileUpload, usersService.uploadAvatar);

// change password user
usersRouter.post('/changePassword', usersService.changePassword);

export default usersRouter;