/**
 *
 * @param {angular.ILocationProvider} $locationProvider
 * @param {angular.IHttpProvider} $httpProvider
 */
export const appConfig = ($locationProvider, $httpProvider) => {
  'ngInject';

  $locationProvider.html5Mode(false);
}
