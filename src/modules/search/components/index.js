import { SEARCH_BOX_COMPONENT } from './search-box';
import { SEARCH_PAGINATION_COMPONENT } from './search-pagination';
import { SEARCH_RESULTS_COMPONENT } from './search-results';


export const SEARCH_COMPONENTS = angular
  .module('search.components', [
    SEARCH_BOX_COMPONENT,
    SEARCH_RESULTS_COMPONENT,
    SEARCH_PAGINATION_COMPONENT,
  ])
  .name;
