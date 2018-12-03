module.exports = () => [
  {
    method: 'GET',
    path: '/ping',
    config: {
      auth: false,
      tags: ['api']
    },
    handler: (request, reply) => {
      reply('pong');
    }
  }
];
