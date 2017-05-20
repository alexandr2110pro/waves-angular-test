import './search-layout.scss';


export class SearchLayoutComponent {
  static NAME    = 'searchLayout';
  static OPTIONS = {
    controller: SearchLayoutComponent,
    template: require('./search-layout.template.html'),
    bindings: {},
  }

  /**
   * @param {TwitterApiSearchService} TwitterApiSearchService
   * @param {TwitterAuthService} TwitterAuthService
   */
  constructor(TwitterApiSearchService, TwitterAuthService) {
    'ngInject';

    this._TwitterApiSearchService = TwitterApiSearchService;
    this._TwitterAuthService      = TwitterAuthService;
  }


  search() {
    this._TwitterAuthService.createAccessToken();
  }
}
