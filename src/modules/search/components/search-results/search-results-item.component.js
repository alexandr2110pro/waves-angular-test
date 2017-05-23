export class SearchResultsItemComponent {
  static NAME    = 'searchResultsItem';
  static OPTIONS = {
    controller: SearchResultsItemComponent,
    template: require('./search-results-item.template.html'),
    bindings: {
      item: '<',
    },
  };
}
