import {
  writeFileSync,
  unlinkSync,
  existsSync,
  mkdirSync,
  createWriteStream
} from 'fs';
import { join as joinPath, resolve as resolvePath } from 'path';
import latex from 'node-latex';
import LatexBuilder from './latex-builder';
import ResumeBuilder from './resume-builder';
import { logger } from './logger';
import { ResumeGeneratorConfig } from './init';

export const generate = (
  config: ResumeGeneratorConfig,
  resume: ResumeBuilder
) => {
  const buildStart = Date.now();
  logger.info(
    'Starting build at ' +
      new Date(buildStart).toLocaleDateString() +
      ' ' +
      new Date(buildStart).toLocaleTimeString()
  );

  // If a custom filename is not provided, generate one based on the name from the resume
  let filename = resume.filename;
  if (!filename) {
    const name = resume.name.split(' ');
    // Format name based on splitNameAt from config
    const formattedName =
      config.splitNameAt === 'first'
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
    logger.info(`Output: dist/${filename.replaceAll(/\s/g, '\u00A0')}.pdf`);
    logger.log('done', `Resume generated successfully`);
  });

  pdf.pipe(output);
};
