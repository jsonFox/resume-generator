import * as winston from 'winston';

// Create a new logger instance
const loggerInstance = () => {
  const loggerInstance = winston.createLogger({
    level: 'info',
    levels: {
      ...winston.config.syslog.levels,
      done: 1,
      warn: 2
    },
    format: winston.format.combine(
      winston.format.align(),
      winston.format.simple(),
      winston.format.colorize({
        level: true,
        colors: { info: 'blue', done: 'green' }
      })
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    ]
  });
  return loggerInstance;
};

const globalLogger = global as unknown as { logger: winston.Logger };

// Export logger, if global logger is not set, create a new logger instance
export const logger =
  (globalLogger.logger as winston.Logger) || loggerInstance();
