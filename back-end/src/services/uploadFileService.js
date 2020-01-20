import multer from 'multer';
import common from '../common/common';
import message from "../constants/message"
import handleError from '../handlers/handleError';
import MessageResponse from '../common/MessageResponse';

const uploadFileService = {};

// size limit for file image
const limitSize = 2;

var error = [];

// check validate create file name
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        cb(null, common.createFileName(file.mimetype));
    }
});

// check validate for type file
const fileFilter = (req, file, next) => {
    error = [];
    if (!common.checkValidTypeFile(file.mimetype)) {
        error.push(new MessageResponse("file", common.parseMessage(message.MSG_ERROR_20)));
    }
    next(null, true);
};

// check validate file size
const upload = multer({
    storage: storage,
    limits: {
        file: 1,
        fileSize: 1024 * 1024 * limitSize
    },
    fileFilter: fileFilter
}).single('image');

// check validate upload file
uploadFileService.uploadFile = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            error.push(new MessageResponse("file", common.parseMessage(message.MSG_ERROR_17)));
        }
        if (error.length > 0) {
            handleError.exceptionValidateCustom(error, next);
            error = [];
        }
        next();
    });
};

// check file upload
uploadFileService.checkFileUpload = async (req, res, next) => {
    const {
        file
    } = req;
    if (typeof file === 'undefined') {
        error.push(new MessageResponse("file", common.parseMessage(message.MSG_ERROR_3, ['file'])));
        handleError.exceptionValidateCustom(error, next);
    } else {
        next();
    }
}

export default uploadFileService;