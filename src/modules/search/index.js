import { TWITTER_API } from 'shared/twitter-api';
import { SEARCH_COMPONENTS } from './components';
import { setupTwitterApi } from './setup-twitter-api.run';


export const SEARCH_MODULE = angular
  .module('modules.search', [
    TWITTER_API,
    SEARCH_COMPONENTS,
  ])
  .run(setupTwitterApi)
  .name;

