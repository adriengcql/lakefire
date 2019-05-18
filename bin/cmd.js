#! /usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const execSync = require('child_process').execSync;
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const src = process.argv[1]
const cmd = process.argv.length > 2 && process.argv[2]

async function init () {
    console.log('\n> Initializing new project\n')
    await fs.copySync(path.resolve(path.dirname(src), '../resources/init'), './')
    console.log('Done');
    console.log('\n> Running npm install\n');
    execSync('npm install', { stdio: [0, 1, 2] });
    console.log('All set! try "npm run dev" to start developing');
    process.exit()
}

switch (cmd) {
    case 'init':
        rl.question('Are you sure : this will replace the folder content (y/n)? ', (answer) => {
            rl.close();
            if (answer === 'y') {
                init()
            }
            else {
                console.log('exit')
            }
        });
        break
    case 'build':
        console.log('\n> Building project\n')
        execSync('node ' + path.resolve(path.dirname(src), '../lib/lakefire.js'), { stdio: [0, 1, 2] });
        process.exit()
        break
    default:
        console.log('try "lakefire init" or "lakefire build')
}