#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const commander = require('commander')
const chalk = require('chalk')
const pkgJson = require('../package.json')
const path = require('path')
const fs = require('fs-extra')
const replace = require('replace-in-file')

let projectName

async function init() {
  const program = new commander.Command(pkgJson.name)
    .version(pkgJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => {
      projectName = name;
    })
    .parse(process.argv)

  if (typeof projectName === 'undefined') {
    console.error('Please specify the project directory:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
    );
    console.log();
    console.log('For example:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('my-npm-pkg')}`
    );
    console.log();
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  await createPkg(projectName)
}

async function createPkg(name) {
  const templateDir = path.resolve(__dirname, '/template')
  const newAppDir = path.resolve(name)
  const appName = path.basename(newAppDir)

  fs.ensureDirSync(name)

  console.log(`Creating a new pkg in ${chalk.green(newAppDir)}.`)
  console.log()

  try {
    fs.copySync(templateDir, newAppDir)

    await replace({
      files: path.resolve(newAppDir, './package.json'),
      from: /<pkg-name>/g,
      to: appName
    })
  
    console.log(`✅ New pkg '${appName}' created!`)
  } catch (error) {
    console.error('Failed to create new pkg', { cause: error })
  }
  
}

(async () => {
  await init()
})()
