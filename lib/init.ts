import { writeFileSync as writeFile } from 'fs';
import { logger } from './logger';

export type ResumeGeneratorConfig = {
  /** Enable/disable log file output */
  logging: boolean;

  /** If first/last name is multiple words, split at that point
   *
   *  `first`: Jennifer Cordero Alvarez => Cordero Alvarez, Jennifer
   *
   *  `last`: Jennifer Cordero Alvarez => Alverez, Jennifer Cordero
   */
  splitNameAt: 'first' | 'last';
};

const defaultConfig: ResumeGeneratorConfig = {
  logging: false,
  splitNameAt: 'first'
};

// Generate a default config file
function main() {
  writeFile('config.json', JSON.stringify(defaultConfig, null, 2));
  logger.info('Config file created, see lib/init.ts for configuration options');
}

main();
