import { last } from './helpers'

export enum NodeType {
    BLOCK = 'block',
    CONTAINER = 'container',
    HTML = 'html',
    COMPONENT = 'component',
    DATA = 'data',
    SCRIPT = 'script',
    LOOP = 'loop',
    CONDITION = 'condition',
    IF = 'if',
    ELIF = 'else if',
    ELSE = 'else'
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
            parentNode = last(parentNode.nodes);
        }
        if (parentNode.type === NodeType.CONDITION) {
            parentNode = last(parentNode.nodes)
        }
        if (node.type === NodeType.IF) {
            parentNode.nodes.push(new LNode(NodeType.CONDITION, {}, [node]))
        } else if (node.type === NodeType.ELIF || node.type === NodeType.ELSE) {
            const condNode = last(parentNode.nodes)
            if (!condNode || condNode.type !== NodeType.CONDITION) {
                throw new Error('error in condition structure');
            }
            condNode.nodes.push(node)
        } else {
            parentNode.nodes.push(node);
        }
    }
}