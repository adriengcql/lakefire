import { Database } from 'lakefire'

export const database = new Database('localhost:3000')

import App from './app'

const app = new App()
app.mount(document.getElementById('app') as HTMLElement)

require('./_global.scss')