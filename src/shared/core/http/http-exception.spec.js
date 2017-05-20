import { HTTP_ERROR_CODES } from './http-error-codes';
import { HTTP_ERROR_MESSAGES } from './http-error-messages';
import { HTTPException } from './http-exception';


describe('HTTPException', () => {


  it('should have status property', () => {
    const instance = new HTTPException(HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR);
    expect(instance.status).toEqual(HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR);
  });


  it('should try to parse http response', () => {
    const responseData = {
      message: 'foo',
      code: 52,
    };

    const exception = new HTTPException(HTTP_ERROR_CODES.UNAUTHORIZED, responseData);

    expect(exception.code).toEqual(responseData.code);
    expect(exception.message).toEqual(responseData.message);
  });


  describe('if response could not be parsed', () => {
    let exception;
    let responseData;

    beforeEach(() => {
      responseData = { foo: 'bar' };
      exception    = new HTTPException(HTTP_ERROR_CODES.UNAUTHORIZED, responseData);
    });

    it('should set the provided http status code as code', () => {
      expect(exception.code).toEqual(HTTP_ERROR_CODES.UNAUTHORIZED);
    });

    it('should use HTTP_ERROR_MESSAGES to set the message', () => {
      const expectedMessage = HTTP_ERROR_MESSAGES[HTTP_ERROR_CODES.UNAUTHORIZED];
      expect(exception.message).toEqual(expectedMessage);
    });
  });

});
