import { Database } from '../../lib'

export const database = new Database('localhost:3000')

require('./_global.scss')

import App from './App'

const app = new App()
app.mount(document.getElementById('app') as HTMLElement)