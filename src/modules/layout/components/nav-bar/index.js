import { NavBarComponent } from './nav-bar.component';


export const NAV_BAR_COMPONENT = angular
  .module('components.nav-bar', [])
  .component(NavBarComponent.NAME, NavBarComponent.OPTIONS)
  .name;
