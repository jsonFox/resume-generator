# LaTeX Resume Generator

Generate a a LaTeX-based PDF resume using TypeScript object templates.

See the [example folder](example/) for an example of input/output files

## Installation

1. Clone the repository

```
git clone https://github.com/jsonFox/resume-generator.git
```

2. Install packages

```
npm install
```

## Usage

1. Make a copy of `resume.template.ts` in the `/resume` folder
2. Rename the copy to `resume.ts`
2. Modify `resume.ts` with your information
3. Run the generate command, your LaTeX and PDF files will be output in the `/dist` folder

```
npm run generate
```
