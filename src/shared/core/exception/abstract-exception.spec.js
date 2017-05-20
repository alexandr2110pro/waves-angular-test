import { AbstractException } from './abstract-exception';


describe('AbstractException', () => {

  class TestException extends AbstractException {

    name = 'TestException';

    constructor(code, data) {
      super(code, data);
      this.foo = 'bar';
    }

    _processExceptionData(code, data) {
      return {
        code: Number(code),
        message: data.message,
      };
    }
  }

  describe('Extended class instance', () => {
    let instance;

    beforeEach(() => instance = new TestException('400', { message: 'foo' }));

    it('should be instance of Error', () => {
      expect(instance instanceof Error).toEqual(true);
    });

    it('should have code property', () => {
      expect(instance.code).toEqual(400);
    });


    it('should have message property', () => {
      expect(instance.message).toEqual('foo');
    });


    it('should have message property', () => {
      expect(instance.name).toEqual('TestException');
    });

    it('toObject() should return expected value', () => {
      expect(instance.toObject()).toEqual({
        code: 400,
        name: 'TestException',
        message: 'foo',
      });
    });

    it('json representation should be correct', () => {
      expect(JSON.stringify(instance)).toEqual(JSON.stringify({
        message: 'foo',
        name: 'TestException',
        code: 400,
      }));
    });

    it('toString() should return proper message', () => {
      expect(String(instance)).toEqual('TestException: foo [400]');
    });

    it('should have foo property', () => {
      expect(instance.foo).toEqual('bar');
    })

  });

});
