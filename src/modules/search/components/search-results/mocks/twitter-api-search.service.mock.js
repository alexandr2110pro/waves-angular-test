import { PubSub } from 'shared/pub-sub';


export const SUCCESS_RESPONSE = {
  search_metadata: {
    query: 'query',
  },
  statuses: [
    {
      id: 11111,
      id_str: '11111',
      text: 'text1',
      user: { name: 'name1', profile_image_url: 'image1' },
    }, {
      id: 11112,
      id_str: '11112',
      text: 'text2',
      user: { name: 'name2', profile_image_url: 'image2' },
    }, {
      id: 11113,
      id_str: '11113',
      text: 'text3',
      user: { name: 'name3', profile_image_url: 'image3' },
    },
  ],
};


export class TwitterApiSearchServiceMock extends PubSub {

  successResponse = SUCCESS_RESPONSE;

  search(query, params) {
    return Promise.resolve(this.successResponse);
  }

}
