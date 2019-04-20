import { TokenStream, Token, TokenType, TokenList } from './tokenUtil'
import { tokenize } from './tokenizer'
import fs from 'fs'
import path from 'path'
import { Tree, LNode, NodeType } from './nodeUtil';


export async function parse(input: string, options?: any) {
    const tokens = await tokenize(input)
    // for debug
    fs.writeFileSync(path.join(__dirname, '../test/tokens.json'), JSON.stringify(tokens))
    var parser = new Parser(tokens, options || {});
    var ast = parser.parse();
    return JSON.parse(JSON.stringify(ast));
};

class Parser {

    private tokens: TokenStream;

    constructor(tokens: TokenList, options: any) {
        options = options || {};
        this.tokens = new TokenStream(tokens);
    }

    error(code: string, message: string, token: Token) {
        throw new Error(code + ' ' + message + ' ' + token.toString());
    }

    nextLine() {
        return this.tokens.nextLine();
    }

    advance(): Token {
        return this.tokens.advance();
    }

    peek(): Token {
        return this.tokens.peek();
    }

    expect(type: TokenType | string): Token {
        if (this.peek().type === type) {
            return this.advance();
        } else {
            this.error('INVALID_TOKEN', `expected type "${type}", but got "${this.peek().type}`, this.peek());
            return new Token();
        }
    }

    accept(type: TokenType | string): Token | undefined {
        if (this.peek().type === type) {
            return this.advance();
        }
    }

    parse() {
        const tree = new Tree();

        let line
        while (line = this.nextLine()) {
            const expr = this.parseLine(line.type);
            if (expr) tree.append(expr, line.indent);
        }

        console.log(tree.root);


        return tree.root;
    }

    parseLine(type: TokenType) {
        switch (type) {
            case TokenType.CONTAINER:
                return this.parseContainer()
            case TokenType.TAG:
                return this.parseTag()
            case TokenType.JAVASCRIPT:
                return this.parseJavascript()
            default:
                this.error('INVALID_TOKEN', 'unexpected token', this.peek());

        }
    }

    parseContainer() {
        this.expect('storage.type.container.lkf');
        const opts: any = {}
        let tok
        while (tok = this.accept(TokenType.PARAMETER)) {
            switch (tok.value) {
                case 'margin':
                    opts.margin = this.parseMargin();
                default:
                    opts[tok.value] = true
            }
        }
        return new LNode(NodeType.CONTAINER, opts)
    }

    parseMargin() {
        let p, margin = [this.expect(TokenType.NUMBER).value];
        while ((p = this.accept(TokenType.NUMBER)) && margin.length < 4) {
            margin.push(p.value)
        }
        const l = margin.length;
        return {
            top: margin[0],
            right: margin[1 % l],
            bottom: margin[2 % l],
            left: margin[3 % l],
        }
    }

    parseTag() {
        const tag = this.expect('meta.tag.name.lkf');
        const nodeType = tag.scopes.includes('storage.type.tag.lkf') ? NodeType.HTML : NodeType.COMPONENT;
        const opts: any = { classList: [], attributes: {} };
        let tok;
        while ((tok = this.accept('meta.tag.class.lkf')) || (tok = this.accept('meta.tag.attribute.name.lkf'))) {
            switch (tok.type) {
                case 'meta.tag.class.lkf':
                    opts.classList.push(tok.value)
                    break
                case 'meta.tag.attribute.name.lkf':
                    const val = this.accept('meta.embedded.inline.js');
                    opts.attributes[tok.value] = val ? val.value : true
                    break
            }
        }
        opts.content = this.accept('meta.embedded.inline.js')
        return new LNode(nodeType, opts)
    }

    parseJavascript() {
        const tok = this.expect(TokenType.JAVASCRIPT)
        return new LNode(NodeType.SCRIPT, { script: tok.value })
    }

    // parseHAlign(h: string) {
    //     const tok = this.accept(TokenType.KEYWORD)
    //     const v = tok ? tok.value : 'top';
    //     return new LNode(NodeType.ALIGN, { h, v });
    // }

    // parseVAlign(v: string) {
    //     const tok = this.accept(TokenType.KEYWORD)
    //     const h = tok ? tok.value : 'left';
    //     return new LNode(NodeType.ALIGN, { h, v });
    // }

    // parseContainer(type: string) {
    //     const opts: any = {};
    //     let tok;
    //     while (tok = this.accept(TokenType.KEYWORD)) {
    //         opts[tok.value] = true;
    //     }
    //     return new LNode(NodeType.CONTAINER, opts)
    // }

    // parseHTML() {
    //     const tok = this.expect(TokenType.HTML)
    //     return new LNode(NodeType.HTML, { content: tok.value })
    // }

    // parseIdentifier() {
    //     const tok = this.expect(TokenType.IDENTIFIER);
    //     const keys = [];
    //     let op;
    //     let filters;
    //     let options: any = {};
    //     while (op = this.accept(TokenType.OPERATOR)) {
    //         if (op.value === '.') {
    //             const t = this.expect(TokenType.IDENTIFIER)
    //             if (t.value === 'one') {
    //                 options.one = true;
    //             } else if (t.value === 'noUpdate') {
    //                 options.noUpdate = true;
    //             } else {
    //                 keys.push(t.value)
    //             }
    //         } else if (op.value === '(') {
    //             const t = this.expect(TokenType.OBJECT)
    //             filters = t.value
    //             this.expect(TokenType.OPERATOR)
    //         }
    //     }
    //     return new LNode(NodeType.DATA, { model: tok.value, keys, filters, options })
    // }
};