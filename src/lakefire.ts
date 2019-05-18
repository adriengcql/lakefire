import { parse } from './parser'
import fs from 'fs-extra'
import path from 'path'
import { debug } from './helpers';
require('jsdom-global')()

const _path = path.resolve(process.cwd(), process.argv.length > 2 ? process.argv[2] : '')

async function build(filePath: string) {
    if (fs.lstatSync(filePath).isDirectory()) {
        for (const p of fs.readdirSync(filePath))
            await build(path.resolve(filePath, p))
    }
    else if (path.extname(filePath) === '.lkf') {
        const input = fs.readFileSync(filePath, 'utf8')
        const output = await parse(input)
        fs.writeJSONSync(filePath.replace(/\.lkf$/, '.json'), output)
    }
}

async function buildApp() {
    await fs.copySync(path.resolve(_path, 'app/assets'), path.resolve(_path, 'server/public'))
    debug('Resources loaded')
    await build(path.resolve(_path, 'app'))
}

buildApp().then(() => {
    debug('Build Done');
    process.exit()
})