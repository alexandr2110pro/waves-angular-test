import _isObject from 'lodash/isObject';

import { StatefulService } from 'shared/state';

import { TWITTER_API_ERRORS } from './twitter-api-errors.constant';


export class TwitterApiStateService extends StatefulService {

  static INITIAL_STATE = {
    authorized: false,
    token: null,
  };

  constructor() {
    super('TWITTER_API', true);
  }

  setAccessToken(token) {
    if (!this._validateAccessToken(token)) {
      throw new Error(TWITTER_API_ERRORS.INVALID_TOKEN);
    }

    this._updateState({ token, authorized: true });
  }


  clearAccessToken() {
    this._updateState({ token: null, authorized: false });
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

