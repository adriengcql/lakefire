import { Database, Router } from '../../lib'
import App from './App'

require('./_global.scss')

declare global {
    interface Window {
        app: App
        router: Router
        database: Database
    }
    const app: App
    const router: Router
    const database: Database
}

window.database = new Database('localhost:3000')
window.app = new App()
window.router = new Router(app)

app.mount(document.getElementById('app') as HTMLElement, router)
