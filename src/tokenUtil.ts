import { listenerCount } from "cluster";

export enum TokenType {
    CONTAINER = 'meta.container.lkf',
    TAG = 'meta.tag.lkf',
    CONDITION = 'meta.condition.lkf',
    LOOP = 'meta.loop.lkf',
    JAVASCRIPT = 'meta.embedded.block.js',
    PARAMETER = 'entity.parameter.lkf',
    NUMBER = 'entity.number.lkf',
    NAME = 'entity.name.lkf',
    CONTENT = 'entity.content.lkf',
    CLASS = 'entity.class.lkf',
    KEYWORD = 'entity.keyword.lkf',
    ROUTE = 'meta.route.lkf',
}


export type TokenList = Array<{ line: number, type: TokenType, indent: number, tokens: Token[] }>

export class Token {
    line: number = 0
    col: number = 0
    value: string = ''
    type: string = ''
    scopes: string[] = []

    constructor(token: any = {}) {
        this.line = token.line || 0
        this.col = token.col || 0
        this.value = token.value || ''
        this.type = token.type || ''
        this.scopes = token.scopes || []
    }

    public toString(): string {
        return `"${this.value.trim()}" of type "${this.type}" at (${this.line},${this.col})`
    }
}


export class TokenStream {
    private list: TokenList = []
    private tokens: Token[] = []
    private currentLine: number = 0;

    public nextLine(): { line: number, type: TokenType, indent: number } | undefined {
        const line = this.list.shift();
        if (line) {
            this.currentLine++
            this.tokens = line.tokens;
            return { line: line.line, type: line.type, indent: line.indent }
        }
        return undefined
    }

    public peek(): Token {
        if (this.tokens.length) {
            return new Token(this.tokens[0]);
        }
        return new Token({ line: this.currentLine })
    }
    public advance(): Token {
        return new Token(this.tokens.shift() || { line: this.currentLine });

    }

    constructor(tokens: TokenList) {
        this.list = tokens
    }
}