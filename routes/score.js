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
        // TODO: implement logger
        console.log(error); // eslint-disable-line
        reply(Boom.badImplementation());
      }
    }
  }];
