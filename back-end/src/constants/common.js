// define constants
const constants = {};

// list type image
constants.listTypeImage = [
    'image/jpeg',
    'image/png',
    'image/jpg'
]

// check number only
constants.notNumber = /^\D*$/;

// check special chart
constants.notSpecialChart = /^[^!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]*$/;

// pattern date
constants.patternDate = "DD/MM/YYYY HH:mm:ss";

// pattern date
constants.patternDay = "DD/MM/YYYY";

// check number
constants.isNumber = /^\d*$/;

export default constants;