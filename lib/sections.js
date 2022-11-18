const { headingItem, projectLink, detailsList } = require('./components');

module.exports = {
  heading: (h) => `%----------HEADING----------
\\begin{center}
  \\textbf{\\Huge \\scshape ${h.name}} \\\\ \\vspace{1pt}
  ${headingItem(h.location)} ~
  ${headingItem(h.phone)} ~
  ${headingItem(h.email)}  \\\\
  ${headingItem(h.linkedin)}  ~
  ${headingItem(h.github)}  ~
  ${headingItem(h.portfolio)} 
\\end{center}`,

  education: (edList) => `%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    ${edList
      .map(
        (e) => `\\resumeSubheading
      {${e.university}}{${e.date}}
      {${e.degree}}{${e.location}}`
      )
      .join('\n\t\t')}
  \\resumeSubHeadingListEnd`,

  projects: (projList) => `%-----------PROJECTS-----------
\\section{Projects}
  \\resumeSubHeadingListStart
    ${projList
      .map(
        (p) => `\\resumeProjectHeading
      {\\textbf{${p.name}} ~ \\emph{${p.stack.join(', ')}}}{${p.links
          .map(projectLink)
          .join(' ~ ')}}
    \\resumeItemListStart
      ${detailsList(p.details, '\n\t\t\t')}
    \\resumeItemListEnd`
      )
      .join('\n')}
  \\resumeSubHeadingListEnd`,

  experience: (expList) => `%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
    ${expList
      .map(
        (w) => `\\resumeSubheading
      {${w.position}}{${w.date}}
      {${w.company}}{${w.location}}
    \\resumeItemListStart
      ${detailsList(w.details, '\n\t\t\t')}
    \\resumeItemListEnd`
      )
      .join('\n\t\t')}
  \\resumeSubHeadingListEnd`,

  skills: (skillsList) => `%-----------PROGRAMMING SKILLS-----------
\\section{Technical Skills}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
      ${skillsList
        .map((s) => `\\textbf{${s.label}}{: ${s.list.join(', ')}}`)
        .join(' \\\\ \n\t\t\t')}
    }}
  \\end{itemize}`
};
