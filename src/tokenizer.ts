
/*jshint evil: true, regexdash: false, regexp: false */

import { Token, TokenType } from './tokenUtil'

const KEYWORDS = [
    'break',
    'case', 'catch', 'const', 'continue',
    'debugger', 'default', 'delete', 'do',
    'else', 'enum',
    'false', 'finally', 'for', 'function',
    'if', 'in', 'instanceof',
    'new', 'null',
    'return',
    'switch',
    'this', 'throw', 'true', 'try', 'typeof',
    'var', 'void',
    'while', 'with',

    'margin',
    'left', 'center', 'right',
    'top', 'middle', 'bottom',
    'container', 'vertical', 'small', 'full', 'nowrap'
];

type Dict = { [index: string]: string }

const OPERATORS: Dict = {
    '>>>=': 'ASSIGN_URSH',
    '>>=': 'ASSIGN_RSH',
    '<<=': 'ASSIGN_LSH',
    '|=': 'ASSIGN_BITWISE_OR',
    '^=': 'ASSIGN_BITWISE_XOR',
    '&=': 'ASSIGN_BITWISE_AND',
    '+=': 'ASSIGN_PLUS',
    '-=': 'ASSIGN_MINUS',
    '*=': 'ASSIGN_MUL',
    '/=': 'ASSIGN_DIV',
    '%=': 'ASSIGN_MOD',
    ';': 'SEMICOLON',
    ',': 'COMMA',
    '?': 'HOOK',
    ':': 'COLON',
    '||': 'OR',
    '&&': 'AND',
    '|': 'BITWISE_OR',
    '^': 'BITWISE_XOR',
    '&': 'BITWISE_AND',
    '===': 'STRICT_EQ',
    '==': 'EQ',
    '=': 'ASSIGN',
    '!==': 'STRICT_NE',
    '!=': 'NE',
    '<<': 'LSH',
    '<=': 'LE',
    '<': 'LT',
    '>>>': 'URSH',
    '>>': 'RSH',
    '>=': 'GE',
    '>': 'GT',
    '++': 'INCREMENT',
    '--': 'DECREMENT',
    '+': 'PLUS',
    '-': 'MINUS',
    '*': 'MUL',
    '/': 'DIV',
    '%': 'MOD',
    '!': 'NOT',
    '~': 'BITWISE_NOT',
    '.': 'DOT',
    '[': 'LEFT_BRACKET',
    ']': 'RIGHT_BRACKET',
    '{': 'LEFT_CURLY',
    '}': 'RIGHT_CURLY',
    '(': 'LEFT_PAREN',
    ')': 'RIGHT_PAREN'

};

// Regular Expressions --------------------------------------------------------
// ----------------------------------------------------------------------------
let opMatch = '^';
for (let i in OPERATORS) {

    if (opMatch !== '^') {
        opMatch += '|^';
    }

    opMatch += i.replace(/[?|^&(){}\[\]+\-*\/\.]/g, '\\$&');

}

let opRegExp = new RegExp(opMatch),
    fpRegExp = /^\d+\.\d*(?:[eE][-+]?\d+)?|^\d+(?:\.\d*)?[eE][-+]?\d+|^\.\d+(?:[eE][-+]?\d+)?/,
    reRegExp = /^\/((?:\\.|\[(?:\\.|[^\]])*\]|[^\/])+)\/([gimy]*)/,
    intRegExp = /^0[xX][\da-fA-F]+|^0[0-7]*|^\d+/,
    commentRegExp = /^\/\/.*/,
    htmlRegExp = /^html\*(.|[\r\n])*?\*html/m,
    identRegExp = /^[$_\w]+/,
    wsRegExp = /^[\ \t]+/,
    strRegExp = /^'([^'\\]|\\.)*'|^"([^"\\]|\\.)*"/;

// Token Class ----------------------------------------------------------------
// ----------------------------------------------------------------------------


Token.prototype.toString = function () {
    return '[' + (this.type + '        ').substr(0, 13) + ' '
        + '[' + this.ws.indent + ':' + this.ws.before + ']' + this.line
        + ':' + this.col + '[' + this.ws.after + ':' + this.ws.trailing
        + ']' + ': ' + this.value + ']';
};


export function tokenize(input: string) {
    const tockenizer = new Tokenizer(input);
    return tockenizer.getTokens();
}


// Main Tokenizer function ----------------------------------------------------
// ----------------------------------------------------------------------------
class Tokenizer {

    private list: Token[] = [];

    public getTokens() {
        return this.list;
    }

    constructor(input: string) {

        let cursor = 0,
            line = 1,
            col = 0,
            spaceBefore = 0,
            indentation = 0,
            tabWidth = 4,
            token: Token = new Token(),
            lastToken = null;

        while (cursor < input.length) {

            // Save the last non-whitespace token
            if (token.type !== TokenType.WHITESPACE) {
                lastToken = token;
            }

            // Get the rest
            // We also grab the rest of the line here for regexps
            let sub = input.substring(cursor),
                subline = sub.substring(0, sub.indexOf('\n')),
                m: RegExpMatchArray | null = null;


            token = new Token();
            token.line = line;
            token.col = col;
            token.ws.indent = Math.floor(indentation / tabWidth);
            token.ws.before = lastToken && lastToken.type === TokenType.NEWLINE ? 0 : spaceBefore;

            // Newlines
            if (sub[0] === '\n') {
                token.type = TokenType.NEWLINE;
                token.value = '\\n';
                token.plain = sub[0];
                col = 0;
                line++;
                indentation = 0;

                // HTML
            } else if ((m = sub.match(htmlRegExp))) {
                token.type = TokenType.HTML;
                token.plain = m[0];
                token.value = m[0].slice(5, -5);

                var lines = token.plain.split('\n');
                line += lines.length - 1;
                col = lines[lines.length - 1].length - m[0].length + 1;

                // Comment
            } else if ((m = subline.match(commentRegExp))) {
                token.type = TokenType.COMMENT;
                token.plain = m[0];
                token.value = m[0].substr(2);

                // number
            } else if ((m = sub.match(fpRegExp)) || (m = sub.match(intRegExp))) {
                token.type = TokenType.NUMBER;
                token.plain = m[0];
                token.value = +(m[0]);

                // String
            } else if ((m = sub.match(strRegExp))) {
                token.type = TokenType.STRING;
                token.plain = m[0];
                token.value = eval(m[0]); // simpelst way to get the actual js string value, don't beat me, taken from narcissus!

                // Identifier
            } else if ((m = sub.match(identRegExp))) {
                token.value = m[0];
                token.type = KEYWORDS.indexOf(token.value) !== -1 ? TokenType.KEYWORD : TokenType.IDENTIFIER;

                // Operator
            } else if ((m = sub.match(opRegExp))) {

                // Check for assignments
                let op = OPERATORS[m[0]];
                if (op.substring(0, 6) === 'ASSIGN') {

                    token.type = TokenType.ASSIGN;
                    if (op === 'ASSIGN') {
                        token.operator = null;

                    } else {
                        token.operator = op.substring(7);
                    }

                } else {
                    token.type = TokenType.OPERATOR;
                }

                token.value = m[0];

                // Whitespace handling
            } else if ((m = sub.match(wsRegExp))) {

                token.type = TokenType.WHITESPACE;

                spaceBefore = m[0].replace(/\t/g, '    ').length;
                if (col === 1) {
                    indentation = spaceBefore;

                } else if (lastToken) {
                    lastToken.ws.after = spaceBefore;
                }

                // If we ever hit this... we suck
            } else if (sub[0] === '\r') {
                token.type = TokenType.WHITESPACE;
            } else {
                throw new Error('Unexpected: ' + sub[0] + ' on :');
            }




            // Add non-whitespace tokens to stream
            if (token.type !== TokenType.WHITESPACE) {
                this.list.push(token);
            }


            // Advance cursor by match length
            let len = 1;
            if (m) {
                len = m[0].length + (m.index || 0);
            }

            cursor += len;
            col += len;
        }

        const eof = new Token();
        eof.type = TokenType.EOF;
        this.list.push(eof)
    }
}