module.exports = () => [
  {
    method: 'GET',
    path: '/ping',
    config: {
      auth: false,
      notes: 'Returns a todo item by the id passed in the path',
      tags: ['api']
    },
    handler: (request, reply) => {
      reply('OK');
    }
  }
];
