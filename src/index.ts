import { parse } from './parser'
import fs from 'fs'
import path from 'path'
import { LNode } from './nodeUtil';
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

        components[path.basename(filePath).replace(/\.lkf$/, '')] = await parse(input)
    }
}

async function buildApp() {
    await build(_path)
    fs.writeFileSync(path.resolve(_path, 'app.json'), JSON.stringify(components))
}

buildApp().then(() => {
    console.log('Build Done');
    process.exit()
})