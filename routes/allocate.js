const { allocate } = require('../src/allocate');
const { DUPLICATE_ENTRY } = require('../constants/errorMaps');

const Boom = require('boom');

module.exports = () => [
  {
    method: 'POST',
    path: '/allocate/user',
    config: {
      auth: false,
      tags: ['api']
    },
    handler: async (request, reply) => {
      const { payload: { userName } } = request;
      try {
        const result = await allocate(userName);
        reply(result);
      } catch (error) {
        // TODO: implement logger
        console.log(error); // eslint-disable-line
        if (error.code === DUPLICATE_ENTRY.dbCode) {
          reply(Boom.badRequest(DUPLICATE_ENTRY.message));
        }
        reply(Boom.badImplementation());
      }
    }
  }
];
