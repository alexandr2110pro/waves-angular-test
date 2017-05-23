import { SEARCH_BOX_COMPONENT } from './index';


describe('SearchBoxService', () => {

  /** @type {SearchBoxService} */
  let SearchBoxService;

  /** @type {angular.IRootScopeService} */
  let $rootScope;

  /** @type {angular.ILocationService} */
  let $location;

  beforeEach(() => {
    angular.mock.module(SEARCH_BOX_COMPONENT);
  });


  beforeEach(() => angular.mock.inject($injector => {
    $rootScope       = $injector.get('$rootScope');
    $location        = $injector.get('$location');
    SearchBoxService = $injector.get('SearchBoxService');
  }));

  beforeEach(() => {
    $location.search({});
    $location.hash(null)
    $rootScope.$apply();
  });


  describe('writeToLocation', () => {
    it('should update uri query parameter', () => {
      SearchBoxService.writeToLocation('foo', 'bar');
      $rootScope.$apply();
      expect($location.search()).toEqual({ foo: 'bar' });
    });
  });


  describe('readFromLocation', () => {
    const key           = 'foo';
    const expectedValue = 'Search query';

    it('should return the value from the uri query params by `key`', () => {
      const otherParams = { bar: { foo: 1, baz: 2 }, other: true };
      const hashParam   = 'foo=bar';

      $location.search(otherParams);
      $location.hash(hashParam)
      $location.search(key, expectedValue);


      $rootScope.$apply();

      expect(SearchBoxService.readFromLocation(key)).toEqual(expectedValue);
    });
  });
});
