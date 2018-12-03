const Ping = require('./ping');
const Allocate = require('./allocate');

module.exports = () => {
  const routes = [].concat(Ping(), Allocate());
  return routes;
};
