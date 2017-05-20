import { TWITTER_API } from 'shared/twitter-api';

import { SEARCH_LAYOUT_COMPONENT } from './components/search-layout';


export const SEARCH_MODULE = angular
  .module('waves.app-module.search', [
    TWITTER_API,
    SEARCH_LAYOUT_COMPONENT,
  ])
  .name;

