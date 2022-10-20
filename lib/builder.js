const fs = require('fs')
const path = require('path')
const latex = require('node-latex')
const { pre, end } = require('./static')
const sec = require('./sections')

module.exports = (r) => {
  const resume = [
    pre,
    sec.heading(r.heading),
    sec.education(r.education),
    sec.projects(r.projects),
    sec.skills(r.skills),
    sec.experience(r.experience),
    end
  ].join('\n\n')

  const dir = path.join(__dirname, 'dist')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)

  console.info('Generating TeX file')
  fs.writeFileSync(path.join(dir, 'resume.tex'), resume)

  console.info('Compiling to PDF')
  const input = fs.createReadStream(path.join(dir, 'resume.tex'))
  const output = fs.createWriteStream(path.join(dir, 'resume.pdf'))
  const pdf = latex(input)

  pdf.pipe(output)
  pdf.on('error', err => {
    console.error(err)
    process.exit(1)
  })
  pdf.on('finish', () => {
    console.info('Build completed in', console.timeEnd())
    process.exit(0)
  })
}