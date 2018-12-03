const { start, stop, hit } = require('../src/play');

const Boom = require('boom');

module.exports = () => [
  {
    method: 'GET',
    path: '/start/{username}',
    config: {
      auth: false,
      tags: ['api']
    },
    handler: async (request, reply) => {
      const { params: { username } } = request;
      try {
        const result = await start(username);
        reply(result);
      } catch (error) {
        reply(Boom.badImplementation());
      }
    }
  },
  {
    method: 'GET',
    path: '/stop/{username}',
    config: {
      auth: false,
      tags: ['api']
    },
    handler: async (request, reply) => {
      const { params: { username } } = request;
      try {
        const result = await stop(username);
        reply(result);
      } catch (error) {
        reply(Boom.badImplementation());
      }
    }
  },
  {
    method: 'PATCH',
    path: '/hit/{username}',
    config: {
      auth: false,
      tags: ['api']
    },
    handler: async (request, reply) => {
      const { params: { username } } = request;
      try {
        const result = await hit(username);
        reply(result);
      } catch (error) {
        reply(Boom.badImplementation());
      }
    }
  }
];
