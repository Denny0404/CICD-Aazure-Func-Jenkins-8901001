module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');

    const name = (req.query.get?.('name')) || (req.body && req.body.name);

    const responseMessage = name
        ? `Hello, ${name}! This HTTP triggered function executed successfully.`
        : "Hello, world! This HTTP triggered function executed successfully.";

    context.res = {
        status: 200,
        body: responseMessage
    };
};
