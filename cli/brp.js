#!/usr/bin/env node

const { spawn } = require('child_process')
const chalk = require('chalk')

const brp = 'git@github.com:Indyandie/baf-react-parcel.git'
const dirname = process.argv[2] || 'barp'

const spawner = (cmd, args=[], exit) => {
   const cmdName = `${cmd} ${args.length > 0 ? args[0] : ''}`
   
   let spawny = ''

   if(args)  spawny = spawn(cmd, args)
   else spawny = spawn(cmd)

   spawny.stdout.on('data', data => {
      console.log(chalk.green(`${data}`))
   })

   spawny.stderr.on('data', data => {
      console.error(chalk.blue.bold(`${data}`))
   })

   spawny.on('error', (error) => {
      console.error(chalk.red(`${error}`))
   })

   spawny.on('close', (code) => {
      console.log(chalk.green.bold(`✅ ${cmdName}`))
      console.log(`${'='.repeat(64)} \n`)
      if(exit) exit()
   })

   return spawny
}

const barp = async () => {
   console.log(chalk.white.bold('\nInstalling baf-react-parcel'))
   console.log('hold tight this could take a few minutes\n')
   console.log('🐙🧬🐙')
   spawner('git', ['clone', brp, dirname], 
      () => {
         process.chdir(dirname)
         console.log('📦 installing packages...')
         spawner('rm', ['-rf', '.npmignore', 'cli', '.git'], 
            () => {
               spawner('git', ['init'], 
                  () => spawner('git', ['add', '.'], 
                     () => spawner('git', ['commit', '-m', '"init"'])
                  )
               )
            }
         )
         spawner('npm', ['i'], () => {
            console.log(chalk.yellow.bold('Great success! 🎉\n'))
            console.log('Don\'t forget to switch directory.')
            console.log('run:', chalk.white.bold(`cd ${dirname}`))
         })
      }
   )
}

// Check if file exist
const list = spawn('ls')
let isDuplicate = false

list.stdout.on('data', data => {
   const files = new Set(`${data}`.split('\n'))
   isDuplicate = files.has(dirname)
})

list.on('close', (code) => {
   if(!isDuplicate) barp()
   else console.log(chalk.red(`\nThe directory <${chalk.bold(dirname)}> is in use.\n`), chalk.blueBright('🤖 Try a different name.'))
})