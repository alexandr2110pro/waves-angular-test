import { PubSub } from 'shared/pub-sub';
import { SEARCH_PAGINATION_COMPONENT } from './index';


describe('SearchPaginationService', () => {

  /** @type {SearchPaginationService} */
  let SearchPaginationService;


  beforeEach(() => angular.mock.module(SEARCH_PAGINATION_COMPONENT));

  beforeEach(() => angular.mock.inject($injector => {
    SearchPaginationService = $injector.get('SearchPaginationService');
  }));

  it('should be an instance of PubSub', () => {
    expect(SearchPaginationService instanceof PubSub).toBe(true);
  })


  describe('instance methods', () => {

    const unsubscribers = [];

    let query;
    let results;

    let subscriber;

    beforeEach(() => {
      subscriber = jasmine.createSpy('subscriber');
      unsubscribers.push(SearchPaginationService.subscribe(subscriber));
    });

    beforeEach(() => {
      query   = 'query';
      results = [
        { id_str: '11111' },
        { id_str: '11112' },
        { id_str: '11113' },
        { id_str: '11114' },
      ];
    });

    afterEach(() => {
      unsubscribers.forEach(f => f());
      unsubscribers.length = 0;
    });

    describe('#setPagination()', () => {

      beforeEach(() => {
        SearchPaginationService.setPagination({ query }, results);
      });

      it('should set _query', () => {
        const expectedQuery = query;
        expect(SearchPaginationService._query).toEqual(expectedQuery);
      });

      it('should set the _maxId to the last tweet\'s id_str', () => {
        const expectedMaxId = results[3].id_str;
        expect(SearchPaginationService._maxId).toEqual(expectedMaxId);
      });

      it('should set the _sinceId to the first tweet\'s id_str', () => {
        const expectedSinceId = results[0].id_str;
        expect(SearchPaginationService._sinceId).toEqual(expectedSinceId);
      });
    });


    describe('#nextPage()', () => {

      beforeEach(() => {
        SearchPaginationService.setPagination({ query }, results);
        SearchPaginationService.nextPage();
      });

      it('getParams() should return expected object', () => {
        const expected = { max_id: results[3].id_str };
        const actual   = SearchPaginationService.getParams();

        expect(actual).toEqual(expected);
      });


      it('should publish the event', () => {
        expect(subscriber).toHaveBeenCalledWith({
          type: SearchPaginationService.ACTIONS.SEARCH_PAGINATION_UPDATED,
        });
      });
    });


    describe('#prevPage()', () => {
      beforeEach(() => {
        SearchPaginationService.setPagination({ query }, results);
        SearchPaginationService.prevPage();
      });

      it('getParams() should return expected object', () => {
        const expected = { since_id: results[0].id_str };
        const actual   = SearchPaginationService.getParams();

        expect(actual).toEqual(expected);
      });

      it('should publish the event', () => {
        expect(subscriber).toHaveBeenCalledWith({
          type: SearchPaginationService.ACTIONS.SEARCH_PAGINATION_UPDATED,
        });
      });
    });

  });

});
