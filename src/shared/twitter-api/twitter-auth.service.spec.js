import _find from 'lodash/find';
import { TWITTER_API } from './index';


describe('TwitterAuthService', () => {
  let twitterAuthService;
  let TWITTER_API_ERRORS;
  let $httpBackend;
  let TwitterApiStateService;

  const MOCK_API_CONFIG = {
    AUTHORIZATION_TOKEN: 'test',
    DOMAIN: 'test.com',
    PREFIX: '',
  };

  beforeEach(() => {
    angular
      .module('test', [TWITTER_API])
      .constant('TWITTER_API_CONFIG', MOCK_API_CONFIG);

    angular.mock.module('test');
  });


  beforeEach(angular.mock.inject($injector => {
    $httpBackend           = $injector.get('$httpBackend');
    twitterAuthService     = $injector.get('TwitterAuthService');
    TWITTER_API_ERRORS     = $injector.get('TWITTER_API_ERRORS');
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
      $httpBackend
        .whenPOST(url, data, (headers) => {
          return _find(expectedHeaders, (v, k) => headers[k] !== v);
        })
        .respond(200, tokenResponse);
    });


    it('should send the POST request to /oauth2/token', () => {
      $httpBackend.expectPOST(url, data);

      twitterAuthService
        .createAccessToken()
        .then(actual => expect(actual).toEqual(tokenResponse));

      $httpBackend.flush();
    });


    it('should call TwitterApiStateService#setAccessToken', () => {
      spyOn(TwitterApiStateService, 'setAccessToken');
      $httpBackend.expectPOST(url, data);

      twitterAuthService.createAccessToken();
      $httpBackend.flush();

      expect(TwitterApiStateService.setAccessToken)
        .toHaveBeenCalledWith(tokenResponse);
    });

  });
});
