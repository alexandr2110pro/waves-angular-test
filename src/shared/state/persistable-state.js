import _cloneDeep from 'lodash/cloneDeep';
import _hasIn from 'lodash/hasIn';

import { NamedState } from './named-state';


const localStorage = window.localStorage


export class PersistableState extends NamedState {

  buildLSKey() {
    return `STATE__${this._statePath}`;
  }

  _initState() {
    reporterFactory(this)();
    this.setState(this._getInitialState());
  }

  _getInitialState() {
    return this._hasLSValue()
      ? this._getLSValue()
      : this._initialState;

  }

  _hasLSValue() {
    return _hasIn(localStorage, this.buildLSKey());
  }

  _updateFromGlobal() {
    super._updateFromGlobal();
    this._setLSValue();
  }

  _setLSValue() {
    return localStorage.setItem(this.buildLSKey(), this._toJSON());
  }

  _getLSValue() {
    return this._fromJSON(localStorage.getItem(this.buildLSKey()))
  }

  _fromJSON(json) {
    if (!json) return null;
    return JSON.parse(json)['state'];
  }

  _toJSON() {
    const state = this.getState() || null;
    return JSON.stringify({ state });
  }
}


// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------


/**
 * @param stateInstance
 * @return {function()}
 */
function reporterFactory(stateInstance) {
  let STATE_CHANGED     = stateInstance.ACTIONS.STATE_CHANGED;
  let STATE_INITIALIZED = stateInstance.ACTIONS.STATE_INITIALIZED;

  let publish   = stateInstance.publish.bind(stateInstance);
  let subscribe = stateInstance.subscribe.bind(stateInstance);
  let getState  = stateInstance.getState.bind(stateInstance);

  let initial      = getState();
  let createAction = (newState, publish) => {
    let state  = _cloneDeep(newState);
    let type   = STATE_INITIALIZED;
    let action = { type, state };

    return onPublish => {
      publish(action);
      onPublish(action);
    }
  };


  return () => {
    let unsub = subscribe(({ type }) => {

      let updated = getState();

      if (type === STATE_CHANGED && !angular.equals(updated, initial)) {

        createAction(updated, publish)((action) => {

          console.debug(`---\nINIT: ${action.type}:`, action.state);

          unsub();
          updated      = null;
          initial      = null;
          createAction = null
          unsub        = null;
        });
      }
    })
  }
}
