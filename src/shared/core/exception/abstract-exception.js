import ExtendableError from 'es6-error';


/**
 * @abstract
 */
export class AbstractException extends ExtendableError {
  /**
   * @abstract
   * @type {string}
   */
  name = 'AbstractException';

  constructor(...args) {
    super();

    const { message, code } = this._processExceptionData(...args);

    this.message = message;
    this.code    = code;
  }

  toObject() {
    return {
      message: this.message,
      name: this.name,
      code: this.code,
    };
  }

  toString() {
    return `${super.toString()} [${this.code}]`;
  }


  toJSON() {
    return this.toObject();
  }

  /**
   * @abstract
   *
   * @return {{code:Number, message: String}}
   */
  _processExceptionData() {
    throw new Error('not implemented');
  }
}
