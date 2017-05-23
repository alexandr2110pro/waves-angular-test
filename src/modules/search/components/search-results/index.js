import { SEARCH_PAGINATION_COMPONENT } from '../search-pagination';
import { SearchResultsItemComponent } from './search-results-item.component';
import { SearchResultsComponent } from './search-results.component';


export const SEARCH_RESULTS_COMPONENT = angular
  .module('components.search-results', [
    SEARCH_PAGINATION_COMPONENT,
  ])
  .component(SearchResultsComponent.NAME, SearchResultsComponent.OPTIONS)
  .component(SearchResultsItemComponent.NAME, SearchResultsItemComponent.OPTIONS)
  .name;
