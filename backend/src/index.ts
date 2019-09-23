import app from './app';
import config from './config';
import connectMongo from './utils/connectMongo';

connectMongo();

app.listen(config.port);
console.log(`Listening on port ${config.port}`);
