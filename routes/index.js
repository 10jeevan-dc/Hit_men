const Ping = require('./ping');
const Allocate = require('./allocate');
const Play = require('./play');
const Score = require('./score');
const Info = require('./info');

module.exports = () => {
  const routes = [].concat(
    Ping(),
    Allocate(),
    Play(),
    Score(),
    Info()
  );
  return routes;
};
