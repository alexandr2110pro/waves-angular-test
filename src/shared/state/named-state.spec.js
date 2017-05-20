import { NamedState } from './named-state';


describe('NamedState', () => {

  /** @type {NamedState} */
  let stateFoo;
  /** @type {NamedState} */
  let stateFooBar;
  /** @type {NamedState} */
  let stateFooBarBaz;
  /** @type {NamedState} */
  let stateFooQuix;


  beforeEach(() => {
    stateFoo       = new NamedState('foo');
    stateFooBar    = new NamedState('foo.bar');
    stateFooBarBaz = new NamedState('foo.bar.baz');
    stateFooQuix   = new NamedState('foo.quix');
  });


  describe('instance.ACTIONS.STATE_CHANGED', () => {

    it('should be auto-prefixed using uppercased statePath by default', () => {
      expect(stateFoo.ACTIONS.STATE_CHANGED).toEqual('FOO_STATE_CHANGED');
      expect(stateFooBarBaz.ACTIONS.STATE_CHANGED).toEqual('FOO.BAR.BAZ_STATE_CHANGED');
    });

    it('should be prefixed with custom prefix, provided to the constructor as the 2nd arg',
      () => {
        const CUSTOM_PREFIX     = 'CuSt0m=';
        const customPrefixState = new NamedState('custom.prefix.state',
          CUSTOM_PREFIX);

        expect(customPrefixState.ACTIONS.STATE_CHANGED)
          .toEqual(`${CUSTOM_PREFIX}_STATE_CHANGED`);
      });
  });


  describe('#updateState()', () => {
    let stateInstance;

    beforeEach(() => {
      stateInstance = new NamedState('testUpdate');
    });


    it('should update the state with provided object', () => {

      const initialState = {
        foo: 'fooState',
        bar: {
          baz: 'barBazState',
          quix: 'barQuixState',
        },
        baz: 'bazState',
      };

      const updateObject = {
        foo: 'newFooState',
        bar: { baz: 'newBarBazState' },
        quix: 'newQuixState',
      };

      stateInstance.setState(initialState);
      stateInstance.updateState(updateObject);

      const expectedNewState = {
        foo: 'newFooState',
        bar: { baz: 'newBarBazState' },
        quix: 'newQuixState',
        baz: 'bazState',
      };


      expect(stateInstance.getState()).toEqual(expectedNewState);

    });
  });


  describe('getState() / setState()', () => {
    it(`should get / set the state accordingly to state's path`, () => {
      const fooBarNewState = {
        baz: 'bazValue',
        barProp: 'fooBar.prop value',
      };

      stateFooBar.setState(fooBarNewState);

      expect(stateFoo.getState()).toEqual({
        bar: fooBarNewState,
        quix: null,
      });

      expect(stateFooBar.getState()).toEqual(fooBarNewState);
      expect(stateFooBarBaz.getState()).toEqual(fooBarNewState.baz);
    });


    it('should publish StateInstance.ACTIONS.STATE_CHANGED on state change', () => {

      const newFooBarState = {
        baz: 'new foo.bar.baz value',
      };

      const fooSubscriber       = jasmine.createSpy('fooSubscriber');
      const fooBarSubscriber    = jasmine.createSpy('fooBarSubscriber');
      const fooBarBazSubscriber = jasmine.createSpy('fooBarBazSubscriber');
      const fooQuixSubscriber   = jasmine.createSpy('fooQuixSubscriber');

      const unsubs = [
        stateFoo.subscribe(fooSubscriber),
        stateFooBar.subscribe(fooBarSubscriber),
        stateFooBarBaz.subscribe(fooBarBazSubscriber),
        stateFooQuix.subscribe(fooQuixSubscriber),
      ];


      stateFooBar.setState(newFooBarState);

      expect(fooSubscriber)
        .toHaveBeenCalledWith({ type: stateFoo.ACTIONS.STATE_CHANGED });
      expect(fooBarSubscriber)
        .toHaveBeenCalledWith({ type: stateFooBar.ACTIONS.STATE_CHANGED });

      // foo.quix is not changed
      expect(fooQuixSubscriber).not.toHaveBeenCalled();
      // but foo is changed, because foo.bar is changed
      expect(fooBarBazSubscriber).toHaveBeenCalled();


      const newFooState = {
        prop: 'new foo.prop value',
        quix: 'new foo.quix state value',
      };

      stateFoo.setState(newFooState);

      expect(fooSubscriber).toHaveBeenCalled();
      expect(fooBarSubscriber).toHaveBeenCalled();
      expect(fooBarBazSubscriber).toHaveBeenCalled();
      expect(fooQuixSubscriber).toHaveBeenCalled();

      unsubs.forEach(f => f());
    });

  });


  describe('initialState constructor argument', () => {
    const NUMBER_STATE = 0;
    const OBJECT_STATE = {
      foo: 'initialFoo',
      bar: {
        baz: 'initialBarBaz',
        quix: 'initialBarQuix',
      },
    };

    let numberStateInstance;
    let numberStateSubscriber;

    let objectStateInstance;
    let objectStateSubscriber;

    const unsubs = [];

    beforeEach(() => {
      numberStateSubscriber = jasmine.createSpy('numberStateInstance');
      numberStateInstance   = new NamedState('initial-test.number', null, NUMBER_STATE);
      unsubs.push(numberStateInstance.subscribe(numberStateSubscriber));

      objectStateSubscriber = jasmine.createSpy('objectStateSubscriber');
      objectStateInstance   = new NamedState('initial-test.object', null, OBJECT_STATE);
      unsubs.push(objectStateInstance.subscribe(objectStateSubscriber));
    });


    afterEach(() => {
      unsubs.forEach(f => f());
      unsubs.length = 0;
    });


    it('should init the state with the provided value', () => {
      expect(objectStateInstance.getState()).toEqual(OBJECT_STATE);
      expect(numberStateInstance.getState()).toBe(NUMBER_STATE);
    });


    it('should not publish state changed action', () => {
      expect(numberStateSubscriber).not.toHaveBeenCalled();
      expect(objectStateSubscriber).not.toHaveBeenCalled();
    });

  });

});
