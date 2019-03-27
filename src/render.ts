import { parse, LNode, NodeType } from './parser'


const colors: string[] = ['aqua', 'blue', 'fuchsia', 'gray', 'green',
    'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
    'silver', 'teal', 'yellow'].reverse();
let colorIndex = 0;
function nextColor(): string {
    return colors[++colorIndex % colors.length]
}

export function render(input: string) {
    const tree = parse(input);
    console.log(tree)
    return renderNode(tree);
}

function renderNode(node: LNode): HTMLElement {
    const div = document.createElement('div');
    let childDiv = null;
    //div.innerText = node.type;
    div.style.background = nextColor();
    const opts = node.options;
    switch (node.type) {
        case NodeType.HTML:
            div.innerHTML = opts.content;
        case NodeType.CONTAINER:
            div.style.display = 'flex';
            div.style.flexDirection = opts.vertical ? 'column' : 'row';

            div.style.flex = opts.small ? 'initial' : 'auto';
            div.style.flexWrap = opts.nowrap ? 'nowrap' : 'wrap';
            if (opts.full) {
                div.style.height = '100%';
            }
            break;
        case NodeType.MARGIN:
            div.style.display = 'flex';
            div.style.flex = 'auto';
            div.style.paddingTop = opts.top + 'px';
            div.style.paddingRight = opts.right + 'px';
            div.style.paddingBottom = opts.bottom + 'px';
            div.style.paddingLeft = opts.left + 'px';
            break;
        case NodeType.ALIGN:
            div.style.display = 'flex';
            div.style.flex = 'auto';
            //div.style.minHeight = '400px';

            childDiv = document.createElement('div');
            childDiv.style.flex = 'initial';
            childDiv.style.margin = 'auto';
            if (opts.v === 'top') {
                childDiv.style.marginTop = '0';
            } else if (opts.v === 'bottom') {
                childDiv.style.marginBottom = '0';
            }

            if (opts.h === 'left') {
                childDiv.style.marginLeft = '0';
            } else if (opts.h === 'right') {
                childDiv.style.marginRight = '0';
            }
            childDiv.style.background = nextColor();

            div.appendChild(childDiv)
    }

    for (const n of node.nodes) {
        if (childDiv) {
            childDiv.appendChild(renderNode(n))

        } else {
            div.appendChild(renderNode(n))
        }
    }
    if (!node.nodes.length) {
        const child = document.createElement('div');
        child.style.width = '50px';
        child.style.height = '20px';
        child.style.background = 'white';
        child.innerText = 'Test'
        if (childDiv) {
            childDiv.appendChild(child)

        } else {
            div.appendChild(child)
        }
    }
    return div;
}


