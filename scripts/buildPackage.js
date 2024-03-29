#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const pc = require('picocolors');
const path = require('path');
const checkCircularDeps = require('./checkCircularDeps');

const dirPath = process.env.PWD;
const lastSlashIdx = dirPath.lastIndexOf('/');
const dirName = dirPath.slice(lastSlashIdx);
const pathInPackages = path.resolve(__dirname, `../packages/${dirName}`);
const exists = fs.existsSync(pathInPackages);
if (!exists) {
  console.error(pc.red(`Provided path ${dirPath} does not exist in packages!`));
  process.exit(1);
}

const babel = path.resolve(__dirname, '../node_modules/.bin/babel');
const env = 'NODE_ENV=production';
const config = `--config-file ${path.resolve(__dirname, '../babel.config.js')}`;
const sourceDir = `${dirPath}/src`;
const distDir = `${dirPath}/dist`;
const packageJsonPath = `${pathInPackages}/package.json`;
// eslint-disable-next-line import/no-dynamic-require
const { name } = require(packageJsonPath);

const execho = (command, extraEnv) => {
  try {
    execSync(command, {
      stdio: 'inherit',
      env: { ...process.env, ...extraEnv },
    });
  } catch (error) {
    console.error(pc.red(error.output[1]));
    process.exit(error.status);
  }
};

const emitDeclarationFiles = (outDir = './dist') => {
  execho(`tsc --emitDeclarationOnly --outDir ${outDir}`);
};

const main = async () => {
  console.log(`👉 Building ${name}`);

  // Remove dist directory
  execho(`rm -rf ${distDir}`);

  // Build ESM
  execho(
    `${env} ${babel} ${config} ${sourceDir} --out-dir ${distDir}/esm --extensions .ts,.tsx --copy-files --no-copy-ignored`,
    {
      BABEL_ENV: 'esm',
    }
  );
  emitDeclarationFiles('./dist/esm');

  // Build CommonJS modules
  execho(
    `${env} ${babel} ${config} ${sourceDir} --out-dir ${distDir} --extensions .ts,.tsx --copy-files --no-copy-ignored`,
    { BABEL_ENV: 'cjs' }
  );
  emitDeclarationFiles();

  if (process.env.CHECK_CIRCULAR !== 'false') {
    // First we find any circular dependencies that may be present
    // We should not have any for tree-shaking to work
    await checkCircularDeps();
  }
};

main();
