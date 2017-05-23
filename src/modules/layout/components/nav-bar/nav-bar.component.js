import './nav-bar.scss';


export class NavBarComponent {
  static NAME    = 'navBar';
  static OPTIONS = {
    controller: NavBarComponent,
    template: require('./nav-bar.template.html'),
    bindings: {},
  }

  searchOptions = {
    key: 'query',
  };


  onSearchQueryChange(query) {
  }
}
