#!/usr/bin/env node

const { exec, spawn } = require('child_process')

const brp = 'git@github.com:Indyandie/baf-react-parcel.git'
const dirname = process.argv[2] || 'barp'

const clone = spawn('git', ['clone', brp, dirname])

clone.stdout.on('data', data => {
   console.log(`stdout:\n${data}`)
})

clone.stderr.on('data', data => {
   console.error(`stderr: ${data}`)
})

clone.on('error', (error) => {
   console.error(`error: ${error.message}`);
})

clone.on('close', (code) => {
   console.log(`child process exited with code ${code}`);
})

// exec(`git clone ${brp} hello` , (err, sto, ste) => {
//    if(err) console.error(err)
   
//    if(sto) console.log(sto)
//    if(ste) console.error(ste )
// })