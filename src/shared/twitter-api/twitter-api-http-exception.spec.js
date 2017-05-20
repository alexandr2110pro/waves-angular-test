import { TwitterApiHTTPException } from './twitter-api-http-exception';


describe('TwitterApiHTTPException', () => {
  it('should parse twitter error response', () => {

    const exception = new TwitterApiHTTPException(401, {
      errors: [
        { code: 11, message: 'Message' },
      ],
    });

    expect(exception.code).toEqual(11);
    expect(exception.status).toEqual(401);
    expect(exception.message).toEqual('Message');
    expect(exception.name).toEqual('TwitterApiHTTPException');
  });
});
