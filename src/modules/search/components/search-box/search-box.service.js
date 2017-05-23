import { PubSub } from 'shared/pub-sub/pub-sub.class';


export class SearchBoxService extends PubSub {

  ACTIONS = {
    SEARCH_QUERY_UPDATED: 'SEARCH_QUERY_CHANGED',
  };

  /**
   * @param {angular.ILocationService} $location
   */
  constructor($location) {
    'ngInject';

    super();

    this._$location   = $location;
    this._searchQuery = null;
  }

  updateQueryString(key, string) {
    if (this.readFromLocation(key) === string) return;
    this.writeToLocation(key, string);
  }

  getQuery() {
    return this._searchQuery || '';
  }

  writeToLocation(key, query) {
    this._$location.search(key, query);
    this.publishUpdate(query);
  }

  readFromLocation(key) {
    const _search = this._$location.search() || {};
    return _search[key] || '';
  }

  publishUpdate(query) {
    this._searchQuery = query;
    this.publish({ type: this.ACTIONS.SEARCH_QUERY_UPDATED, query });
  }
}
