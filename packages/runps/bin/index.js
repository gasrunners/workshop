#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const { Select } = require('enquirer');
const path = require('path')
const { spawn } = require('child_process')

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
      message: 'Your package manager?',
      choices: ['npm', 'yarn', 'pnpm']
    }
  )

  const script = await getScript.run()
  const pkgManager = await getPkgManager.run()

  console.log('Running:', pkgManager, 'run', script)
  const cmd = spawn(pkgManager, ['run', script])

  cmd.stdout.on('data', (data) => console.log(data.toString()))
  
  cmd.stderr.on('data', (data) => console.error(data.toString()))
  
  cmd.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
}

(async () => {
  await run()
})()

