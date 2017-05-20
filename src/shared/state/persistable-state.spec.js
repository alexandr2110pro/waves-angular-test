import { PersistableState } from './persistable-state';


describe('PersistableState', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('buildLSKey()', () => {
    it('should return the ls key based on the state path', () => {
      const testLSKeyState = new PersistableState('test.ls.key');
      expect(testLSKeyState.buildLSKey()).toEqual('STATE__test.ls.key');
    });
  });


  it('should persist its value to the ls on each setState()', () => {
    const testPersist = new PersistableState('test.persist');
    const lsKey       = testPersist.buildLSKey();

    const newState = { test: { ls: 'value' } };

    expect(getLSStateValue(lsKey)).toEqual(null);

    testPersist.setState(newState);

    expect(getLSStateValue(lsKey)).toEqual(newState);
  });


  it('should initialize with saved in ls value', () => {
    const statePath = 'initFromLS';
    const lsKey     = `STATE__${statePath}`;

    const initStateValue = {
      test: { init: 'init value' },
    };

    setLSStateValue(lsKey, initStateValue);

    const stateInstance = new PersistableState(statePath);

    expect(stateInstance.getState()).toEqual(initStateValue);
  });


  describe('when initialState arg is provided', () => {
    const statePath = 'initialState';
    const lsKey     = `STATE__${statePath}`;

    const lsStateValue = {
      foo: 'LSInitialStateFoo',
      bar: { baz: 'LSInitialStateBarBaz', },
    };

    const initialState = {
      bar: { baz: 'initialStateBarBaz', nox: 'initialStateBarNox' },
      quix: 'initialStateQuix',
    };


    it('should initialize with LS value if it is not empty', () => {
      setLSStateValue(lsKey, lsStateValue);
      const stateInstance = new PersistableState(statePath, null, initialState);

      expect(stateInstance.getState()).toEqual(lsStateValue);
      expect(getLSStateValue(lsKey)).toEqual(lsStateValue);
    });


    it('should initialize with provided value if the ls is empty', () => {
      localStorage.clear();
      const stateInstance = new PersistableState(statePath, null, initialState);

      expect(stateInstance.getState()).toEqual(initialState);
      expect(getLSStateValue(lsKey)).toEqual(initialState);
    });

  });


  function setLSStateValue(lsKey, state) {
    localStorage.setItem(lsKey, JSON.stringify({ state }));
  }


  function getLSStateValue(lsKey) {
    const stateJson = localStorage.getItem(lsKey);
    const { state } = stateJson ? JSON.parse(stateJson) : { state: null };

    return state;
  }


});
