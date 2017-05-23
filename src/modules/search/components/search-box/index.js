import { SearchBoxService } from 'modules/search/components/search-box/search-box.service';
import { SearchBoxComponent } from './search-box.component';


export const SEARCH_BOX_COMPONENT = angular
  .module('components.search-box', [])
  .component(SearchBoxComponent.NAME, SearchBoxComponent.OPTIONS)
  .service('SearchBoxService', SearchBoxService)
  .name;
