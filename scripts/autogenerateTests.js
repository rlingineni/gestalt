#!/usr/bin/env node

// usage: yarn generate:tests --avatar
// output: avatar.auto-generated.test.js

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const globby = require('globby');

const currentDirectory = __dirname;
const root = path.join(__dirname, '../');
const docsPath = path.join(root, '/docs');

function logError(message) {
  // eslint-disable-next-line no-console
  console.log(chalk.red(`❌  Error: ${message}`));
}

function logSuccess(message) {
  // eslint-disable-next-line no-console
  console.log(chalk.green(`✅ ${message}`));
}

async function generateFile({ componentName, outputPath, template, log }) {
  await fs.promises.writeFile(
    outputPath,
    (await fs.promises.readFile(path.join(currentDirectory, template), 'utf-8'))
      .replace(/ComponentName/g, componentName)
      .replace(/componentname/g, componentName.toLowerCase()),
  );

  logSuccess(log);
}

async function getListOfExamples(componentName) {
  const examplesPath = path.join(docsPath, '/examples');
  const folders = (await fs.promises.readdir(examplesPath, { withFileTypes: true }))
    .filter((itm) => itm.isDirectory())
    .map((itm) => itm.name);

  const foundFolder = folders.find((itm) => itm.toLowerCase() === componentName.toLowerCase());

  if (!foundFolder) {
    logError(
      'Cannot auto-generate examples, and examples directory for the component does not exist',
    );
    return;
  }

  const paths = await globby([`${examplesPath}/${foundFolder}/**`]);
  console.log(paths);
}

(async function generateComponent() {
  const [componentName] = process.argv.slice(2);

  if (!componentName) {
    logError('Pass in a component name');
    return;
  }

  if (!componentName.match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
    logError('Pass in a valid component name');
    return;
  }

  // await generateFile(componentName);
  await getListOfExamples(componentName);

  logSuccess(`${componentName} was generated`);
})();

// reference code in docs/examples

// autogenerate test case for each example file

// takes a snapshot as needed

// creates a file called avatar

// generates code from docs/example code
