import { SEARCH_MODULE } from 'modules/search';
import { CONTENT_BLOCK_COMPONENT } from './components/content-block';
import { NAV_BAR_COMPONENT } from './components/nav-bar';
import { PAGE_FOOTER_COMPONENT } from './components/page-footer';


export const LAYOUT_MODULE = angular
  .module('app.layout', [
    SEARCH_MODULE,
    PAGE_FOOTER_COMPONENT,
    CONTENT_BLOCK_COMPONENT,
    NAV_BAR_COMPONENT,
  ])
  .name;
