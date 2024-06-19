import * as fs from 'fs';
import * as path from 'path';
import latex from 'node-latex';
import { builderConfig } from './config';
import LatexBuilder from './latex-builder';
import ResumeBuilder from './resume-builder';

export const generate = (resume: ResumeBuilder) => {
  if (!(resume instanceof ResumeBuilder)) {
    console.error('Invalid resume object');
    process.exit(1);
  }
  if (!resume.name) {
    console.error('Name is required in the resume object');
    process.exit(1);
  }

  console.time('Build time');

  let filename = resume.filename;
  if (!filename) {
    const name = resume.name.split(' ');
    const formattedName =
      builderConfig.splitNameAt === 'first'
        ? `${name.slice(1, name.length).join(' ')}, ${name[0]}`
        : `${name.at(-1)}, ${name.slice(0, -2).join(' ')}`;
    filename = `${formattedName} - Resume - ${new Date().getFullYear()}`;
  }

  const outputDir = path.resolve(__dirname, '../dist');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  console.info('Generating TeX file');
  // Get LaTeX document as string
  const latexDoc = new LatexBuilder(resume).document;
  // Write LaTeX document to file
  fs.writeFileSync(path.join(outputDir, filename + '.tex'), latexDoc);

  console.info('Compiling to PDF');
  const output = fs.createWriteStream(path.join(outputDir, filename + '.pdf'));
  // Compile LaTeX document to PDF
  const pdf = latex(latexDoc);

  // Handle errors during compilation
  pdf.on('error', (err) => {
    console.error(err);
    if (fs.existsSync(path.join(outputDir, filename + '.pdf'))) {
      fs.unlinkSync(path.join(outputDir, filename + '.pdf'));
    }
    process.exit(1);
  });

  // Handle successful compilation
  pdf.on('finish', () => {
    console.timeEnd('Build time');
    console.info('Resume generated successfully, see dist/ for output');
  });

  pdf.pipe(output);
};
