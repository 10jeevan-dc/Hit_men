const { allocate } = require('../src/allocate');
const { DUPLICATE_ENTRY } = require('../constants/errorMaps');

const Boom = require('boom');

module.exports = () => [
  {
    method: 'GET',
    path: '/allocate/user/{username}',
    config: {
      auth: false,
      tags: ['api']
    },
    handler: async (request, reply) => {
      const { params: { username } } = request;
      try {
        const result = await allocate(username);
        reply(result);
      } catch (error) {
        if (error.code === DUPLICATE_ENTRY.dbCode) {
          reply(Boom.badRequest(DUPLICATE_ENTRY.message));
        }
        reply(Boom.badImplementation());
      }
    }
  }
];
