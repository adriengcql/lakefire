import { LNode, NodeType } from "./nodeUtil";


export class Component {

    private root: LNode

    constructor(root: LNode) {
        this.root = root
    }
    public mount(anchor: HTMLElement) {
        anchor.replaceWith(this.render())
    }

    private render(): HTMLElement {
        return this.renderNode(this.root)
    }

    private renderNode(node: LNode) {
        const div = document.createElement('div')
        switch (node.type) {
            case NodeType.CONTAINER:
                div.innerText = 'Container'
                break
            case NodeType.HTML:
                div.innerText = 'Html'
                break
        }
        for (const n of node.nodes) {
            div.appendChild(this.renderNode(n))
        }
        return div
    }
}