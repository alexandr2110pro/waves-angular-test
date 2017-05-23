import _assign from 'lodash/assign';
import _get from 'lodash/get';
import _set from 'lodash/get';

import { PubSub } from 'shared/pub-sub';
import { NamedState } from './named-state';
import { PersistableState } from './persistable-state';


export class StatefulService extends PubSub {

  static INITIAL_STATE = null;

  /**
   * @param {string} statePath
   * @param {boolean} [persistable=false]
   * @param {string|null} [actionsPrefix=null]
   * @param {Object} [actions]
   * @param {Object|*} [initialState]
   */
  constructor(statePath,
    persistable   = false,
    actionsPrefix = null,
    actions,
    initialState) {

    super();

    const initial = initialState || this.constructor.INITIAL_STATE;
    this._state   = persistable
      ? new PersistableState(statePath, actionsPrefix, initial)
      : new NamedState(statePath, actionsPrefix, initial);

    this._enrichActions({
      actionsPrefix: actionsPrefix || this._state.getActionsPrefix(),
      actions: this.constructor.ACTIONS || actions,
    });

    this._state.subscribe(a => this.publish(a));

    this._onInitHook();
  }


  _onInitHook() { }


  _enrichActions({ actions, actionsPrefix }) {
    const locActions         = _.cloneDeep(actions);
    const prefixedLocActions = NamedState.prefixActions(locActions, actionsPrefix);

    this.ACTIONS = _assign(prefixedLocActions, this._state.ACTIONS);
  }

  _getState(path) {
    const state = this._state.getState() || null;
    return path && state ? _get(state, path, null) : state;
  }

  _updateState(updateObject) {
    return this._state.updateState(updateObject);
  }

  _setState(statePath, newState) {
    const _state = arguments.length === 1 ? arguments[0] : newState;
    return arguments.length > 1
      ? this._setStateByPath(statePath, _state)
      : this._state.setState(_state);
  }

  _setStateByPath(path, newState) {
    const _currentState = this._state.getState() || {};

    _set(_currentState, path, newState);

    return this._state.setState(_currentState);
  }

}
