# LaTeX Resume Generator (ATS Friendly!)

Generate a a LaTeX-based PDF resume using TypeScript object templates.

See the [example folder](example/) for an example of input/output files.

This template is for my own resume and is subject to change.

## Installation

1. Clone the repository

```
git clone https://github.com/jsonFox/resume-generator.git
```

2. Install packages

```
npm install
```

3. Generate config file

```
npm run init
```

## Usage

1. Make a copy of `resume.template.ts` in the `/resume` folder
2. Rename the copy to `resume.ts`
3. Modify `resume.ts` with your information
4. Run the generate command, your LaTeX and PDF files will be output in the `/dist` folder

```
npm run generate
```

## Todo

- More configuration options including layout
- GUI for config editing
