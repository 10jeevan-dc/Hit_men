// Enable CLS - should be the first LOC to be invoked, even before NewRelic
const cls = require('cls-hooked');
// Add newrelic monitoring, after CLS

const Hapi = require('hapi');
const Nconf = require('nconf');
const Config = require('./config/init');
const HapiApiVersion = require('hapi-api-version');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const Pack = require('./package');

// Since we logger is used in Plugins / Routes, we need it load config before loading them
Nconf.defaults(Config.getConfig());

// Create App Level Namespace
const { clsNamespace } = Nconf.get('cls');
cls.createNamespace(clsNamespace);

// Load Plugins after loading config & namespace creation since they depend on
// 1. Namespace for TransactionID mapping
// 2. Logger which requires the env. specific configuration
const RequestHandler = require('./plugins/requestHandler');
const ResponseHandler = require('./plugins/responseHandler');

// Create Server and Register Routes
const server = new Hapi.Server({});

// Disable CORS per recommendation from Tyk Team
// Microservice doesn't need to handle CORS on its own
// Tyk API does that for DMP
server.connection({
  port: 8080,
  routes: {
    cors: false
  }
});

const options = {
  info: {
    title: 'Hit Men API Documentation',
    version: Pack.version
  },
  auth: false,
  sortEndpoints: 'method',
  lang: 'en',
  documentationPage: true,
  swaggerUI: true
};

const apiVersionOptions = {
  validVersions: [1],
  defaultVersion: 1,
  vendorName: 'demo'
};

server.register([{
  register: Inert
}, {
  register: Vision
}, {
  register: RequestHandler
}, {
  register: ResponseHandler
}, {
  register: HapiSwagger,
  options
}, {
  register: HapiApiVersion,
  options: apiVersionOptions
}]);

const Routes = require('./routes');

server.route(Routes(server));

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw err;
    }
    server.log(`Server running at: ${server.info.uri}`);
  });
}
module.exports = server;
