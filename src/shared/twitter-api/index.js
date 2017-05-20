import { TwitterApiAuthInterceptor } from './twitter-api-auth.interceptor';

import { TWITTER_API_CONFIG } from './twitter-api-config.constant';
import { TWITTER_API_ERRORS } from './twitter-api-errors.constant';
import { TWITTER_API_SEARCH_ACTIONS } from './twitter-api-search.actions';

import { TwitterApiSearchService } from './twitter-api-search.service';
import { TwitterApiStateService } from './twitter-api-state.service';
import { TwitterApiService } from './twitter-api.service';
import { TwitterAuthService } from './twitter-auth.service';


export const TWITTER_API = angular

  .module('shared.twitter-api', [])

  .constant('TWITTER_API_CONFIG', TWITTER_API_CONFIG)
  .constant('TWITTER_API_ERRORS', TWITTER_API_ERRORS)
  .constant('TWITTER_API_SEARCH_ACTIONS', TWITTER_API_SEARCH_ACTIONS)

  .service('TwitterApiStateService', TwitterApiStateService)
  .service('TwitterApiAuthInterceptor', TwitterApiAuthInterceptor)
  .service('TwitterAuthService', TwitterAuthService)
  .service('TwitterApiService', TwitterApiService)
  .service('TwitterApiSearchService', TwitterApiSearchService)

  .config(TwitterApiAuthInterceptor.configure)

  .name;

