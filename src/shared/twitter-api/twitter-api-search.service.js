import { StatefulService } from 'shared/state';


export class TwitterApiSearchService extends StatefulService {


  _RESOURCES = {
    TWEETS_SEARCH: 'search/tweets.json',
  };

  /**
   *
   * @param TWITTER_API_SEARCH_ACTIONS
   * @param {TwitterApiService} TwitterApiService
   */
  constructor(TWITTER_API_SEARCH_ACTIONS, TwitterApiService) {
    'ngInject';

    super('twitter-api', true, null, TWITTER_API_SEARCH_ACTIONS);

    this._TwitterApiService = TwitterApiService;
  }

  search() {
  }
}
