import CSSeditor from './CSSeditor/CSSeditor'

const SockJS = require('sockjs-client');
const devSocket = new SockJS('/devtools');
devSocket.onopen = function () {
    console.log('[devtools] open');
    devSocket.send
};

let open = false;
let editor: CSSeditor
(document.getElementById('openCSSeditorBtn') as HTMLButtonElement).addEventListener('click', function () {
    const iframe = document.getElementById('app-iframe') as HTMLIFrameElement

    if (open) {
        editor.destroy()
        iframe.style.left = '0'
        open = false
    }
    else {
        iframe.style.left = '300px'
        editor = new CSSeditor({ socket: devSocket, document: iframe && iframe.contentDocument })
        const div = document.createElement('div')
        document.body.prepend(div)
        editor.mount(div)
        open = true
    }

})
