import {
  writeFileSync,
  unlinkSync,
  existsSync,
  mkdirSync,
  createWriteStream
} from 'fs';
import { join as joinPath, resolve as resolvePath } from 'path';
import latex from 'node-latex';
import { builderConfig } from './config';
import LatexBuilder from './latex-builder';
import ResumeBuilder from './resume-builder';
import { logger } from './logger';

export const generate = (resume: ResumeBuilder) => {
  // Perform validations before proceeding
  try {
    if (!(resume instanceof ResumeBuilder)) {
      throw new Error('Invalid resume object');
    }
    if (!resume.name) {
      throw new Error('Name is required in the resume object');
    }
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }

  const buildStart = Date.now();

  // If a custom filename is not provided, generate one based on the name from the resume
  let filename = resume.filename;
  if (!filename) {
    const name = resume.name.split(' ');
    // Format name based on splitNameAt from config
    const formattedName =
      builderConfig.splitNameAt === 'first'
        ? `${name.slice(1, name.length).join(' ')}, ${name[0]}`
        : `${name.at(-1)}, ${name.slice(0, -2).join(' ')}`;
    filename = `${formattedName} - Resume - ${new Date().getFullYear()}`;
  }

  // Create dist/ if it doesn't exist, otherwise node fs will throw an error
  const outputDir = resolvePath(__dirname, '../dist');
  if (!existsSync(outputDir)) mkdirSync(outputDir);

  logger.info('Generating TeX file');
  // Get LaTeX document as string
  const latexDoc = new LatexBuilder(resume).document;
  // Write LaTeX document to file
  writeFileSync(joinPath(outputDir, filename + '.tex'), latexDoc);

  logger.info('Compiling to PDF');
  const output = createWriteStream(joinPath(outputDir, filename + '.pdf'));
  // Compile LaTeX document to PDF
  const pdf = latex(latexDoc);

  // Handle errors during compilation
  pdf.on('error', (err) => {
    logger.error(err);
    if (existsSync(joinPath(outputDir, filename + '.pdf'))) {
      unlinkSync(joinPath(outputDir, filename + '.pdf'));
    }
    process.exit(1);
  });

  // Handle successful compilation
  pdf.on('finish', () => {
    const buildEnd = Date.now();
    const buildTime = (buildEnd - buildStart) / 1000;
    logger.info(`Build time: ${buildTime}s`);
    logger.log('done', 'Resume generated successfully, see dist/ for output');
  });

  pdf.pipe(output);
};
