const { getNumberOfPlayers } = require('../src/info');

const Boom = require('boom');

module.exports = () => [
  {
    method: 'GET',
    path: '/info/player-count',
    config: {
      auth: false,
      tags: ['api']
    },
    handler: async (request, reply) => {
      try {
        const result = await getNumberOfPlayers();
        reply(result);
      } catch (error) {
        // TODO: implement logger
        console.log(error); // eslint-disable-line
        reply(Boom.badImplementation());
      }
    }
  }];
