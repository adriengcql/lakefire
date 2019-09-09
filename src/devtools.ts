import CSSeditor from './CSSeditor/CSSeditor'

const SockJS = require('sockjs-client');
const devSocket = new SockJS('/devtools');
devSocket.onopen = function () {
    console.log('[devtools] open');
    devSocket.send
};
const iframe = document.getElementById('app-iframe') as HTMLIFrameElement
iframe.addEventListener('load', () => {
    const router = (iframe.contentWindow! as any).router
    const app = (iframe.contentWindow! as any).app
    console.log(router);
    router.navigate(location.pathname)
    let prevApp: string
    let prevWin: string
    let popstate = false
    setInterval(() => {
        const newApp = iframe.contentWindow!.location.pathname;
        const newWin = location.pathname

        if (newApp !== prevApp) {
            console.log('test');

            history.pushState({}, '', newApp)
            if (!popstate) {
                app.refresh()
                popstate = false
            }
            prevApp = newApp
            prevWin = newApp
        }
        else if (newWin !== prevWin) {
            console.log('test2');

            //console.log(iframe.contentWindow!.location.pathname, location.pathname);

            router.navigate(newWin)
            //console.log(iframe.contentWindow!.location.pathname, location.pathname);

            prevWin = newWin
            prevApp = newWin
        }

    }, 200);
    window.addEventListener('popstate', (e) => {
        console.log(e)
        popstate = true
        //iframe.contentWindow!.location.pathname = window.location.pathname
    })

    let open = false;
    let editor: CSSeditor
    (document.getElementById('openCSSeditorBtn') as HTMLButtonElement).addEventListener('click', function () {
        if (open) {
            editor.destroy()
            iframe.style.width = '100%'
            open = false
        }
        else {
            iframe.style.width = 'calc(100% - 300px)'
            editor = new CSSeditor({ socket: devSocket, document: iframe && iframe.contentDocument })
            const div = document.createElement('div')
            document.body.prepend(div)
            editor.mount(div, router)
            open = true
        }

    })
})


// console.log(location, iframe.contentWindow!.location);



// // history.back = () => {
// //     iframe.contentWindow!.history.back()
// //     history.replaceState({}, '', iframe.contentWindow!.location.pathname)
// // }



