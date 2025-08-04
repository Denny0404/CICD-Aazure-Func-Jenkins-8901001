const handler = require('../src/functions/HttpHelloWorld');

describe('HttpHelloWorld Function', () => {
  it('should return Hello, world! when no name is passed', async () => {
    const req = {
      query: new Map(),
      text: async () => '',
      url: '/api/HttpHelloWorld'
    };
    const context = { log: () => {} };
    const result = await handler(req, context);
    expect(result.body).toBe('Hello, world!');
  });

  it('should return Hello, Denish! when name is passed', async () => {
    const req = {
      query: new Map([['name', 'Denish']]),
      text: async () => '',
      url: '/api/HttpHelloWorld'
    };
    const context = { log: () => {} };
    const result = await handler(req, context);
    expect(result.body).toBe('Hello, Denish!');
  });

  it('should return Hello, test-body! if no query but body exists', async () => {
    const req = {
      query: new Map(),
      text: async () => 'test-body',
      url: '/api/HttpHelloWorld'
    };
    const context = { log: () => {} };
    const result = await handler(req, context);
    expect(result.body).toBe('Hello, test-body!');
  });
});
