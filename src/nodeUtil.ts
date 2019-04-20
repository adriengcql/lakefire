export enum NodeType {
    BLOCK = 'block',
    CONTAINER = 'container',
    HTML = 'html',
    COMPONENT = 'component',
    DATA = 'data',
    SCRIPT = 'script'
}

export class LNode {
    type: NodeType;
    options: any;
    nodes: LNode[];

    constructor(type: NodeType, options?: any, nodes?: LNode[]) {
        this.type = type;
        this.options = options || {};
        this.nodes = nodes || [];
    }

}

export class Tree {
    root: LNode = new LNode(NodeType.BLOCK);
    append(node: LNode, indent: number) {
        let parentNode = this.root;
        for (let i = 0; i < indent; i++) {
            if (!parentNode.nodes.length) {
                parentNode.nodes.push(new LNode(NodeType.BLOCK));
            }
            parentNode = parentNode.nodes[parentNode.nodes.length - 1];
        }
        parentNode.nodes.push(node);
    }
}