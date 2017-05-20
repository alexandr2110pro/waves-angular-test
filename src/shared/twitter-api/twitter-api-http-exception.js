import { HTTPException } from 'shared/core/http';


export class TwitterApiHTTPException extends HTTPException {

  name = 'TwitterApiHTTPException';

  _parseResponse(httpStatus, { errors = [] }) {
    if (errors.length === 0) return null;

    const { code, message } = errors[0];
    return { message, code };
  }
}

