import winston = require('winston');
import { generate } from './lib/compiler';
import { logger } from './lib/logger';
import resume from './resume/resume';
import ResumeBuilder from './lib/resume-builder';
import { existsSync } from 'fs';
import { ResumeGeneratorConfig } from './lib/init';

const pathToConfig = './config.json';

async function main() {
  try {
    // Perform validations before attempting to generate the resume
    if (!existsSync(pathToConfig)) {
      throw new Error(
        'Config file not found, run `npm run init` to create one'
      );
    }

    const config: ResumeGeneratorConfig = await import(pathToConfig);

    // Set up logger file output if enabled in config
    if (config.logging) {
      const logFile = Date.now() + '.log';
      logger.add(
        new winston.transports.File({
          filename: 'logs/' + logFile
        })
      );
    }

    if (!(resume instanceof ResumeBuilder)) {
      throw new Error('Invalid resume object');
    }

    if (!resume.name) {
      throw new Error('Name is required in the resume object');
    }

    generate(config, resume);
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }
}

main();
