#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const { Select } = require('enquirer');
const path = require('path')
const { exec } = require('child_process')

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function run() {
  const pkgJsonPath = path.resolve(process.cwd(), 'package.json')
  const pkgJson = require(pkgJsonPath)
  const scriptKeys = Object.keys(pkgJson.scripts)

  const getScript = new Select(
    {
      name: 'command',
      message: 'Pick a script',
      choices: scriptKeys
    }
  )

  const getPkgManager = new Select(
    {
      name: 'command',
      message: 'What is your package manager?',
      choices: ['npm', 'yarn', 'pnpm']
    }
  )

  const script = await getScript.run()
  const pkgManager = await getPkgManager.run()

  console.log('Running:', pkgManager, 'run', script)
  let { stdout } = await sh(`${pkgManager} run ${script}`)
  for (let line of stdout.split('\n')) {
    console.log(line);
  }
}

(async () => {
  await run()
})()

