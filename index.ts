import winston = require('winston');
import { generate } from './lib/compiler';
import { builderConfig } from './lib/config';
import { logger } from './lib/logger';
import resume from './resume/resume';

async function main() {
  if (builderConfig.logging) {
    const logFile = Date.now() + '.log';
    logger.add(
      new winston.transports.File({
        filename: 'logs/' + logFile,
      })
    );
  }

  generate(resume);
}

main();
