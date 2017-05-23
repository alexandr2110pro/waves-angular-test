import { PageFooterComponent } from './page-footer.component';


export const PAGE_FOOTER_COMPONENT = angular
  .module('layout.components.page-footer', [])
  .component(PageFooterComponent.NAME, PageFooterComponent.OPTIONS)
  .name;
