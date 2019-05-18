import { Database } from '../../lib'

export const database = new Database('localhost:9000')

import App from './App'

const app = new App()
app.mount(document.getElementById('app') as HTMLElement)