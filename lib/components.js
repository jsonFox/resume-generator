module.exports = {
  headingItem: (item) => {
    if (!/\./.test(item)) return `\\small ${item}`;
    if (/@/.test(item)) return `\\href{mailto:${item}}{${item}}`;
    return `\\href{${item}}{\\underline{${
      /linkedin/i.test(item)
        ? 'LinkedIn'
        : /github/i.test(item)
        ? 'Github'
        : 'Portfolio'
    }}}`;
  },

  projectLink: (url) => {
    const label = /docs/i.test(url)
      ? 'Docs'
      : /github\.com/i.test(url)
      ? 'Github'
      : 'Live Site';
    return `\\href{${url}}{\\underline{${label}}}`;
  },

  detailsList: (list, joiner) =>
    list
      .map((text) => `\\resumeItem{${text.replaceAll('%', '\\%')}}`)
      .join(joiner),

  companyTitle: (name, url) =>
    `{${name}${!url ? '' : ` - \\href{${url}}{\\underline{Website}}`}}`
};
