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

  console.time("Build time")

  const dir = path.resolve(__dirname, '../dist')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)

  console.info('Generating TeX file')
  fs.writeFileSync(path.join(dir, 'resume.tex'), resume)

  console.info('Compiling to PDF')
  const name = r.heading.name.split(' ')
  const filename = `${name.at(-1)}, ${name[0]} - Resume - ${new Date().getFullYear()}.pdf`
  const input = fs.createReadStream(path.join(dir, 'resume.tex'))
  const output = fs.createWriteStream(path.join(dir, filename))
  const pdf = latex(input)

  pdf.pipe(output)
  pdf.on('error', endBuild)
  pdf.on('finish', () => endBuild())
}

const endBuild = (err) => {
  console.timeEnd("Build time")

  if (err) {
    console.error(err)
  }
}