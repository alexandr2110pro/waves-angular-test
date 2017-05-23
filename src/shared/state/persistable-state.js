import _hasIn from 'lodash/hasIn';
import { NamedState } from './named-state';


const localStorage = window.localStorage;


export class PersistableState extends NamedState {

  buildLSKey() {
    return `STATE__${this._statePath}`;
  }

  _initState() {
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
