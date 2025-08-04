const handler = require('../HttpHelloWorld/index.js');

describe('HttpHelloWorld Function', () => {
  it('should return Hello, world! when no name is passed', async () => {
    const req = {
      query: new Map(),
      text: async () => '',
      url: '/api/HttpHelloWorld'
    };

    const context = {
      log: () => {},
      res: {}
    };

    await handler(context, req);

    expect(context.res.body).toContain('Hello, world');
  });

  it('should return Hello, Denish! when name is passed', async () => {
    const req = {
      query: new Map([['name', 'Denish']]),
      text: async () => '',
      url: '/api/HttpHelloWorld'
    };

    const context = {
      log: () => {},
      res: {}
    };

    await handler(context, req);

    expect(context.res.body).toContain('Hello, Denish');
  });

  it('should return Hello, test-body! if no query but body exists', async () => {
    const req = {
      query: new Map(),
      body: {
        name: 'test-body'
      },
      url: '/api/HttpHelloWorld'
    };

    const context = {
      log: () => {},
      res: {}
    };

    await handler(context, req);

    expect(context.res.body).toContain('Hello, test-body');
  });
});
