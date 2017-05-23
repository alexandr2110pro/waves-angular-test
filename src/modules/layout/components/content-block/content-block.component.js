import './content-block.scss';


export class ContentBlockComponent {
  static NAME    = 'contentBlock';
  static OPTIONS = {
    controller: ContentBlockComponent,
    template: require('./content-block.template.html'),
    bindings: {},
  }

  constructor() {
    'ngInject';
    
  }

}
