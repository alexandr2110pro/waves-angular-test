import { StatefulService } from './stateful-service';


describe('StatefulService', () => {

  class FooService extends StatefulService {
    constructor() {
      super('test.foo');
    }

    setFoo(val) {
      this._state.setState(val);
    }
  }


  const FOO_BAR_ACTIONS = {
    FOO: 'FOO',
    BAR: 'BAR',
  }


  class FooBarService extends StatefulService {
    constructor() {
      super('test.foo.bar', true, null, { ...FOO_BAR_ACTIONS });
    }

    setFooBar(val) {
      this._state.setState(val);
    }
  }


  let fooServiceInstance;
  let fooBarServiceInstance;
  let localStorage;
  let unsub;

  beforeEach(() => {
    unsub = [];

    localStorage = window.localStorage;

    angular.module('test', [])
      .service('FooService', FooService)
      .service('FooBarService', FooBarService);

    angular.mock.module('test');
  });

  beforeEach(angular.mock.inject($injector => {
    fooServiceInstance    = $injector.get('FooService');
    fooBarServiceInstance = $injector.get('FooBarService');
  }));

  afterEach(() => {
    unsub.forEach(f => f());
    unsub = null;
  })


  describe('extended service', () => {


    it('instance should have ACTIONS property', () => {
      expect(fooServiceInstance.ACTIONS).toEqual({
        STATE_CHANGED: 'TEST.FOO_STATE_CHANGED',
        STATE_INITIALIZED: 'TEST.FOO_STATE_INITIALIZED',
      });

      expect(fooBarServiceInstance.ACTIONS).toEqual({
        FOO: 'TEST.FOO.BAR_FOO',
        BAR: 'TEST.FOO.BAR_BAR',
        STATE_CHANGED: 'TEST.FOO.BAR_STATE_CHANGED',
        STATE_INITIALIZED: 'TEST.FOO.BAR_STATE_INITIALIZED',
      });
    })


    it('should notify about state changes', () => {

      const fooSubscriber    = jasmine.createSpy('fooSubscriber');
      const fooBarSubscriber = jasmine.createSpy('fooBarSubscriber');
      const newFooBarValue   = { prop: 'val' };

      unsub.push(fooServiceInstance.subscribe(fooSubscriber))
      unsub.push(fooBarServiceInstance.subscribe(fooBarSubscriber));

      fooBarServiceInstance.setFooBar(newFooBarValue);

      expect(fooSubscriber).toHaveBeenCalledWith({
        type: 'TEST.FOO_STATE_CHANGED',
      });

      expect(fooBarSubscriber).toHaveBeenCalledWith({
        type: 'TEST.FOO.BAR_STATE_CHANGED',
      });
    });


    it('should persist state if super was called with 2nd argument equal true', () => {
      const newState = { prop: 'val' };
      const lsKey    = 'STATE__test.foo.bar';

      fooBarServiceInstance.setFooBar(newState);

      const actual   = JSON.parse(localStorage.getItem(lsKey))
      const expected = { state: newState };

      expect(actual).toEqual(expected);
    });

    describe('_updateState()', () => {

    });

  });

});
