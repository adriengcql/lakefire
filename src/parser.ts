'use strict';

import { TokenStream, Token, TokenType } from './tokenUtil';
import { tokenize } from './tokenizer';
import { appendFile } from 'fs';


export function parse(input: string, options?: any) {
    var parser = new Parser(tokenize(input), options || {});
    var ast = parser.parse();
    return JSON.parse(JSON.stringify(ast));
};

export enum NodeType {
    BLOCK = 'block',
    MARGIN = 'margin',
    ALIGN = 'align',
    CONTAINER = 'container',
    HTML = 'html',
}

export class LNode {
    type: NodeType;
    options: any;
    nodes: LNode[];
    line?: number;
    filename?: string;

    constructor(type: NodeType, options?: any, nodes?: LNode[], line?: number, filename?: string) {
        this.type = type;
        this.options = options || {};
        this.nodes = nodes || [];
        this.line = line;
        this.filename = filename;
    }

}

class Tree {
    root: LNode = new LNode(NodeType.CONTAINER, { vertical: true });
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

class Parser {

    private tokens: TokenStream;
    private filename: string;
    private src: string;

    constructor(tokens: Token[], options: any) {
        options = options || {};
        this.tokens = new TokenStream(tokens);
        this.filename = options.filename;
        this.src = options.src;
        //this.inMixin = 0;
        //this.plugins = options.plugins || [];
    }

    error(code: string, message: string, token: Token) {
        throw new Error(code + ' ' + message + ' ' + token.toString());
    }

    advance() {
        return this.tokens.advance();
    }

    peek() {
        return this.tokens.peek();
    }

    lookahead(n: number) {
        return this.tokens.lookahead(n);
    }

    parse() {
        const tree = new Tree();

        while (this.peek().type !== TokenType.EOF) {
            if (this.peek().type === TokenType.NEWLINE) {
                this.advance();
            } else {
                const indent = this.peek().ws.indent;
                const expr = this.parseExpr();
                if (expr) tree.append(expr, indent);
            }
        }

        return tree.root;
    }

    expect(type: TokenType) {
        if (this.peek().type === type) {
            return this.advance();
        } else {
            this.error('INVALID_TOKEN', 'expected "' + type + '", but got "' + this.peek().type + '"', this.peek());
            return new Token();
        }
    }

    accept(type: TokenType) {
        if (this.peek().type === type) {
            return this.advance();
        }
    }

    initBlock(line: number, nodes: LNode[]) {
        return new LNode(NodeType.BLOCK, {}, nodes, line, this.filename);
    }

    emptyBlock(line: number) {
        return this.initBlock(line, []);
    }

    parseExpr() {
        switch (this.peek().type) {
            case TokenType.KEYWORD:
                return this.parseLayout();
            case TokenType.HTML:
                return this.parseHTML();
            default:
                this.error('INVALID_TOKEN', 'unexpected token "' + this.peek().type + '"', this.peek());
        }
    }


    parseLayout() {
        const tok = this.expect(TokenType.KEYWORD);
        switch (tok.value) {
            case 'margin':
                return this.parseMargin();
            case 'left': case 'center': case 'right':
                return this.parseHAlign(tok.value);
            case 'top': case 'middle': case 'bottom':
                return this.parseVAlign(tok.value);
            case 'container':
                return this.parseContainer(tok.value)
            default:
                return new LNode(NodeType.BLOCK)
        }
    }

    parseMargin() {
        let p, margin = [this.expect(TokenType.NUMBER).value];
        while (p = this.accept(TokenType.NUMBER)) {
            margin.push(p.value)
        }
        const l = margin.length;

        return new LNode(NodeType.MARGIN, {
            top: margin[0],
            right: margin[1 % l],
            bottom: margin[2 % l],
            left: margin[3 % l],
        })
    }

    parseHAlign(h: string) {
        const tok = this.accept(TokenType.KEYWORD)
        const v = tok ? tok.value : 'top';
        return new LNode(NodeType.ALIGN, { h, v });
    }

    parseVAlign(v: string) {
        const tok = this.accept(TokenType.KEYWORD)
        const h = tok ? tok.value : 'left';
        return new LNode(NodeType.ALIGN, { h, v });
    }

    parseContainer(type: string) {
        const opts: any = {};
        let tok;
        while (tok = this.accept(TokenType.KEYWORD)) {
            opts[tok.value] = true;
        }
        return new LNode(NodeType.CONTAINER, opts)
    }

    parseHTML() {
        const tok = this.expect(TokenType.HTML)
        console.log(tok)
        return new LNode(NodeType.HTML, { content: tok.value })
    }
};