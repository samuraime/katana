import mongoose from 'mongoose';
import config from '../config';
import '../models/Archive';
import '../models/Article';
import '../models/User';
import '../models/Yume';

mongoose.Promise = global.Promise;

const connect = () => {
  // reconnect only when initial connect successfully
  mongoose
    .connect(config.db, {
      autoReconnect: true,
      useMongoClient: true,
      reconnectTries: 30,
      reconnectInterval: 1000, // ms
    })
    .then(() => {
      console.log('connected to %s', config.db);
    })
    .catch(error => {
      console.log(error);
    });
};

export default connect;
