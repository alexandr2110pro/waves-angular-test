import { HTTP_ERROR_CODES } from './http-error-codes';


export const HTTP_ERROR_MESSAGES = {
  [HTTP_ERROR_CODES.BAD_REQUEST]: 'Bad Request',
  [HTTP_ERROR_CODES.UNAUTHORIZED]: 'Please, authorize.',
  [HTTP_ERROR_CODES.FORBIDDEN]: 'You are not allowed to request this information',
  [HTTP_ERROR_CODES.NOT_FOUND]: 'Can not find requested data',
  [HTTP_ERROR_CODES.UNPROCESSABLE_ENTITY]: 'Can\'t process the request',
  [HTTP_ERROR_CODES.TOO_MANY_REQUESTS]: 'Too many requests. Please, try again later',
  [HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR]: 'Something went wrong on the server. Please, try again later',
  DEFAULT_MESSAGE: 'Unknown Error',
};
