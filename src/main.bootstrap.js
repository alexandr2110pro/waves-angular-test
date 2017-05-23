import { BOOTSTRAP_MODULES, BOOTSTRAP_OPTIONS } from 'app';
import { angular } from 'shared/vendor-modules';


const element   = window.document;
const bootstrap = () => angular.bootstrap(element, BOOTSTRAP_MODULES, BOOTSTRAP_OPTIONS);

angular.element(element).ready(() => bootstrap());
