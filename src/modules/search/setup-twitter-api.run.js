/** @param {TwitterAuthService} TwitterAuthService */
export const setupTwitterApi = TwitterAuthService => {
  'ngInject';
  TwitterAuthService.ensureAuthorized();
}
