const { getSessionScore } = require('../src/score');

const Boom = require('boom');

module.exports = () => [
  {
    method: 'GET',
    path: '/score/{username}',
    config: {
      auth: false,
      tags: ['api']
    },
    handler: async (request, reply) => {
      const { params: { username } } = request;
      try {
        const result = await getSessionScore(username);
        reply(result);
      } catch (error) {
        console.log(error);
        reply(Boom.badImplementation());
      }
    }
  }];
