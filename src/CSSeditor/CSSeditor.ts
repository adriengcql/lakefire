import { Component, head } from '../component'
import { fromSource } from 'convert-source-map'

@head({
    template: require('./CSSeditor.lkf'),
    stylesheet: require('./CSSeditor.scss')
})
export default class CSSeditor extends Component {

    stylesheets: any[] = []

    componentWillMount() {
        const doc = this.props.document
        console.log(doc.styleSheets)
        if (doc.body.children[1]) {
            const app = (doc.body.children[1] as HTMLElement)
            app.style.marginLeft = '300px'
            for (const ss of Array.from(doc.styleSheets) as any[]) {
                console.log(ss);
                const tmp = ss.rules.length && ss.rules[0].selectorText.match(/\.([a-zA-Z0-9\-]+)__/)
                ss.description = tmp ? tmp['1'] : ''
                if (ss.description === 'CSSeditor') {
                    continue
                }
                fetch(ss.href)
                    .then((response) => {
                        return response.blob();
                    })
                    .then((blb) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const s: any = fromSource(reader.result as string)
                            console.log(s);

                            ss.source = s && s.toObject().file;
                        }
                        reader.readAsText(blb);
                    });

                this.stylesheets.push(ss)

                for (const rule of ss.rules as any[]) {
                    rule.selector = rule.selectorText.replace(/[\w\-]+(?<!_)__(?!_)|___[\w\-]+/g, '')
                }
            }
        }
    }

    componentDidMount() {

        const inputs = document.getElementsByTagName('input') as any as HTMLInputElement[]

        const tmp = this.elements.tmp as HTMLElement;
        function getSize(text: string) {
            tmp.innerText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return Math.max(tmp.getBoundingClientRect().width, 30) + 4 + 'px';
        }

        for (const input of inputs) {
            input.style.width = getSize(input.value);
            input.addEventListener('focus', () => {
                input.select()
            })
            input.addEventListener('keypress', (e) => {
                if (!e.ctrlKey && !e.altKey && !e.metaKey && typeof e.which === 'number' && e.which > 0 && e.which !== 8 && e.key !== 'Enter') {
                    input.style.width = getSize(input.value + e.key);
                }
            })
            input.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    let next;
                    if (input.classList.contains('name')) {
                        next = input.parentElement && input.parentElement.querySelector('.value') as HTMLElement;
                    }
                    else {
                        next = input.parentElement && input.parentElement.nextElementSibling && input.parentElement.nextElementSibling.querySelector('.name') as HTMLElement;
                    }
                    if (next) {
                        next.focus();
                    }
                    else {
                        input.blur();
                    }
                }
                input.style.width = getSize(input.value);

                const ruleDiv = (input.closest('ul') as HTMLElement).parentElement as HTMLElement
                const s = ruleDiv.getAttribute('data-stylesheet')
                const r = ruleDiv.getAttribute('data-rule')
                const p = input.getAttribute('data-property')

                if (s && r && p) {
                    (this.props.document.styleSheets[parseInt(s)] as any).rules[r].style[p.replace(/\-([a-z])/g, (s, l) => l.toUpperCase())] = input.value;
                }
            })
            input.addEventListener('blur', (e) => {
                const ruleDiv = (input.closest('ul') as HTMLElement).parentElement as HTMLElement
                const s = ruleDiv.getAttribute('data-stylesheet')
                const selector = ruleDiv.getAttribute('data-selector')
                const property = input.getAttribute('data-property')

                if (s && selector && property) {
                    this.props.socket.send(JSON.stringify({ source: this.stylesheets[parseInt(s)].source, selector, property, value: input.value }))

                }
            })
        }
    }
}