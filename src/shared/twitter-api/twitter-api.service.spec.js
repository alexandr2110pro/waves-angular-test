import { TwitterApiHTTPException } from './twitter-api-http-exception';
import { TwitterApiService } from './twitter-api.service';


describe('TwitterApiService', () => {
  const MOCK_API_CONFIG = {
    AUTHORIZATION_TOKEN: 'test',
    DOMAIN: 'test.com',
    PREFIX: '',
  };


  let twitterApiService;
  let $httpBackend;


  beforeEach(() => {
    angular
      .module('test', [])
      .constant('TWITTER_API_CONFIG', MOCK_API_CONFIG)
      .service('TwitterApiService', TwitterApiService);

    angular.mock.module('test');
  });

  beforeEach(() => angular.mock.inject($injector => {
    twitterApiService = $injector.get('TwitterApiService');
    $httpBackend      = $injector.get('$httpBackend');
  }));


  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  // ------------------------------------


  const successPostPath     = `/post`;
  const successPostUrl      = `${MOCK_API_CONFIG.DOMAIN}${successPostPath}`;
  const successPostData     = { foo: 'bar' };
  const mockSuccessResponse = { prop: 'value' };

  const failPostPath     = `/postFail`;
  const failPostUrl      = `${MOCK_API_CONFIG.DOMAIN}${failPostPath}`;
  const failPostData     = { foo: 'bar' };
  const mockFailResponse = {
    errors: [
      { message: 'some message', code: 36 },
    ],
  };

  beforeEach(() => {
    $httpBackend
      .whenPOST(successPostUrl, successPostData)
      .respond(200, mockSuccessResponse);

    $httpBackend
      .whenPOST(failPostUrl, failPostData)
      .respond(401, mockFailResponse);

    $httpBackend
      .whenGET(`${MOCK_API_CONFIG.DOMAIN}/get`)
      .respond(200, mockSuccessResponse);


    $httpBackend
      .whenGET(`${MOCK_API_CONFIG.DOMAIN}/getFail`)
      .respond(200, mockSuccessResponse);
  });


  describe('#post()', () => {
    it('should use TWITTER_API_CONFIG to generate the request url', () => {
      const path        = '/test';
      const expectedUrl = `${MOCK_API_CONFIG.DOMAIN}${path}`;

      $httpBackend
        .whenGET(expectedUrl)
        .respond(200, { foo: 'bar' });

      $httpBackend.expectGET(expectedUrl);

      twitterApiService.get(path);
      $httpBackend.flush();
    });

    it('should set params, data & headers from the provided options arg', () => {
      const X_TEST_HEADER_KEY   = 'X-Test';
      const X_TEST_HEADER_VALUE = 'X-Test Value';

      const requestParams = { foo: 'bar', baz: true };
      const expectedURI   = `${successPostUrl}?foo=bar&baz=true`;

      const expectedSentData = { fooBar: 'baz' };

      $httpBackend.expectPOST(expectedURI, expectedSentData, headers => {
          expect(headers[X_TEST_HEADER_KEY]).toEqual(X_TEST_HEADER_VALUE);
          return headers[X_TEST_HEADER_KEY] === X_TEST_HEADER_VALUE;
        })
        .respond(200, {});


      const requestOptions = {
        params: requestParams,
        data: expectedSentData,
        headers: { [X_TEST_HEADER_KEY]: X_TEST_HEADER_VALUE },
      };
      twitterApiService.post(successPostPath, requestOptions);

      $httpBackend.flush();
    });


    it('should resolve with data from the response object', () => {
      $httpBackend.expectPOST(successPostUrl, successPostData);

      const expectedData = { ...mockSuccessResponse };

      twitterApiService
        .post(successPostPath, { data: successPostData })
        .then(data => expect(data).toEqual(expectedData));

      $httpBackend.flush();
    });

    it('should reject with the TwitterAPIHTTPException on failed request', () => {
      $httpBackend.expectPOST(failPostUrl, failPostData);

      const expectedExceptionMessage = mockFailResponse.errors[0].message;
      const expectedExceptionCode    = mockFailResponse.errors[0].code;

      twitterApiService
        .post(failPostPath, { data: failPostData })
        .catch(rejection => {
          expect(rejection).toEqual(jasmine.any(TwitterApiHTTPException));
          expect(rejection.message).toEqual(expectedExceptionMessage);
          expect(rejection.code).toEqual(expectedExceptionCode);
        });

      $httpBackend.flush();
    });

  });

});
