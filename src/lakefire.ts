import { parse } from './parser'
import fs from 'fs'
import path from 'path'
import { LNode } from './nodeUtil';
import { debug } from './helpers';
require('jsdom-global')()

const _path = path.resolve(process.cwd(), 'test/app')

const components: { [name: string]: LNode } = {}

async function build(filePath: string) {
    if (fs.lstatSync(filePath).isDirectory()) {
        for (const p of fs.readdirSync(filePath))
            await build(path.resolve(filePath, p))
    }
    else if (path.extname(filePath) === '.lkf') {

        const input = fs.readFileSync(filePath, 'utf8')
        const output = await parse(input)
        components[path.basename(filePath).replace(/\.lkf$/, '')] = output
        fs.writeFileSync(filePath.replace(/\.lkf$/, '.json'), JSON.stringify(output))
    }
}

async function buildApp() {
    await build(_path)
    fs.writeFileSync(path.resolve(_path, 'global.json'), JSON.stringify(components))
}

buildApp().then(() => {
    debug('Build Done');
    process.exit()
})