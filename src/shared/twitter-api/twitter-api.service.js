import { join } from 'path';
import { TwitterApiHTTPException } from './twitter-api-http-exception';


export class TwitterApiService {

  _METHODS = {
    GET: 'GET',
    POST: 'POST',
  };


  /**
   * @param {angular.IHttpService} $http
   * @param {TWITTER_API_CONFIG} TWITTER_API_CONFIG
   */
  constructor($http, TWITTER_API_CONFIG) {
    'ngInject';

    this._$http = $http;

    this._TWITTER_API_CONFIG = TWITTER_API_CONFIG;
  }

  get _apiBase() {
    const { DOMAIN, PREFIX } = this._TWITTER_API_CONFIG;
    return join(DOMAIN, PREFIX);
  }

  get(path, options) {
    return this._makeRequest(path, this._METHODS.GET, options);
  }

  post(path, options) {
    return this._makeRequest(path, this._METHODS.POST, options);
  }

  _makeRequest(path, method, options = {}) {
    const requestConfig = this._buildRequestConfig(path, method, options);
    return this._$http(requestConfig)
      .then(response => this._handleResponse(response))
      .catch(rejection => this._handleRejection(rejection));
  }

  _buildRequestUrl(path) {
    return join(this._apiBase, path);
  }

  _buildRequestParams({ params = {} }) {
    return params;
  }

  _buildRequestHeaders({ headers = {} }) {
    return headers;
  }

  _buildRequestData({ data = {} }) {
    return data;
  }

  _buildRequestConfig(path, method, options) {
    const url     = this._buildRequestUrl(path);
    const params  = this._buildRequestParams(options);
    const data    = this._buildRequestData(options);
    const headers = this._buildRequestHeaders(options);

    return { method, url, params, data, headers }
  }

  _handleResponse(response) {
    return response.data;
  }

  _handleRejection(rejection) {
    const { status, data } = rejection;
    return Promise.reject(new TwitterApiHTTPException(status, data));
  }
}
