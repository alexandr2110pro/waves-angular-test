export class SubscriberComponent {
  constructor() {
    this._unsub = [];
  }

  /**
   *
   * @param handler
   * @return {SubscriberComponent|{_handleAction: (action), destroy: ()}}
   */
  static decorate(handler) {
    return new Decorated(handler);
  }

  $onDestroy() {
    this._unsub.forEach(f => f());
    this._unsub = [];
  }

  /**
   * @abstract
   * You need to implement it on your own!
   *
   * @param {object} action
   */
  _handleAction(action) {
    throw new Error('Not Implemented');
  }


  /**
   * @param {PubSub[]} publishers
   */
  _subscribeTo(publishers) {
    publishers.map(
      p => this._unsub.push(p.subscribe(action => this._handleAction(action))));
  }
}

class Decorated extends SubscriberComponent {
  constructor(handler) {
    super();
    this._handler              = handler;
    this._handler._subscribeTo = (publishers) => this._subscribeTo(publishers)
  }

  _handleAction(action) {
    this._handler._handleAction(action);
  }
}
