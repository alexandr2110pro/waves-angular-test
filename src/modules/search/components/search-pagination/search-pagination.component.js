import './search-pagination.scss';


export class SearchPaginationComponent {
  static NAME    = 'searchPagination';
  static OPTIONS = {
    controller: SearchPaginationComponent,
    template: require('./search-pagination.template.html'),
    bindings: {
      onNext: '&',
      onPrev: '&',
    },
  };


  /**
   * @param {SearchPaginationService} SearchPaginationService
   */
  constructor(SearchPaginationService) {
    'ngInject';

    this._SearchPaginationService = SearchPaginationService;
  }

  nextPage() {
    this._SearchPaginationService.nextPage()
  }

  prevPage() {
    this._SearchPaginationService.prevPage()
  }
}
