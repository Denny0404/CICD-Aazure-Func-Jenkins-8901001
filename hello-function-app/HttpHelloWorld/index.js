// export the handler function separately
async function httpHelloHandler(request, context) {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';
    return { body: `Hello, ${name}!` };
}

// Required by Azure Function runtime
const { app } = require('@azure/functions');
app.http('HttpHelloWorld', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: httpHelloHandler
});

// Export handler for testing
module.exports = httpHelloHandler;
