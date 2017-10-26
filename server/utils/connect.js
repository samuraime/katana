const fs = require('fs');
const { join } = require('path');
const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

// load all models
const models = join(__dirname, '../models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/)) // eslint-disable-line
  .forEach((file) => {
    require(join(models, file)); // eslint-disable-line
  });

const connect = () => {
  mongoose.connect(config.db, {
    autoReconnect: true,
    useMongoClient: true,
    reconnectTries: 30,
    reconnectInterval: 1000, // ms
  })
    .then(() => {
      console.log('connected to %s', config.db);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
