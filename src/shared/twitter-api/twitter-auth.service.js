export class TwitterAuthService {


  _RESOURCES = {
    ACCESS_TOKEN: 'oauth2/token',
  };


  /**
   * @param {TwitterApiService} TwitterApiService
   * @param {TwitterApiStateService} TwitterApiStateService
   * @param TWITTER_API_CONFIG
   */
  constructor(TwitterApiService, TwitterApiStateService, TWITTER_API_CONFIG) {
    'ngInject';

    this._TWITTER_API_CONFIG = TWITTER_API_CONFIG;

    this._TwitterApiService      = TwitterApiService;
    this._TwitterApiStateService = TwitterApiStateService;
  }

  ensureAuthorized() {
    if (this._TwitterApiStateService.isAuthorized()) return;
    this.createAccessToken();
  }

  createAccessToken() {
    const options = {
      data: this._getCreateATData(),
      headers: this._getCreateATHeaders(),
    };

    return this._TwitterApiService
      .post(this._RESOURCES.ACCESS_TOKEN, options)
      .then(token => this._saveAccessToken(token));
  }

  _saveAccessToken(token) {
    this._TwitterApiStateService.setAccessToken(token);
    return token;
  }


  _getAuthorizationToken() {
    return this._TWITTER_API_CONFIG.AUTHORIZATION_TOKEN;
  }

  _getCreateATData() {
    return 'grant_type=client_credentials';
  }

  _getCreateATHeaders() {
    return {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': `Basic ${this._getAuthorizationToken()}`,
    };
  }
}
