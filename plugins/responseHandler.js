exports.register = (server, options, next) => {
  server.ext('onPreResponse', (request, reply) => {
    return reply.continue();
  });
  next();
};

exports.register.attributes = {
  name: 'responseHandler',
  version: '1.0.0'
};
