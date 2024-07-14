# React
This repository contains the frontend service built with React (Built by Vite), Typescript, and Redux.

[Deployment Link](https://orange-cliff-0a124561e.5.azurestaticapps.net)

## Table of Contents
- [Purpose](#purpose)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Purpose
The primary purpose of this frontend service is to provide a user-friendly interface for maintaining API specification that adhere to OpenAPI Specification (OAS) 2.0 and 3.0 standards.

## Installation
To get started, clone the repository and install the dependencies:
```bash
git clone https://github.com/congmul/oas-editor.git
cd oas-editor
npm install
```

## Usage
To run the development server:
```bash
npm run dev
```
this will start the apllication on 'http://localhost:3000'. 
(PORT can be changed in vite.confg.ts)

## Project Structure
```bash
oas-editor/
  ├── .github/               # github action
  ├── src/
  │    ├── assets/
  │    ├── components/
  │    ├── sass/
  │    ├── utils/
  │    ├── App.tsx
  │    └── main.tsx         # Entry point 
  ├── package.json
  ├── tsconfig.json
  └── vite.config.ts
```

## Contributing
There are several ways you can contribute to the project:

 - Reporting bugs and suggesting enhancements.
 - Writing and updating documentation.
 - Fixing bugs and implementing new features.