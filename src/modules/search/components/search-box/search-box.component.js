import './search-box.scss';


export class SearchBoxComponent {
  static NAME    = 'searchBox';
  static OPTIONS = {
    controller: SearchBoxComponent,
    template: require('./search-box.template.html'),
    bindings: {
      options: '<',
    },
  }

  _DEFAULT_QUERY_KEY = 'q';


  /**
   * @param {angular.IRootScopeService} $rootScope
   * @param {SearchBoxService} SearchBoxService
   */
  constructor($rootScope, SearchBoxService) {
    'ngInject';

    this._SearchBoxService = SearchBoxService;
    this._$rootScope       = $rootScope;

    this.searchQuery = '';
  }

  get key() {
    return this.options && this.options.key || this._DEFAULT_QUERY_KEY;
  }


  $onInit() {
    this._initQuery();
    this._$rootScope.$on('$locationChangeSuccess', () => this._checkState())
  }

  makeSearch() {
    this._updateSharedState();
  }


  _initQuery() {
    const locationQuery = this._SearchBoxService.readFromLocation(this.key);
    this._updateLocalState(locationQuery);
  }

  _updateSharedState() {
    this._SearchBoxService.updateQueryString(this.key, this.searchQuery);
  }

  _updateLocalState(locationQuery) {
    this.searchQuery = locationQuery;
    this._SearchBoxService.publishUpdate(this.searchQuery);
  }

  _checkState() {
    const sharedQuery = this._SearchBoxService.readFromLocation(this.key);
    if (this.searchQuery === sharedQuery) return;
    this._updateLocalState(sharedQuery);
  }
}
