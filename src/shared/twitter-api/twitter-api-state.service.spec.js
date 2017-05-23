import { TWITTER_API } from './index';


describe('TwitterApiStateService', () => {

  const VALID_TOKEN_VALUE = 'AAAAAAAAAAAAAAAAAAAAAHEF0wAAAAAAvm'
    + 'GrANiZLqPNL7Iq8bsUCon1ZFU%3DBwWZEBciQcPC5jSEvw3j9iarUc'
    + 'DK6YvVSPWqMGhO0t4Ib50sSw';

  const correctAccessToken = {
    access_token: VALID_TOKEN_VALUE,
    token_type: 'bearer',
  };

  /** @type {TwitterApiStateService} */
  let TwitterApiStateService;
  let TWITTER_API_ERRORS;

  beforeEach(() => window.localStorage.clear());

  beforeEach(angular.mock.module(TWITTER_API));

  beforeEach(angular.mock.inject($injector => {
    TwitterApiStateService = $injector.get('TwitterApiStateService');
    TWITTER_API_ERRORS     = $injector.get('TWITTER_API_ERRORS');
  }));

  afterEach(() => window.localStorage.clear());


  describe('#setAccessToken()', () => {

    it('should throw if the token is not valid', () => {
      const badToken   = { wrongValue: 'bad', };
      const expression = () => TwitterApiStateService.setAccessToken(badToken);

      expect(expression).toThrowError(TWITTER_API_ERRORS.INVALID_TOKEN);
    });


    it('should update the state', () => {
      TwitterApiStateService.setAccessToken(correctAccessToken);
      expect(TwitterApiStateService.getAccessToken()).toEqual(correctAccessToken)
    });
  });

  describe('#clearAccessToken()', () => {

    it('should clear the token state', () => {
      TwitterApiStateService.clearAccessToken();

      expect(TwitterApiStateService.getAccessToken()).toEqual(null);
      expect(TwitterApiStateService.isAuthorized()).toEqual(false);
    });
  });


  describe('#isAuthorized()', () => {

    it('should return the authorized state', () => {
      TwitterApiStateService.setAccessToken(correctAccessToken);
      expect(TwitterApiStateService.isAuthorized()).toBe(true);

      TwitterApiStateService.clearAccessToken();
      expect(TwitterApiStateService.isAuthorized()).toBe(false);
    })
  });


  describe('initialization', () => {
    it('should init with the INITIAL_STATE', () => {
      expect(TwitterApiStateService.getAccessToken()).toEqual(null);
      expect(TwitterApiStateService.isAuthorized()).toEqual(false);

    });
  });
});
