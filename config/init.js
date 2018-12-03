const Nconf = require('nconf');
const cls = require('cls-hooked');
const _ = require('lodash');
const DefaultConfig = require('./default');
const path = require('path');

const loadConfig = (overrides) => {
  // sets override first then loads rest of the functions
  if (!_.isUndefined(overrides)) {
    Nconf.overrides(overrides);
  }
  //
  // Setup nconf to use (in-order):
  //   1. Command-line arguments
  //   2. Environment variables
  //   3. A file located at 'path/to/config.json'
  const conf = Nconf.argv().env();
  const demoEnv = conf.get('DEMO_ENV');
  let envFile = path.join(__dirname, `${demoEnv}.json`);
  if (!demoEnv) {
    envFile = path.join(__dirname, 'production.json');
  }

  // nconf does not throw exception when file path does not resolve.
  // However it does throw exception if its unable to parse the exception.
  // Loggin the exception if we fail to parse the json file.
  try {
    Nconf.file({ file: envFile });
  } catch (e) {
      console.log('unable to parse the json file', e); // eslint-disable-line
  }
  // Defaults should be the last line
  // as this would enter the missing fields from defaults.
  Nconf.defaults(DefaultConfig);
};

const getTransactionObject = () => {
  const { clsNamespace, transactionObjectName } = Nconf.get('cls');
  const namespace = cls.getNamespace(clsNamespace);
  const transactionObject = namespace.get(transactionObjectName);
  return transactionObject || {};
};

const getTransactionId = () => {
  const transactionObject = getTransactionObject();
  return transactionObject && transactionObject.transactionId;
};

const getConfig = (overides) => {
  loadConfig(overides);
  const config = Nconf.get();
  return config;
};

module.exports = {
  getTransactionObject,
  getTransactionId,
  getConfig
};
