import _find from 'lodash/find';

import { TWITTER_API } from './index';


describe('TwitterApiAuthInterceptor', () => {

  let MockTwitterApiStateService;
  let $http;
  let $httpBackend;

  const accessToken = {
    access_token: 'aaaa',
    token_type: 'bearer',
  };


  beforeEach(angular.mock.module(TWITTER_API));

  beforeEach(angular.mock.module($provide => {

    MockTwitterApiStateService = {
      _accessToken: accessToken,
      _isAuthorized: true,
      isAuthorized() { return this._isAuthorized; },
      getAccessToken() { return this._accessToken; },
    };


    $provide.value('TwitterApiStateService', MockTwitterApiStateService);
  }));

  beforeEach(angular.mock.inject($injector => {
    $httpBackend = $injector.get('$httpBackend');
    $http        = $injector.get('$http');
  }));


  beforeEach(() => {
    $httpBackend.whenGET('test').respond(200);
    $httpBackend.whenGET('/unauthorized').respond(401, {
      errors: [
        { message: 'Could not authenticate you', code: 135 },
      ],
    });

  });


  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });


  it('should add access token headers, when authorized', () => {

    const expectedHeaders = {
      'Authorization': `Bearer ${accessToken.access_token}`,
    };

    $httpBackend.expectGET('test', (headers) => {
      return !_find(expectedHeaders, (v, k) => headers[k] !== v);
    });


    $http.get('test');

    $httpBackend.flush();

  });


  it('should not modify request if access token is not existing', () => {
    const expectedHeaders = {};

    MockTwitterApiStateService._isAuthorized = false;
    MockTwitterApiStateService._accessToken  = null;


    $httpBackend.expectGET('test', headers => {
      const { Authorization } = headers;

      // Bearer token should not present.
      return !/^Bearer\s.+/.test(Authorization)
    });

    $http.get('test');

    $httpBackend.flush();

  });

  it('should call TwitterApiStateService.clearAccessToken() on 401', () => {
    $httpBackend.expectGET('/unauthorized');

    MockTwitterApiStateService.clearAccessToken
      = jasmine.createSpy('clearAccessToken');

    $http.get('/unauthorized');
    $httpBackend.flush();

    expect(MockTwitterApiStateService.clearAccessToken).toHaveBeenCalled();
  });

});
