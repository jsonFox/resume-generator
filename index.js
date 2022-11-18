const fs = require('fs');
const build = require('./lib/builder');

console.time();

console.info('Importing resume from JSON');
const resume = fs.readFileSync('resume/resume.json');

build(JSON.parse(resume));
