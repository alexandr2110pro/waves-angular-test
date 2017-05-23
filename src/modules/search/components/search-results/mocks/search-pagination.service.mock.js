import { PubSub } from 'shared/pub-sub';


export class SearchPaginationServiceMock extends PubSub {
  ACTIONS = {
    SEARCH_PAGINATION_UPDATED: 'SEARCH_PAGINATION_UPDATED',
  };

  params = {};

  getParams() {
    return this.params;
  }


  setPagination({ query }, results = []) {

  }
}
