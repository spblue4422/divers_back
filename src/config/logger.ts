import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        // nestWinstonModuleUtilities.format.nestLike(process.env.PROJECT_NAME),
      ),
    }),
  ],
});
