export enum TokenType {
    EOF = 'eof',
    NEWLINE = 'newline',
    WHITESPACE = 'whitespace',
    COMMENT = 'comment',
    NUMBER = 'number',
    STRING = 'string',
    KEYWORD = 'keyword',
    IDENTIFIER = 'identifier',
    ASSIGN = 'assign',
    OPERATOR = 'operator',
    LAYOUT = 'layout',
    INDENT = 'indent',
    HTML = 'html',
}

export class Token {

    col = 1;
    line = 1;
    ws = {
        indent: 0,
        before: 0,
        after: 0,
        trailing: 0
    };

    type?: TokenType;
    value?: any;
    plain?: string;
    operator?: any;

}

export class TokenStream {
    private list: Token[] = [];
    private tokenPos = -1;

    public peek(): Token {
        return this.list[this.tokenPos + 1];
    }
    public advance(): Token {
        try {
            return this.list[++this.tokenPos];
        }
        catch {
            throw new Error('End of stream');
        }
    }
    public lookahead(n: number) {
        try {
            return this.list[this.tokenPos + n];
        }
        catch {
            throw new Error('End of stream');
        }
    }
    public get(): Token {
        return this.list[this.tokenPos];
    }
    public all(): Token[] {
        return this.list;
    }
    public at(pos: number): Token {
        try {
            return this.list[pos];
        }
        catch {
            return new Token();
        }
    }
    public reset(): void {
        this.tokenPos = 0;
    }

    constructor(tokens: Token[]) {
        this.list = tokens
    }
}