import _ from 'lodash';
import { PubSub } from 'shared/pub-sub';


const APP_STATE         = {};
const REGISTERED_STATES = {};


export class NamedState extends PubSub {

  static ACTIONS = {
    STATE_CHANGED: 'STATE_CHANGED',
    STATE_INITIALIZED: 'STATE_INITIALIZED',
  };


  /**
   * @param {string} statePath
   * @return {Array<NamedState>}
   */
  static getPotentiallyAffectedStates(statePath) {
    return _.filter(REGISTERED_STATES, _createAffectedStatesFilter(statePath));
  }

  static updateGlobal(statePath, newState) {
    const _value = _.isObject(newState) ? { ...newState } : newState;

    _.set(APP_STATE, statePath, _value);

    NamedState
      .getPotentiallyAffectedStates(statePath)
      .map(state => state.update());
  }

  static registerState(statePath, stateInstance) {
    REGISTERED_STATES[statePath] = stateInstance;
  }


  /**
   * @param {string} statePath in a form `foo.bar.baz'
   * @param {String} [actionsPrefix] prefix actions with this value.
   *                                 Otherwise, path-based auto-prefix will be used.
   * @param {any?} initialState
   */
  constructor(statePath, actionsPrefix, initialState = null) {
    super();

    this._statePath     = statePath;
    this._actionsPrefix = actionsPrefix || this._statePath.toUpperCase();
    this._initialState  = initialState;

    this.ACTIONS = NamedState.prefixActions(NamedState.ACTIONS, this._actionsPrefix);

    NamedState.registerState(this._statePath, this);

    this._initState();
  }

  static prefixActions(actions, prefix) {
    if (!prefix) throw new Error('prefix should not be empty');

    return _.mapValues(actions, action => `${prefix}_${action}`);
  }


  /**
   * It update corresponding part of the global App State using.
   * All necessary states (inner and parent) will be updated and their subscribers will
   * be notified.
   * @param {any} [newState=null]
   */
  setState(newState = null) {
    NamedState.updateGlobal(this._statePath, newState);
  }

  /**
   * Return a copy of the local state
   * @return {*}
   */
  getState() {
    return _.cloneDeep(this._state);
  }

  /**
   * @param {object} updateObject
   */
  updateState(updateObject) {
    const currentState = this.getState() || {};
    const updatedState = { ...currentState, ...updateObject };

    this.setState(updatedState);

  }

  /**
   * It will check, if the corresponding state in global app state has changed.
   */
  update() {
    if (!this._updateRequired()) return;

    this._updateFromGlobal();
    this._notify();
  }

  getActionsPrefix() {
    return this._actionsPrefix;
  }

  _updateRequired() {
    return !angular.equals(this._state, _.get(APP_STATE, this._statePath));
  }

  _updateFromGlobal() {
    // without cloning, it would break the changed check.
    this._state = _.cloneDeep(_.get(APP_STATE, this._statePath, null));
  }

  _notify() {
    this.publish({ type: this.ACTIONS.STATE_CHANGED });
  }

  _initState() {
    this.setState(this._initialState);
  }
}


// ------------------------------------

function _createAffectedStatesFilter(statePath) {
  return (state, path) => _.startsWith(path, statePath) || _.startsWith(statePath, path);
}
