import { FontDefinition } from './fonts';
import ResumeBuilder from './resume-builder';
import {
  IResumeEducationItem,
  IResumeExperienceItem,
  IResumeProjectItem,
  IResumeSkillsItem
} from './types';

export default class LatexBuilder {
  private resume: ResumeBuilder;

  constructor(resume: ResumeBuilder) {
    this.resume = resume;
  }

  static formatMarkdownSyntax(text: string) {
    if (!text) return;
    return text
      .replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}')
      .replace(/\*(.*?)\*/g, '\\emph{$1}')
      .replace(/`(.*?)`/g, '\\texttt{$1}')
      .replace(/__(.*?)__/g, '\\underline{$1}');
  }

  static formatReservedCharacters(text: string) {
    if (!text) return;
    return text
      .replaceAll('%', '\\%')
      .replaceAll('&', '\\&')
      .replaceAll('#', '\\#');
  }

  static formatDateRange(start: string, end?: string) {
    return `${start}${start === end ? '' : ` -- ${end || 'Present'}`}`;
  }

  static headerItem(item: string) {
    item = this.formatReservedCharacters(item);
    if (!/\./.test(item)) return `\\small ${item}`;
    if (/@/.test(item)) return `\\href{mailto:${item}}{${item}}`;
    return `\\href{${item}}{\\underline{${
      /linkedin/i.test(item)
        ? 'LinkedIn'
        : /github/i.test(item)
        ? 'Github'
        : 'Portfolio'
    }}}`;
  }

  static projectLink(url: string) {
    if (!url) return;
    url = LatexBuilder.formatReservedCharacters(url);
    const label = /docs/i.test(url)
      ? 'Docs'
      : /github\.com/i.test(url)
      ? 'Github'
      : 'Live Site';
    return `\\href{${url}}{\\underline{${label}}}`;
  }

  static descriptionList(list: string[], joiner = '\n') {
    const formatDescriptionItem = (text: string) => {
      if (!text) return;
      if (!text.endsWith('.')) text += '.';
      text = this.formatReservedCharacters(text);
      text = this.formatMarkdownSyntax(text);
      return `\\resumeItem{${text}}`;
    };
    return list.map(formatDescriptionItem).join(joiner);
  }

  static organizationName(name: string, url?: string) {
    name = this.formatReservedCharacters(name);
    url &&= this.formatReservedCharacters(url);
    return `{${name}${!url ? '' : ` - \\href{${url}}{\\underline{Website}}`}}`;
  }

  /**
   * Resume header section
   * @param name - Name of the Resume owner
   * @param items - Array of items to be displayed in the header
   */
  static header(name: string, ...items: string[]) {
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
  \\textbf{\\Huge \\scshape ${name}} \\\\ \\vspace{8pt}
  ${rows.join(' \\\\ \n\\vspace{2pt}')}
\\end{center}`;
  }

  /** Instanced header section builder */
  get header() {
    const { name, address, phone, email, linkedin, github, portfolio } =
      this.resume;
    return LatexBuilder.header(
      name,
      address,
      phone,
      email,
      linkedin,
      github,
      portfolio
    );
  }

  /**
   * Resume skills section
   * @param items - Array of skill items
   */
  static skills(items: IResumeSkillsItem[]) {
    return `%-----------TECHNICAL SKILLS-----------
\\section{Skills}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
      ${items
        .map(
          (s) =>
            `\\textbf{${s.category}}{: ${s.skills
              .map(this.formatReservedCharacters)
              .join(', ')}}`
        )
        .join(' \\\\ \n\t\t\t')}
    }}
  \\end{itemize}`;
  }

  /** Instanced skills section builder */
  get skills() {
    return LatexBuilder.skills(this.resume.skills);
  }

  /**
   * Resume experience section
   * @param items - Array of experience items
   */
  static experience(items: IResumeExperienceItem[]) {
    return `%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
    ${items
      .map(
        (x) => `\\resumeSubheading
      {${x.position}}{${LatexBuilder.formatDateRange(x.startDate, x.endDate)}}
      ${LatexBuilder.organizationName(x.organization)}{${x.location}}
    \\resumeItemListStart
      ${LatexBuilder.descriptionList(x.description, '\n\t\t\t')}
    \\resumeItemListEnd`
      )
      .join('\n\t\t')}
  \\resumeSubHeadingListEnd`;
  }

  /** Instanced experience section builder */
  get experience() {
    return LatexBuilder.experience(this.resume.experience);
  }

  /**
   * Resume education section
   * @param items - Array of education items
   */
  static education(items: IResumeEducationItem[]) {
    return `%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    ${items
      .map(
        (e) => `\\resumeSubheading
      {${e.institution}}{${LatexBuilder.formatDateRange(
          e.startDate,
          e.endDate
        )}}
      {${e.degree}}{${e.location}}`
      )
      .join('\n\t\t')}
  \\resumeSubHeadingListEnd`;
  }

  /** Instanced education section builder */
  get education() {
    return LatexBuilder.education(this.resume.education);
  }

  /**
   * Resume projects section
   * @param items - Array of project items
   */
  static projects(items: IResumeProjectItem[]) {
    return `%-----------PROJECTS-----------
\\section{Projects}
  \\resumeSubHeadingListStart
    ${items
      .map(
        (p) => `\\resumeProjectHeading
      {\\textbf{${p.title}} ~ \\emph{${p.stack.join(', ')}}}{${p.links
          .map(LatexBuilder.projectLink)
          .join(' ~ ')}}
    \\resumeItemListStart
      ${LatexBuilder.descriptionList(p.description, '\n\t\t\t')}
    \\resumeItemListEnd`
      )
      .join('\n')}
  \\resumeSubHeadingListEnd`;
  }

  /** Instanced projects section builder */
  get projects() {
    return LatexBuilder.projects(this.resume.projects);
  }

  /** Used at the start of the latex document */
  static begin(font?: FontDefinition) {
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
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
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
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

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
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
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
    \\small#1 & #2 \\\\
  \\end{tabular*}\\vspace{-7pt}
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

  get begin() {
    return LatexBuilder.begin(this.resume.font);
  }

  /** Used at the end of the latex document */
  static end() {
    return `%-------------------------------------------
\\end{document}
`;
  }

  get end() {
    return LatexBuilder.end();
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
}
