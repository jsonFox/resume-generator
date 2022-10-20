const { pre, end }= require('./static')
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
  
  
}