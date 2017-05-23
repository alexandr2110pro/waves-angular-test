import { SearchPaginationComponent } from './search-pagination.component';
import { SearchPaginationService } from './search-pagination.service';


export const SEARCH_PAGINATION_COMPONENT = angular
  .module('components.search-pagination', [])
  .service('SearchPaginationService', SearchPaginationService)
  .component(SearchPaginationComponent.NAME, SearchPaginationComponent.OPTIONS)
  .name;
