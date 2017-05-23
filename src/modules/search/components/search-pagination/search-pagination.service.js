import _first from 'lodash/first';
import _last from 'lodash/last';

import { PubSub } from 'shared/pub-sub';


export class SearchPaginationService extends PubSub {

  ACTIONS = {
    SEARCH_PAGINATION_UPDATED: 'SEARCH_PAGINATION_UPDATED',
  }

  constructor() {
    'ngInject';

    super();

    this._query   = null;
    this._sinceId = null;
    this._maxId   = null;

    this._params = {};
  }

  setPagination(searchMetadata, searchResults) {
    const { query } = searchMetadata;
    if (this._query !== query) {
      return this._initSettings(query, searchResults);
    }

    this._updateSettings(searchResults);
  }


  getParams() {
    return this._params;
  }


  nextPage() {
    this._params = { max_id: this._maxId };
    this._publishUpdated();
  }

  prevPage() {
    this._params = { since_id: this._sinceId };
    this._publishUpdated();
  }

  _initSettings(query, searchResults) {
    this._setQuery(query);
    this._updateSettings(searchResults);
  }

  _updateSettings(searchResults) {
    const ids = searchResults.map(i => i.id_str);
    this._setMaxId(_last(ids));
    this._setSinceId(_first(ids));
  }

  _setQuery(query) {
    this._query = query;
  }

  _setSinceId(id) {
    this._sinceId = id;
  }

  _setMaxId(id) {
    this._maxId = id;
  }

  _publishUpdated() {
    this.publish({ type: this.ACTIONS.SEARCH_PAGINATION_UPDATED });
  }
}
