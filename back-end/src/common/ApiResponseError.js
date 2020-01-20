class ApiResponseError {

    constructor(message, result_code, error, data = []) {
        this.message = message;
        this.result_code = result_code;
        this.error = error;
        this.data = data;
    }
}

export default ApiResponseError;