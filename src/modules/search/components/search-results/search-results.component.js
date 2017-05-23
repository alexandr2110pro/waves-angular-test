import _isEmpty from 'lodash/isEmpty';

import { SubscriberComponent } from 'shared/pub-sub/subscriber-component';

import './search-results.scss';


export class SearchResultsComponent extends SubscriberComponent {
  static NAME    = 'searchResults';
  static OPTIONS = {
    controller: SearchResultsComponent,
    template: require('./search-results.template.html'),
    bindings: {},
  };

  /**
   * @param {SearchBoxService} SearchBoxService
   * @param {TwitterApiSearchService} TwitterApiSearchService
   * @param {SearchPaginationService} SearchPaginationService
   */
  constructor(SearchBoxService, SearchPaginationService, TwitterApiSearchService) {
    'ngInject';

    super();

    this._SearchBoxService        = SearchBoxService;
    this._SearchPaginationService = SearchPaginationService;
    this._TwitterApiSearchService = TwitterApiSearchService;
  }

  $onInit() {
    this._subscribeTo([
      this._SearchBoxService,
      this._SearchPaginationService,
      this._TwitterApiSearchService,
    ]);
    this._search();
  }


  _handleAction(action) {

    switch (action.type) {

      case this._SearchBoxService.ACTIONS.SEARCH_QUERY_UPDATED:
      case this._SearchPaginationService.ACTIONS.SEARCH_PAGINATION_UPDATED:
        this._search();
        break;
    }
  }

  _search() {
    const query  = this._SearchBoxService.getQuery();
    const params = this._SearchPaginationService.getParams();

    if (_isEmpty(query)) return;

    return this._TwitterApiSearchService
      .search(query, params)
      .then(response => this._acceptResponse(response));
  }

  _acceptResponse(response) {
    const searchResults  = response.statuses;
    const searchMetadata = response.search_metadata;

    this.tweets = searchResults.map(s => this._createTweetObject(s));
    this._SearchPaginationService.setPagination(searchMetadata, searchResults);
  }

  _createTweetObject(s) {
    return {
      id: s.id,
      text: s.text,
      userName: s.user.name,
      image: s.user.profile_image_url,
    }
  }
}
