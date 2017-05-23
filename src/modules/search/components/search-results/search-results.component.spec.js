import { SEARCH_RESULTS_COMPONENT } from './index';

import {
  SearchBoxServiceMock,
  SearchPaginationServiceMock,
  SUCCESS_RESPONSE,
  TwitterApiSearchServiceMock,
} from './mocks';

import { SearchResultsComponent } from './search-results.component';


describe('SubscriberComponent', () => {

  let $componentController;
  let $q;
  let $rootScope;

  let SearchBoxService;
  let SearchPaginationService;
  let TwitterApiSearchService;

  let controller;

  beforeEach(() => angular.mock.module(SEARCH_RESULTS_COMPONENT));

  beforeEach(() => angular.mock.inject($injector => {
    $componentController = $injector.get('$componentController');
    $rootScope           = $injector.get('$rootScope');
    $q                   = $injector.get('$q');

    SearchPaginationService = new SearchPaginationServiceMock();
    SearchBoxService        = new SearchBoxServiceMock();
    TwitterApiSearchService = new TwitterApiSearchServiceMock();

    controller = $componentController(SearchResultsComponent.NAME, {
      SearchPaginationService,
      SearchBoxService,
      TwitterApiSearchService,
    }, {});

  }));


  describe('mocks', () => {
    it('should have mocked dependencies', () => {
      expect(controller._TwitterApiSearchService).toEqual(TwitterApiSearchService);
      expect(controller._SearchBoxService).toEqual(SearchBoxService);
      expect(controller._SearchPaginationService).toEqual(SearchPaginationService);
    });
  });

  describe('actions handling', () => {
    beforeEach(() => {
      controller.$onInit();
    });

    afterEach(() => {
      controller.$onDestroy();
    });

    it('it should search on SEARCH_QUERY_UPDATED action', () => {
      spyOn(TwitterApiSearchService, 'search').and.callThrough();
      spyOn(controller, '_search').and.callThrough();

      SearchBoxService.query = 'query';
      SearchBoxService.publish({ type: SearchBoxService.ACTIONS.SEARCH_QUERY_UPDATED });

      expect(controller._search).toHaveBeenCalledWith();
      expect(TwitterApiSearchService.search).toHaveBeenCalledWith('query', {});
    });


    it('it should search on SEARCH_PAGINATION_UPDATED action', () => {
      spyOn(TwitterApiSearchService, 'search').and.callThrough();
      spyOn(controller, '_search').and.callThrough();

      SearchBoxService.query         = 'query';
      SearchPaginationService.params = { max_id: '1111' };

      SearchPaginationService.publish({
        type: SearchPaginationService.ACTIONS.SEARCH_PAGINATION_UPDATED,
      });


      expect(controller._search).toHaveBeenCalledWith();
      expect(TwitterApiSearchService.search).toHaveBeenCalledWith('query', {
        max_id: '1111',
      });
    });
  });


  describe('response handling', () => {
    beforeEach(() => {
      controller.$onInit();
    });

    afterEach(() => {
      controller.$onDestroy();
    });

    describe('on success', () => {

      beforeEach(() => {
        SearchBoxService.query         = 'query';
        SearchPaginationService.params = { max_id: '1111' };

      });

      it('should set the tweets property to expected array', () => {
        const expectedValue = SUCCESS_RESPONSE.statuses.map(i => ({
          id: i.id,
          text: i.text,
          userName: i.user.name,
          image: i.user.profile_image_url,
        }));

        controller._search();

        // wait for the promise's resolve )
        setTimeout(() => expect(controller.tweets).toEqual(expectedValue), 100);
      });

      it('should call SearchPaginationService.setPagination()', () => {
        spyOn(SearchPaginationService, 'setPagination');

        controller._search();

        // wait for the promise's resolve )
        setTimeout(() => expect(SearchPaginationService.setPagination)
          .toHaveBeenCalledWith(), 100);
      })
    });

  });

});
