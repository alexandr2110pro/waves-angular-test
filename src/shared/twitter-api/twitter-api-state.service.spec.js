import { TWITTER_API } from './index';


describe('TwitterApiStateService', () => {

  const VALID_TOKEN_VALUE = 'AAAAAAAAAAAAAAAAAAAAAHEF0wAAAAAAvm'
    + 'GrANiZLqPNL7Iq8bsUCon1ZFU%3DBwWZEBciQcPC5jSEvw3j9iarUc'
    + 'DK6YvVSPWqMGhO0t4Ib50sSw';

  let twitterApiStateService;
  let TWITTER_API_ERRORS;

  beforeEach(angular.mock.module(TWITTER_API));

  beforeEach(inject($injector => {
    twitterApiStateService = $injector.get('TwitterApiStateService');
    TWITTER_API_ERRORS     = $injector.get('TWITTER_API_ERRORS');
  }));


  afterEach(() => {
    window.localStorage.clear();
  });


  describe('#setAccessToken()', () => {

    it('should throw if the token is not valid', () => {
      const badToken   = { wrongValue: 'badbadbad', };
      const expression = () => twitterApiStateService.setAccessToken(badToken);

      expect(expression).toThrowError(TWITTER_API_ERRORS.INVALID_TOKEN);
    });


    it('should update the state', () => {
      const correctToken = {
        access_token: VALID_TOKEN_VALUE,
        token_type: 'bearer',
      };

      twitterApiStateService.setAccessToken(correctToken);
      expect(twitterApiStateService.getAccessToken()).toEqual(correctToken)

    });
  });


  describe('#clearAccessToken()', () => {

    it('should clear the token state', () => {
      twitterApiStateService.clearAccessToken();

      expect(twitterApiStateService.getAccessToken()).toEqual(null);
    });
  });


  describe('#isAuthorized()', () => {

  });
});
