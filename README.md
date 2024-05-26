# LaTeX Resume Generator

Generate a a LaTeX-based PDF resume from a pre-formatted JSON structure.

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

1. Remove the `.EXAMPLE` extension from `resume.json.EXAMPLE` in the `/resume` folder
2. Modify `resume.json` with your information
3. Run the generate command, your LaTeX and PDF files will be output in the `/dist` folder

```
npm run generate
```
