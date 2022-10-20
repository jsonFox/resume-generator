module.exports = {
  heading: ({ name, phone, email, linkedin, github, portfolio }) => `%----------HEADING----------
  \\begin{center}
      \\textbf{\\Huge \\scshape ${name}} \\\\ \\vspace{1pt}
      \\small ${phone} $|$ \\href{mailto:${email}}{\\underline{${email}}} $|$ 
      \\href{${linkedin}}{\\underline{LinkedIn}} $|$
      \\href{${github}}{\\underline{Github}} $|$
      \\href{${portfolio}}{\\underline{Portfolio}}
  \\end{center}`,
  education: (edList) => `%-----------EDUCATION-----------
  \\section{Education}
    \\resumeSubHeadingListStart
      ${edList.map(e => `\\resumeSubheading
      {${e.university}}{${e.location}}
      {${e.degree}}{${e.date}}`).join('\n')}
    \\resumeSubHeadingListEnd`,
  projects: (projList) => `%-----------PROJECTS-----------
  \\section{Projects}
      \\resumeSubHeadingListStart
        ${projList.map(p => `\\resumeProjectHeading
        {\\textbf{${p.name}} $|$ \\emph{${p.stack.join(', ')}}}{${p.links.map(l => `\\href{${l.url}}{\\underline{${l.label}}}`).join(' $|$ ')}}
        \\resumeItemListStart
          ${p.details.map(li => `\\resumeItem{${li}}`).join('\n')}
        \\resumeItemListEnd`).join('\n')}
      \\resumeSubHeadingListEnd`,
  experience: (expList) => `%-----------EXPERIENCE-----------
  \\section{Experience}
    \\resumeSubHeadingListStart
      ${expList.map(w => `\\resumeSubheading
      {${w.position}}{${w.date}}
      {${w.company}}{${w.location}}
      \\resumeItemListStart
        ${w.details.map(li => `\\resumeItem{${li}}`).join(' \\\\ \n')}
      \\resumeItemListEnd`).join('\n')}
    \\resumeSubHeadingListEnd`,
  skills: (skillsList) => `%-----------PROGRAMMING SKILLS-----------
  \\section{Technical Skills}
   \\begin{itemize}[leftmargin=0.15in, label={}]
      \\small{\\item{
        ${skillsList.map(s => `\\textbf{${s.label}}{: ${s.list.join(', ')}}`).join('\n')}
      }}
   \\end{itemize}`
}