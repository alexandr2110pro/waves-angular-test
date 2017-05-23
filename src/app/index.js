import { LAYOUT_MODULE } from 'modules/layout';
import { SEARCH_MODULE } from 'modules/search';

import { VENDOR_MODULES } from 'shared/vendor-modules';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';


const APP_MODULE = angular
  .module('waves.app-module', [
    ...VENDOR_MODULES,

    SEARCH_MODULE,
    LAYOUT_MODULE,
  ])
  .component(AppComponent.NAME, AppComponent.OPTIONS)
  .config(appConfig)
  .name;


export const BOOTSTRAP_OPTIONS = { strictDi: true };
export const BOOTSTRAP_MODULES = [APP_MODULE];

