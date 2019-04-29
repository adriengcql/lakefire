import { LNode, NodeType } from "./nodeUtil"
import { last, debug } from "./helpers"
import * as path from 'path'

const _components = require('../test/app/global.json')


const colors: string[] = ['aqua', 'blue', 'fuchsia', 'gray', 'green',
    'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
    'silver', 'teal', 'yellow'].reverse();
let colorIndex = 0;
function nextColor(): string {
    return colors[++colorIndex % colors.length]
}

export function head(h: any) {
    return function (constructor: any) {
        constructor.prototype.template = h.template
        constructor.prototype.importedComponents = h.components
        constructor.prototype.stylesheet = h.stylesheet
    }
}

function evalExp(exp: string, ctx?: any) {
    if (!exp) {
        return ''
    }
    try {
        return (Function('return ' + exp)).call(ctx)
    }
    catch (err) {
        console.error(err);

        debug(err, 'error')
        return ''
    }
}

export class Component {


    componentWillMount(): void { }
    componentDidMount(): void { }
    componentWillUpdate(): void { }
    componentDidUpdate(): void { }
    private type: string;
    private root: LNode
    private imports: any
    private children: { [id: string]: { anchor: HTMLElement, component: Component, options: any, props: any } } = {}
    private scopes: any[] = []
    private styles: any
    private state: Set<string> = new Set<string>()
    private mounted = false
    private updating = false
    public elements: { [id: string]: HTMLElement | undefined } = {}
    public components: { [id: string]: Component } = {}
    public html: HTMLElement | undefined
    public props: any

    constructor(props?: any) {
        this.type = this.constructor.name;
        const self = this as any
        this.root = { ...self['template'] as LNode } || new LNode(NodeType.BLOCK);
        this.imports = self['importedComponents'] as { [name: string]: Component } || {}
        this.styles = self['stylesheet'] as any || {}
        this.props = props || {}
    }

    public mount(anchor: HTMLElement, options: any = {}) {
        this.root.options = options

        this.componentWillMount()
        this.html = this.render() as HTMLElement

        if (this.html) {
            (this.html as any).component = this
            anchor.replaceWith(this.html)
        }
        for (const child of Object.values(this.children)) {
            const { localId, tag } = child.options
            delete child.options.localId
            child.component.mount(child.anchor, child.options)
            if (localId) {
                this.components[localId] = child.component
                this.elements[localId] = child.component.html
            }
            if (child.component.html && tag) {
                child.component.html.classList.add(tag)
            }
        }

        this.state.forEach(v => {
            Object.defineProperty(this, v, {
                get: function () {
                    return this['i' + v];
                },
                set: function (value) {

                    this['i' + v] = value
                    if (!this.updating) {
                        this.refresh()
                    }
                }
            });
        })
        this.componentDidMount()
        this.mounted = true
    }

    public refresh(props?: any) {
        this.props = props || this.props
        this.updating = true
        this.componentWillUpdate()
        const newHtml = this.render() as HTMLElement

        if (this.html) {
            (newHtml as any).component = this
            this.html.replaceWith(newHtml)
            this.html = newHtml
        }

        for (const child of Object.values(this.children)) {
            const { localId, tag } = child.options
            delete child.options.localId

            child.component.refresh(child.props)

            if (child.component.html) {
                if (tag) {
                    child.component.html.classList.add(tag)
                }
                child.anchor.replaceWith(child.component.html)
            }
            if (localId) {
                this.elements[localId] = child.component.html
            }
        }
        this.componentDidUpdate()
        this.updating = false
    }

    private render() {
        return this.renderNode(this.root) || undefined
    }

    private renderNode(node: LNode) {
        switch (node.type) {
            case NodeType.BLOCK:
                return this.renderBlock(node)
            case NodeType.CONTAINER:
                return this.renderContainer(node)
            case NodeType.HTML:
                return this.renderHTML(node)
            case NodeType.COMPONENT:
                return this.renderComponent(node)
            case NodeType.CONDITION:
                return this.renderCondition(node)
            case NodeType.LOOP:
                return this.renderLoop(node)
            case NodeType.SCRIPT:
                this.execJavascript(node.options.script)
                return null
            default:
                return document.createElement('div')
        }
    }

    private renderChildren(div: HTMLElement, nodes: LNode[]) {
        const vars = {}
        const proxy: any = new Proxy(vars, {
            has(target, prop) { return true; },
            get(target: any, prop) { return (prop in target ? target : window)[prop]; }
        })
        for (const scope of this.scopes) {
            for (const k in scope) {
                proxy[k] = scope[k]
            }
        }
        this.scopes.push(proxy)
        for (const n of nodes) {
            const children = this.renderNode(n)
            if (children) {
                if (Array.isArray(children)) {
                    div.append(...children)
                }
                else {
                    div.appendChild(children)
                }
            }
        }
        this.scopes.pop()
    }

    private createElement(tag: string, opts: any) {
        const div = document.createElement(tag)
        if (tag !== 'div') {
            div.classList.add(tag)
        }
        if (opts.classList && opts.classList.length) {
            div.classList.add(opts.classList.map((c: string) => this.styles[c] || c))
        }
        for (const att in opts.attributes) {
            div.setAttribute(att, opts.attributes[att])
        }
        if (opts.globalId) {
            div.id = opts.globalId
        }
        if (opts.localId) {
            this.elements[opts.localId] = div
        }
        //div.style.background = nextColor();
        return div
    }

    private renderBlock(node: LNode) {
        const div = this.createElement('div', node.options)
        this.renderChildren(div, node.nodes)
        return div
    }

    private renderContainer(node: LNode) {
        const opts = node.options
        const div = this.createElement('div', opts)
        //div.innerText = 'Container'+-+-
        div.classList.add('container')

        div.style.display = 'flex';
        div.style.flexDirection = opts.vertical ? 'column' : 'row';

        div.style.flex = opts.small ? 'initial' : 'auto';
        div.style.flexWrap = opts.nowrap ? 'nowrap' : 'wrap';
        if (opts.full) {
            div.style.height = '100%';
        }

        if (opts.margin) {
            const { top, right, bottom, left } = opts.margin as { [name: string]: number }
            const f = (m: number): string => m >= 0 ? 'padding' : 'margin'
            div.style.setProperty(f(top) + '-top', top + 'px')
            div.style.setProperty(f(right) + '-right', right + 'px')
            div.style.setProperty(f(bottom) + '-bottom', bottom + 'px')
            div.style.setProperty(f(left) + '-left', left + 'px')
        }

        if (opts.align.vertical || opts.align.horizontal) {
            const v = opts.align.vertical || 'middle'
            const h = opts.align.horizontal || 'left'
            const childDiv = document.createElement('div');
            childDiv.style.flex = 'initial';
            childDiv.style.margin = 'auto';
            if (v === 'top') {
                childDiv.style.marginTop = '0';
            } else if (v === 'bottom') {
                childDiv.style.marginBottom = '0';
            }
            if (h === 'left') {
                childDiv.style.marginLeft = '0';
            } else if (h === 'right') {
                childDiv.style.marginRight = '0';
            }
            this.renderChildren(childDiv, node.nodes)
            div.appendChild(childDiv)
        } else {
            this.renderChildren(div, node.nodes)
        }
        return div
    }

    private renderHTML(node: LNode) {
        const opts = node.options
        const div = this.createElement(opts.tag, opts)
        if (opts.content) {
            div.innerText = this.evalExp(opts.content)
        }
        this.renderChildren(div, node.nodes)
        return div
    }

    private renderComponent(node: LNode) {
        const opts = node.options
        const div = document.createElement('div')
        const props = this.evalExp(opts.props)

        if (!(opts.id in this.children)) {
            this.children[opts.id] = { anchor: div, component: new this.imports[opts.tag](props), options: opts, props }
        }
        else {
            this.children[opts.id].anchor = div
            this.children[opts.id].props = props
        }
        return div
    }

    private renderCondition(node: LNode) {
        const div = document.createElement('div')
        for (const n of node.nodes) {
            if (((n.type === NodeType.IF || n.type === NodeType.ELIF) && this.evalExp(n.options.expression)) || n.type === NodeType.ELSE) {
                this.renderChildren(div, n.nodes)
                return Array.from(div.children)
            }
        }
        return null
    }

    private renderLoop(node: LNode) {
        const opts = node.options
        const div = document.createElement('div')
        const proxy = last(this.scopes)
        for (const item of this.evalExp(opts.expression)) {
            proxy[opts.variable.trim()] = item
            this.renderChildren(div, node.nodes)
        }
        return Array.from(div.children)
    }

    private execJavascript(script: string) {
        if (!script) {
            return null
        }

        try {
            if (!this.mounted) {
                let vars = script.match(/(this\.\w+\b)(?!\()/g) || []
                const funcs = script.match(/(this\.\w+\b)(?=\()/g) || []
                funcs.map(f => vars = vars.concat((this as any)[f.substr(5)].toString().match(/(this\.\w+\b)(?!\()/g)))
                vars.filter(v => v && v !== 'this.props').map(v => this.state.add(v.substr(5)))
            }

            const exp = script.replace(/\b(let|const)\s/g, 'var ')
            const proxy = last(this.scopes)
            return (Function('return (function(proxy) { with(proxy) { ' + exp + '} })'))().call(this, proxy)
        }
        catch (err) {
            debug(script, 'error')
            return null
        }
    }

    private evalExp(exp: string) {
        return this.execJavascript('return ' + exp)
    }
}