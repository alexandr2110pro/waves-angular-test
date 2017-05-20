import { HTTP_ERROR_CODES } from 'shared/core/http/http-error-codes';


export class TwitterApiAuthInterceptor {

  static configure($httpProvider) {
    'ngInject';

    $httpProvider.interceptors.push('TwitterApiAuthInterceptor');
  }


  // ------------------------------------


  request = (config) => {
    if (this._TwitterApiStateService.isAuthorized()) {
      config.headers = this._enrichHeaders(config.headers);
    }

    return config;
  };


  responseError = (rejection) => {
    const { status, data } = rejection;

    if (status === HTTP_ERROR_CODES.UNAUTHORIZED) {
      this._TwitterApiStateService.clearAccessToken();
    }


    return Promise.reject(rejection);
  };


  // ------------------------------------


  /**
   * @param {TwitterApiStateService} TwitterApiStateService
   */
  constructor(TwitterApiStateService) {
    'ngInject';

    this._TwitterApiStateService = TwitterApiStateService;
  }


  _enrichHeaders(headers = {}) {
    const accessToken = this._TwitterApiStateService.getAccessToken();

    const authorizationHeader = {
      'Authorization': `Bearer ${accessToken.access_token}`,
    };

    return {
      ...headers,
      ...authorizationHeader,
    };
  }
}
