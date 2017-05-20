import _isObject from 'lodash/isObject';
import { StatefulService } from 'shared/state';


export class TwitterApiStateService extends StatefulService {

  /**
   * @param TWITTER_API_ERRORS
   */

  constructor(TWITTER_API_ERRORS) {
    'ngInject';

    super('TWITTER_API', true, null);

    this._TWITTER_API_ERRORS = TWITTER_API_ERRORS;
    this._setState()
  }

  setAccessToken(token) {
    if (!this._validateAccessToken(token)) {
      throw new Error(this._TWITTER_API_ERRORS.INVALID_TOKEN);
    }

    return this._updateState({
      token,
      authorized: true,
    })

  }

  clearAccessToken() {
    this._updateState({
      token: null,
      authorized: false,
    });
  }

  getAccessToken() {
    return this._getState('token');
  }

  isAuthorized() {
    return this._getState('authorized');
  }

  _validateAccessToken(token) {
    return _isObject(token) && 'access_token' in token;
  }
}

