module.exports = {
  headingItem: (item) => {
    if (!/\./.test(item)) return `\\small ${item}`
    if (/@/.test(item)) return `\\href{mailto:${item}}{${item}}`
    return `\\href{${item}}{\\underline{${
      /LinkedIn/i.test(item)
        ? 'LinkedIn'
        : /Github/i.test(item)
        ? 'Github'
        : 'Portfolio'
    }}}`
  },

  projectLink: (url) => {
    const label = /docs/i.test(url)
      ? 'Docs'
      : /github/i.test(url)
      ? 'Github'
      : 'Live Site'
    return `\\href{${url}}{\\underline{${label}}}`
  },

  detailsList: (list, joiner) =>
    list
      .map((text) => `\\resumeItem{${text.replaceAll('%', '\\%')}}`)
      .join(joiner)
}
