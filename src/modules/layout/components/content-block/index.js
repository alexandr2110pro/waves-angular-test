import { SEARCH_MODULE } from 'modules/search';
import { ContentBlockComponent } from './content-block.component';


export const CONTENT_BLOCK_COMPONENT = angular
  .module('components.content-block', [
    SEARCH_MODULE,
  ])
  .component(ContentBlockComponent.NAME, ContentBlockComponent.OPTIONS)
  .name;
