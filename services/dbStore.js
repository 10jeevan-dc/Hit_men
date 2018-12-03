const mysql = require('mysql2/promise');
const Nconf = require('nconf');

const dbOptions = Nconf.get('database');

const connectionPool = mysql.createPool(dbOptions);

module.exports = {
  connectionPool
};
