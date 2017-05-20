import { SearchLayoutComponent } from './search-layout.component';


export const SEARCH_LAYOUT_COMPONENT = angular.module('components.search-layout', [])
  .component(SearchLayoutComponent.NAME, SearchLayoutComponent.OPTIONS)
  .name;
