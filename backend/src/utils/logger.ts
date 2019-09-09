import path from 'path';
import winston from 'winston';

const logger = new winston.Logger({
  transports: ['error', 'warn', 'info'].map(
    level =>
      new winston.transports.File({
        name: `${level}-file`,
        filename: path.join(__dirname, `../logs/${level}.log`),
        level,
      })
  ),
});

export default logger;
