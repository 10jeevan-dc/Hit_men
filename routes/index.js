const Ping = require('./ping');
const Allocate = require('./allocate');
const Play = require('./play');
const Score = require('./score');

module.exports = () => {
  const routes = [].concat(
    Ping(),
    Allocate(),
    Play(),
    Score()
  );
  return routes;
};
