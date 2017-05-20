import { AbstractException } from '../exception';
import { HTTP_ERROR_CODES } from './http-error-codes';
import { HTTP_ERROR_MESSAGES } from './http-error-messages';


export class HTTPException extends AbstractException {


  name = 'HTTPException';


  constructor(statusCode = HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR, httpResponse = {}) {
    super(Number(statusCode), httpResponse);
    this.status = statusCode;
  }


  _processExceptionData(statusCode, response) {
    const parsedResponse = this._parseResponse(statusCode, response);
    return parsedResponse || this._standardExceptionData(statusCode);
  }


  _standardExceptionData(code) {
    const message = HTTP_ERROR_MESSAGES[code] || HTTP_ERROR_MESSAGES.DEFAULT_MESSAGE;
    return {
      code,
      message,
    };
  }

  _parseResponse(statusCode, response) {
    const { message, code } = response.error || response;
    return message && code
      ? { message, code }
      : null;
  }


  toObject() {
    return {
      message: this.message,
      name: this.name,
      code: this.code,
      status: this.status,
    };
  }
}
