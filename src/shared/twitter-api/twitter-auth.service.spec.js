import _find from 'lodash/find';
import { TWITTER_API } from './index';


describe('TwitterAuthService', () => {
  let $httpBackend;

  let TWITTER_API_ERRORS;

  /** @type {TwitterAuthService} */
  let TwitterAuthService;

  /** @type {TwitterApiStateService} */
  let TwitterApiStateService;


  const MOCK_API_CONFIG = {
    AUTHORIZATION_TOKEN: 'test',
    DOMAIN: 'test.com',
    PREFIX: '',
  };


  beforeEach(() => {
    window.localStorage.clear();

    angular
      .module('test', [TWITTER_API])
      .constant('TWITTER_API_CONFIG', MOCK_API_CONFIG);

    angular.mock.module('test');
  });


  beforeEach(angular.mock.inject($injector => {
    $httpBackend = $injector.get('$httpBackend');

    TWITTER_API_ERRORS     = $injector.get('TWITTER_API_ERRORS');
    TwitterAuthService     = $injector.get('TwitterAuthService');
    TwitterApiStateService = $injector.get('TwitterApiStateService');
  }));


  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();

    window.localStorage.clear();
  });


  describe('.createAccessToken()', () => {
    const expectedHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': `Basic ${MOCK_API_CONFIG.AUTHORIZATION_TOKEN}`,
    };

    const url  = 'test.com/oauth2/token';
    const data = 'grant_type=client_credentials';

    const tokenResponse = { access_token: 'aaaa', token_type: 'bearer' };


    beforeEach(() => {
      const checkHeaders = headers => !_find(expectedHeaders, (v, k) => headers[k] !== v);
      $httpBackend
        .whenPOST(url, data, checkHeaders)
        .respond(200, tokenResponse);
    });


    //  ------------------------------------


    it('should send the POST request to /oauth2/token', () => {
      $httpBackend.expectPOST(url, data);

      TwitterAuthService
        .createAccessToken()
        .then(actual => expect(actual).toEqual(tokenResponse));

      $httpBackend.flush();
    });


    it('should call TwitterApiStateService#setAccessToken', () => {
      spyOn(TwitterApiStateService, 'setAccessToken');

      $httpBackend.expectPOST(url, data);

      TwitterAuthService.createAccessToken();
      $httpBackend.flush();

      expect(TwitterApiStateService.setAccessToken).toHaveBeenCalledWith(tokenResponse);
    });
  });


  describe('#ensureAuthorized()', () => {

    beforeEach(() => {
      spyOn(TwitterAuthService, 'createAccessToken');
    });


    it('should call #createAccessToken() if not authorized yet', () => {
      TwitterApiStateService.isAuthorized   = () => false;
      TwitterApiStateService.getAccessToken = () => null;

      TwitterAuthService.ensureAuthorized();
      expect(TwitterAuthService.createAccessToken).toHaveBeenCalled();
    });


    it('should not call #createAccessToken() if authorized', () => {
      TwitterApiStateService.isAuthorized   = () => true;
      TwitterApiStateService.getAccessToken = () => ({
        access_token: 'token',
        token_type: 'bearer',
      });

      TwitterAuthService.ensureAuthorized();
      expect(TwitterAuthService.createAccessToken).not.toHaveBeenCalled();
    });

  });
});
