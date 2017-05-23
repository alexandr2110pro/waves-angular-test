import { PubSub } from 'shared/pub-sub';


export class SearchBoxServiceMock extends PubSub {
  ACTIONS = {
    SEARCH_QUERY_UPDATED: 'SEARCH_QUERY_UPDATED',
  };

  query = '';

  getQuery() {
    return this.query;
  }

}
