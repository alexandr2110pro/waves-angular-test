import { StatefulService } from 'shared/state';


export class TwitterApiSearchService extends StatefulService {

  _RESOURCES = {
    TWEETS_SEARCH: '1.1/search/tweets.json',
  };

  /**
   *
   * @param TWITTER_API_SEARCH_ACTIONS
   * @param {TwitterApiService} TwitterApiService
   */
  constructor(TWITTER_API_SEARCH_ACTIONS, TwitterApiService) {
    'ngInject';

    super('TWITTER_API_SEARCH', false, null, TWITTER_API_SEARCH_ACTIONS);

    this._TwitterApiService = TwitterApiService;
  }

  search(query, params) {
    const getParams = {
      ...params,
      q: query,
    };

    return this._TwitterApiService
      .get(this._RESOURCES.TWEETS_SEARCH, { params: getParams });
  }


}
