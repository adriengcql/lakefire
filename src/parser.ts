import { TokenStream, Token, TokenType, TokenList } from './tokenUtil'
import { tokenize } from './tokenizer'
import fs from 'fs'
import path from 'path'
import { Tree, LNode, NodeType } from './nodeUtil';

let fileid = 0
export async function parse(input: string, options?: any) {
    const tokens = await tokenize(input)
    // for debug
    fs.writeFileSync(path.join(__dirname, `../test-local/tokens${fileid++}.json`), JSON.stringify(tokens))
    var parser = new Parser(tokens, options);
    var ast = parser.parse();
    return JSON.parse(JSON.stringify(ast));
};

class Parser {

    private tokens: TokenStream
    private idGenerator = 0
    private filename: string

    constructor(tokens: TokenList, options: any) {
        options = options || {}
        this.filename = options.filename
        this.tokens = new TokenStream(tokens)
    }

    nextId() {
        return (this.filename || '*') + '-' + this.idGenerator++
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
            const node = this.parseLine(line.type);
            if (node) {
                try {
                    tree.append(node, line.indent)
                }
                catch (err) {
                    this.error('INVALID_COND', `${err} at line ${line.line}`, this.peek())
                }
            }
        }
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
            case TokenType.CONDITION:
                return this.parseCondition()
            case TokenType.LOOP:
                return this.parseLoop()
            case TokenType.ROUTE:
                return this.parseRoute()
            default:
                this.error('INVALID_TOKEN', 'unexpected token', this.peek());

        }
    }

    parseContainer() {
        this.expect(TokenType.NAME);
        const opts: any = { classList: [], align: {} }
        let tok
        while ((tok = this.accept(TokenType.CLASS)) || (tok = this.accept(TokenType.GLOBAL_ID)) || (tok = this.accept(TokenType.LOCAL_ID))) {
            switch (tok.type) {
                case TokenType.GLOBAL_ID:
                    opts.globalId = tok.value
                    break
                case TokenType.LOCAL_ID:
                    opts.localId = tok.value
                    break
                case TokenType.CLASS:
                    opts.classList.push(tok.value)
                    break
            }
        }
        while (tok = this.accept(TokenType.PARAMETER)) {
            switch (tok.value) {
                case 'margin':
                    opts.margin = this.parseMargin();
                    break
                case 'left': case 'center': case 'right':
                    opts.align.horizontal = tok.value
                    break
                case 'top': case 'middle': case 'bottom':
                    opts.align.vertical = tok.value
                default:
                    opts[tok.value] = true
            }
        }
        return new LNode(NodeType.CONTAINER, opts)
    }

    parseMargin() {
        let p
        let margin: string[] = [this.expect(TokenType.NUMBER).value];
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
        const tag = this.expect(TokenType.NAME);
        const nodeType = tag.scopes.includes('storage.type.tag.lkf') ? NodeType.HTML : NodeType.COMPONENT;
        const opts: any = { tag: tag.value, id: this.nextId(), classList: [], attributes: {}, props: '{}' };

        let tok;
        while ((tok = this.accept(TokenType.CLASS)) || (tok = this.accept(TokenType.ATTRIBUTE_NAME)) || (tok = this.accept(TokenType.GLOBAL_ID)) || (tok = this.accept(TokenType.LOCAL_ID))) {
            switch (tok.type) {
                case TokenType.GLOBAL_ID:
                    opts.globalId = tok.value
                    break
                case TokenType.LOCAL_ID:
                    opts.localId = tok.value
                    break
                case TokenType.CLASS:
                    opts.classList.push(tok.value)
                    break
                case TokenType.ATTRIBUTE_NAME:
                    const nextTok = this.accept(TokenType.ATTRIBUTE_VALUE)
                    if (nextTok) {
                        if (tok.value === 'props') {
                            opts.props = `{${nextTok.value}}`
                        }
                        else if (tok.value === 'routerLink') {
                            opts.routerLink = nextTok.value
                        }
                        else {
                            opts.attributes[tok.value] = nextTok.scopes.includes('string.quoted.lkf') ? `'${nextTok.value}'` : nextTok.value
                        }

                    } else {
                        opts.attributes[tok.value] = true
                    }
                    break
            }
        }
        if (tok = this.accept(TokenType.CONTENT)) {
            opts.content = `'${tok.value}'`
        }
        else if (tok = this.accept(TokenType.INLINE_JS)) {
            opts.content = tok.value
        }
        return new LNode(nodeType, opts)
    }

    parseJavascript() {
        const tok = this.expect(TokenType.JAVASCRIPT)
        return new LNode(NodeType.SCRIPT, { script: tok.value })
    }

    parseLoop() {
        this.expect(TokenType.KEYWORD)
        const variable = this.expect(TokenType.CONTENT).value
        this.expect(TokenType.KEYWORD)
        const expression = this.expect(TokenType.CONTENT).value
        return new LNode(NodeType.LOOP, { variable, expression })
    }

    parseCondition() {
        const keyword = this.expect(TokenType.KEYWORD).value
        if (keyword === 'if') {
            const expression = this.expect(TokenType.CONTENT).value
            return new LNode(NodeType.IF, { expression })
        }
        else if (keyword === 'else if') {
            const expression = this.expect(TokenType.CONTENT).value
            return new LNode(NodeType.ELIF, { expression })
        }
        return new LNode(NodeType.ELSE)

    }

    parseRoute() {
        this.expect(TokenType.KEYWORD)
        const route = this.expect(TokenType.CONTENT).value
        return new LNode(NodeType.ROUTE, { route })
    }
};