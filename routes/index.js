const Ping = require('./ping');

module.exports = () => {
  const routes = [].concat(Ping());
  // const conf = Nconf.argv().env();
  // const dmpenv = conf.get('DMPENV');
  return routes;
};
