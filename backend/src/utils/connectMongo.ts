import mongoose from 'mongoose';
import config from '../config';

mongoose.Promise = global.Promise;

const connect = (): Promise<typeof mongoose> => {
  // reconnect only when initial connect successfully
  return mongoose.connect(config.db, {
    autoReconnect: true,
    reconnectTries: 30,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

export default connect;
