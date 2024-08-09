import ResumeBuilder from './resume-builder';

/** Character count where exceeding the limit is likely to
 *  result in a multiline bullet point in the generated PDF
 */
const BULLET_LINE_CHARACTER_LIMIT = 100;

export default class LatexBuilder {
  private resume: ResumeBuilder;
  private multilineBulletWarning = false;

  constructor(resume: ResumeBuilder) {
    this.resume = resume;
  }

  formatMarkdownSyntax(text: string) {
    if (!text) return;
    return text
      .replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}')
      .replace(/\*(.*?)\*/g, '\\emph{$1}')
      .replace(/`(.*?)`/g, '\\texttt{$1}')
      .replace(/__(.*?)__/g, '\\underline{$1}');
  }

  formatReservedCharacters(text: string) {
    if (!text) return;
    return text
      .replaceAll('%', '\\%')
      .replaceAll('&', '\\&')
      .replaceAll('#', '\\#');
  }

  formatDateRange(start: string, end?: string) {
    return `${start}${start === end ? '' : ` -- ${end || 'Present'}`}`;
  }

  headerItem(item: string) {
    item = this.formatReservedCharacters(item);
    if (!/\./.test(item)) return `\\small ${item}`;
    if (/@/.test(item)) return `\\href{mailto:${item}}{\\color{black}${item}}`;
    return `\\href{${item}}{\\underline{${
      /linkedin/i.test(item)
        ? 'LinkedIn'
        : /github/i.test(item)
        ? 'Github'
        : 'Portfolio'
    }}}`;
  }

  projectLink(url: string) {
    if (!url) return;
    url = this.formatReservedCharacters(url);
    const label = /docs/i.test(url)
      ? 'Docs'
      : /github\.com/i.test(url)
      ? 'Github'
      : 'Live Site';
    return `\\href{${url}}{\\underline{${label}}}`;
  }

  descriptionList(list: string[], joiner = '\n') {
    const formatDescriptionItem = (text: string) => {
      if (!text) return;
      if (text.endsWith('.')) text = text.slice(0, -1);
      if (text.length > BULLET_LINE_CHARACTER_LIMIT) {
        this.multilineBulletWarning = true;
      }
      text = this.formatReservedCharacters(text);
      text = this.formatMarkdownSyntax(text);
      return `\\resumeItem{${text}}`;
    };
    return list.map(formatDescriptionItem).join(joiner);
  }

  organizationName(name: string, url?: string) {
    name = this.formatReservedCharacters(name);
    url &&= this.formatReservedCharacters(url);
    return `{${name}${!url ? '' : ` - \\href{${url}}{\\underline{Website}}`}}`;
  }

  /**
   * Resume header section
   */
  get header() {
    const { name, address, phone, email, linkedin, github, portfolio } =
      this.resume;
    const items = [address, phone, email, linkedin, github, portfolio];
    const rows = [];
    for (let i = 0; i < items.length; i += 3) {
      const chunk = items.slice(i, i + 3);
      const row = chunk
        .map((item) => this.headerItem(item))
        // Add a | separator between items
        .join(' ~ $|$ ~ \n');
      rows.push(row);
    }
    return `%----------HEADER----------
\\begin{center}
  \\textbf{\\Huge ${name}} \\\\ \\vspace{8pt}
  ${rows.join(' \\\\ \n\\vspace{2pt}')}
\\end{center}`;
  }

  /**
   * Resume skills section
   */
  get skills() {
    return `%-----------TECHNICAL SKILLS-----------
\\section{Skills}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
      ${this.resume.skills
        .map(
          (s) =>
            `\\textbf{${s.category}}{: ${s.skills
              .map(this.formatReservedCharacters)
              .join(' $|$ ')}}`
        )
        .join(' \\\\ \n\t\t\t')}
    }}
  \\end{itemize}`;
  }

  /**
   * Resume experience section
   */
  get experience() {
    return `%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
    ${this.resume.experience
      .map(
        (x) => `\\resumeSubheading
      {${x.position}}{${this.formatDateRange(x.startDate, x.endDate)}}
      ${this.organizationName(x.organization)}{${x.location}}
    \\resumeItemListStart
      ${this.descriptionList(x.description, '\n\t\t\t')}
    \\resumeItemListEnd`
      )
      .join('\n\t\t')}
  \\resumeSubHeadingListEnd`;
  }

  /**
   * Resume education section
   */
  get education() {
    return `%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    ${this.resume.education
      .map(
        (e) => `\\resumeSubheading
      {${e.institution}}{${this.formatDateRange(e.startDate, e.endDate)}}
      {${e.degree}}{${e.location}}`
      )
      .join('\n\t\t')}
  \\resumeSubHeadingListEnd`;
  }

  /**
   * Resume projects section
   */
  get projects() {
    return `%-----------PROJECTS-----------
\\section{Projects}
  \\resumeSubHeadingListStart
    ${this.resume.projects
      .map(
        (p) => `\\resumeProjectHeading
      {\\textbf{${p.title}} ~ \\emph{${p.stack.join(', ')}}}{${p.links
          .map(link => this.projectLink(link))
          .join(' ~ ')}}
    ${p.description}\\vspace{-4pt}`
      )
      .join('\n')}
  \\resumeSubHeadingListEnd`;
  }

  /** Used at the start of the latex document */
  get begin() {
    const { font, textColor, dividerColor } = this.resume.options;
    return `%-------------------------
% Template based off of: https://github.com/sb2nov/resume
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{hyperref}
\\hypersetup{
    colorlinks = true,
    urlcolor = ${textColor},
}
\\input{glyphtounicode}


%----------FONT----------
${
  font
    ? `\\usepackage${font.familyDefault ? `[${font.familyDefault}]` : ''}{${
        font.package
      }}`
    : ''
}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\color{${textColor}}\\large
}{}{0em}{}
  [\\color{${dividerColor}}\\titlerule \\vspace{-5pt}]
\\titlespacing{\\subsection}{0pt}{3pt}{3pt}

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{0pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\vspace{-2pt} \\\\
      \\small\\textit{#3} & \\small{#4}
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
  \\item
  \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
    \\textit{\\small#1} & \\textit{\\small #2} \\\\
  \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
  \\item
  \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
    #1 & #2 \\\\
  \\end{tabular*}\\vspace{-1pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}`;
  }

  /** Used at the end of the latex document */
  get end() {
    return `%-------------------------------------------
\\end{document}
`;
  }

  get document() {
    return [
      this.begin,
      this.header,
      ...this.resume.sectionOrder.map((section) => {
        if (!this[section]) {
          throw new Error(`Section ${section} does not exist`);
        }
        return this[section];
      }),
      this.end
    ].join('\n\n');
  }

  get warnings() {
    const warningList = [];
    if (this.multilineBulletWarning) {
      warningList.push(
        `Format Warning: Found description items containing > ${BULLET_LINE_CHARACTER_LIMIT} characters
        Multiline bullet points may be incorrectly parsed by ATS as separate items`
      );
    }
    return warningList;
  }
}
