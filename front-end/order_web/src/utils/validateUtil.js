import constant from "../constants/constant";
import message from "../constants/message";

const validateUtil = {};

/**
 * Check empty
 */
validateUtil.isEmpty = value => {
  if (value.trim().length === 0) {
    return true;
  }
  return false;
}

/**
 * Check number
 */
validateUtil.checkNumber = value => {
  return validateUtil.patternNumber.test(value);
}

/**
 * Check length
 */
validateUtil.checkLength = (value, length) => {
  return value.length === length;
}

/**
 * Check minlength
 */
validateUtil.minLength = (value, min) => {
  return value.length < min;
}

/**
 * Check maxlength
 */
validateUtil.maxLength = (value, max) => {
  return value.length > max;
}

/**
 * Check in range
 */
validateUtil.inRange = (value, min, max) => {
  return value.length < min || value.length > max;
}

/**
 * Check pattern
 */
validateUtil.checkPattern = (value, pattern) => {
  return pattern.test(value);
}

/**
 * File validate
 */
validateUtil.fileValidate = file => {
  let error = [];
  if (file.size > constant.FILE_MAX_SIZE) {
    error.push(message.MSG_ERROR_006);
  }
  if (!file.type.includes("image")) {
    error.push(message.MSG_ERROR_007);
  }
  return error;
}

/**
 * Check value is match to other value
 */
validateUtil.matchOther = (value, otherValue) => {
  return value === otherValue;
}

// Pattern number
validateUtil.patternNumber = /^\d*$/;

// Pattern word only
validateUtil.patternWordOnly = /^\D*$/;

export default validateUtil;
