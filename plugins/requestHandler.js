const cls = require('cls-hooked');
const Cuid = require('cuid');
const Nconf = require('nconf');

const { clsNamespace, transactionObjectName } = Nconf.get('cls');
const namespace = cls.getNamespace(clsNamespace);
const transactionHeader = Nconf.get('api').header.transactionId;

exports.register = (server, options, next) => {
  server.ext('onRequest', (request, reply) => {
    namespace.bindEmitter(request.raw.req);
    namespace.bindEmitter(request.raw.res);
    return namespace.run(() => {
      const transactionId = request.headers[transactionHeader] || Cuid();
      const { path } = request.url;
      request.id = transactionId;
      request.app.startTime = Date.now();
      namespace.set(transactionObjectName, { transactionId, path });
      return reply.continue();
    });
  });
  next();
};

exports.register.attributes = {
  name: 'requestHandler',
  version: '1.0.0'
};
