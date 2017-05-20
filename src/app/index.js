import { VENDOR_MODULES } from 'shared/vendor-modules';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';

import { SEARCH_MODULE } from './search';


const APP_MODULE = angular
  .module('waves.app-module', [

    ...VENDOR_MODULES,

    SEARCH_MODULE,

  ])
  .component(AppComponent.NAME, AppComponent.OPTIONS)
  .config(appConfig)
  .name;


export const BOOTSTRAP_OPTIONS = { strictDi: true };
export const BOOTSTRAP_MODULES = [APP_MODULE];

