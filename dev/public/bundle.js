/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = __webpack_require__(/*! ./render */ "./src/render.ts");
var input = __webpack_require__(/*! ../test/template.lkf */ "./test/template.lkf").default;
var page = render_1.render(input);
document.body.appendChild(page);


/***/ }),

/***/ "./src/parser.ts":
/*!***********************!*\
  !*** ./src/parser.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tokenUtil_1 = __webpack_require__(/*! ./tokenUtil */ "./src/tokenUtil.ts");
var tokenizer_1 = __webpack_require__(/*! ./tokenizer */ "./src/tokenizer.ts");
function parse(input, options) {
    var parser = new Parser(tokenizer_1.tokenize(input), options || {});
    var ast = parser.parse();
    return JSON.parse(JSON.stringify(ast));
}
exports.parse = parse;
;
var NodeType;
(function (NodeType) {
    NodeType["BLOCK"] = "block";
    NodeType["MARGIN"] = "margin";
    NodeType["ALIGN"] = "align";
    NodeType["CONTAINER"] = "container";
    NodeType["HTML"] = "html";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
var LNode = /** @class */ (function () {
    function LNode(type, options, nodes, line, filename) {
        this.type = type;
        this.options = options || {};
        this.nodes = nodes || [];
        this.line = line;
        this.filename = filename;
    }
    return LNode;
}());
exports.LNode = LNode;
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = new LNode(NodeType.CONTAINER, { vertical: true });
    }
    Tree.prototype.append = function (node, indent) {
        var parentNode = this.root;
        for (var i = 0; i < indent; i++) {
            if (!parentNode.nodes.length) {
                parentNode.nodes.push(new LNode(NodeType.BLOCK));
            }
            parentNode = parentNode.nodes[parentNode.nodes.length - 1];
        }
        parentNode.nodes.push(node);
    };
    return Tree;
}());
var Parser = /** @class */ (function () {
    function Parser(tokens, options) {
        options = options || {};
        this.tokens = new tokenUtil_1.TokenStream(tokens);
        this.filename = options.filename;
        this.src = options.src;
        //this.inMixin = 0;
        //this.plugins = options.plugins || [];
    }
    Parser.prototype.error = function (code, message, token) {
        throw new Error(code + ' ' + message + ' ' + token.toString());
    };
    Parser.prototype.advance = function () {
        return this.tokens.advance();
    };
    Parser.prototype.peek = function () {
        return this.tokens.peek();
    };
    Parser.prototype.lookahead = function (n) {
        return this.tokens.lookahead(n);
    };
    Parser.prototype.parse = function () {
        var tree = new Tree();
        while (this.peek().type !== tokenUtil_1.TokenType.EOF) {
            if (this.peek().type === tokenUtil_1.TokenType.NEWLINE) {
                this.advance();
            }
            else {
                var indent = this.peek().ws.indent;
                var expr = this.parseExpr();
                if (expr)
                    tree.append(expr, indent);
            }
        }
        return tree.root;
    };
    Parser.prototype.expect = function (type) {
        if (this.peek().type === type) {
            return this.advance();
        }
        else {
            this.error('INVALID_TOKEN', 'expected "' + type + '", but got "' + this.peek().type + '"', this.peek());
            return new tokenUtil_1.Token();
        }
    };
    Parser.prototype.accept = function (type) {
        if (this.peek().type === type) {
            return this.advance();
        }
    };
    Parser.prototype.initBlock = function (line, nodes) {
        return new LNode(NodeType.BLOCK, {}, nodes, line, this.filename);
    };
    Parser.prototype.emptyBlock = function (line) {
        return this.initBlock(line, []);
    };
    Parser.prototype.parseExpr = function () {
        switch (this.peek().type) {
            case tokenUtil_1.TokenType.KEYWORD:
                return this.parseLayout();
            case tokenUtil_1.TokenType.HTML:
                return this.parseHTML();
            default:
                this.error('INVALID_TOKEN', 'unexpected token "' + this.peek().type + '"', this.peek());
        }
    };
    Parser.prototype.parseLayout = function () {
        var tok = this.expect(tokenUtil_1.TokenType.KEYWORD);
        switch (tok.value) {
            case 'margin':
                return this.parseMargin();
            case 'left':
            case 'center':
            case 'right':
                return this.parseHAlign(tok.value);
            case 'top':
            case 'middle':
            case 'bottom':
                return this.parseVAlign(tok.value);
            case 'container':
                return this.parseContainer(tok.value);
            default:
                return new LNode(NodeType.BLOCK);
        }
    };
    Parser.prototype.parseMargin = function () {
        var p, margin = [this.expect(tokenUtil_1.TokenType.NUMBER).value];
        while (p = this.accept(tokenUtil_1.TokenType.NUMBER)) {
            margin.push(p.value);
        }
        var l = margin.length;
        return new LNode(NodeType.MARGIN, {
            top: margin[0],
            right: margin[1 % l],
            bottom: margin[2 % l],
            left: margin[3 % l],
        });
    };
    Parser.prototype.parseHAlign = function (h) {
        var tok = this.accept(tokenUtil_1.TokenType.KEYWORD);
        var v = tok ? tok.value : 'top';
        return new LNode(NodeType.ALIGN, { h: h, v: v });
    };
    Parser.prototype.parseVAlign = function (v) {
        var tok = this.accept(tokenUtil_1.TokenType.KEYWORD);
        var h = tok ? tok.value : 'left';
        return new LNode(NodeType.ALIGN, { h: h, v: v });
    };
    Parser.prototype.parseContainer = function (type) {
        var opts = {};
        var tok;
        while (tok = this.accept(tokenUtil_1.TokenType.KEYWORD)) {
            opts[tok.value] = true;
        }
        return new LNode(NodeType.CONTAINER, opts);
    };
    Parser.prototype.parseHTML = function () {
        var tok = this.expect(tokenUtil_1.TokenType.HTML);
        console.log(tok);
        return new LNode(NodeType.HTML, { content: tok.value });
    };
    return Parser;
}());
;


/***/ }),

/***/ "./src/render.ts":
/*!***********************!*\
  !*** ./src/render.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __webpack_require__(/*! ./parser */ "./src/parser.ts");
var colors = ['aqua', 'blue', 'fuchsia', 'gray', 'green',
    'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
    'silver', 'teal', 'yellow'].reverse();
var colorIndex = 0;
function nextColor() {
    return colors[++colorIndex % colors.length];
}
function render(input) {
    var tree = parser_1.parse(input);
    console.log(tree);
    return renderNode(tree);
}
exports.render = render;
function renderNode(node) {
    var div = document.createElement('div');
    var childDiv = null;
    //div.innerText = node.type;
    div.style.background = nextColor();
    var opts = node.options;
    switch (node.type) {
        case parser_1.NodeType.HTML:
            div.innerHTML = opts.content;
        case parser_1.NodeType.CONTAINER:
            div.style.display = 'flex';
            div.style.flexDirection = opts.vertical ? 'column' : 'row';
            div.style.flex = opts.small ? 'initial' : 'auto';
            div.style.flexWrap = opts.nowrap ? 'nowrap' : 'wrap';
            if (opts.full) {
                div.style.height = '100%';
            }
            break;
        case parser_1.NodeType.MARGIN:
            div.style.display = 'flex';
            div.style.flex = 'auto';
            div.style.paddingTop = opts.top + 'px';
            div.style.paddingRight = opts.right + 'px';
            div.style.paddingBottom = opts.bottom + 'px';
            div.style.paddingLeft = opts.left + 'px';
            break;
        case parser_1.NodeType.ALIGN:
            div.style.display = 'flex';
            div.style.flex = 'auto';
            //div.style.minHeight = '400px';
            childDiv = document.createElement('div');
            childDiv.style.flex = 'initial';
            childDiv.style.margin = 'auto';
            if (opts.v === 'top') {
                childDiv.style.marginTop = '0';
            }
            else if (opts.v === 'bottom') {
                childDiv.style.marginBottom = '0';
            }
            if (opts.h === 'left') {
                childDiv.style.marginLeft = '0';
            }
            else if (opts.h === 'right') {
                childDiv.style.marginRight = '0';
            }
            childDiv.style.background = nextColor();
            div.appendChild(childDiv);
    }
    for (var _i = 0, _a = node.nodes; _i < _a.length; _i++) {
        var n = _a[_i];
        if (childDiv) {
            childDiv.appendChild(renderNode(n));
        }
        else {
            div.appendChild(renderNode(n));
        }
    }
    if (!node.nodes.length) {
        var child = document.createElement('div');
        child.style.width = '50px';
        child.style.height = '20px';
        child.style.background = 'white';
        child.innerText = 'Test';
        if (childDiv) {
            childDiv.appendChild(child);
        }
        else {
            div.appendChild(child);
        }
    }
    return div;
}


/***/ }),

/***/ "./src/tokenUtil.ts":
/*!**************************!*\
  !*** ./src/tokenUtil.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
    TokenType["EOF"] = "eof";
    TokenType["NEWLINE"] = "newline";
    TokenType["WHITESPACE"] = "whitespace";
    TokenType["COMMENT"] = "comment";
    TokenType["NUMBER"] = "number";
    TokenType["STRING"] = "string";
    TokenType["KEYWORD"] = "keyword";
    TokenType["IDENTIFIER"] = "identifier";
    TokenType["ASSIGN"] = "assign";
    TokenType["OPERATOR"] = "operator";
    TokenType["LAYOUT"] = "layout";
    TokenType["INDENT"] = "indent";
    TokenType["HTML"] = "html";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var Token = /** @class */ (function () {
    function Token() {
        this.col = 1;
        this.line = 1;
        this.ws = {
            indent: 0,
            before: 0,
            after: 0,
            trailing: 0
        };
    }
    return Token;
}());
exports.Token = Token;
var TokenStream = /** @class */ (function () {
    function TokenStream(tokens) {
        this.list = [];
        this.tokenPos = -1;
        this.list = tokens;
    }
    TokenStream.prototype.peek = function () {
        return this.list[this.tokenPos + 1];
    };
    TokenStream.prototype.advance = function () {
        try {
            return this.list[++this.tokenPos];
        }
        catch (_a) {
            throw new Error('End of stream');
        }
    };
    TokenStream.prototype.lookahead = function (n) {
        try {
            return this.list[this.tokenPos + n];
        }
        catch (_a) {
            throw new Error('End of stream');
        }
    };
    TokenStream.prototype.get = function () {
        return this.list[this.tokenPos];
    };
    TokenStream.prototype.all = function () {
        return this.list;
    };
    TokenStream.prototype.at = function (pos) {
        try {
            return this.list[pos];
        }
        catch (_a) {
            return new Token();
        }
    };
    TokenStream.prototype.reset = function () {
        this.tokenPos = 0;
    };
    return TokenStream;
}());
exports.TokenStream = TokenStream;


/***/ }),

/***/ "./src/tokenizer.ts":
/*!**************************!*\
  !*** ./src/tokenizer.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*jshint evil: true, regexdash: false, regexp: false */
Object.defineProperty(exports, "__esModule", { value: true });
var tokenUtil_1 = __webpack_require__(/*! ./tokenUtil */ "./src/tokenUtil.ts");
var KEYWORDS = [
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
var OPERATORS = {
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
var opMatch = '^';
for (var i in OPERATORS) {
    if (opMatch !== '^') {
        opMatch += '|^';
    }
    opMatch += i.replace(/[?|^&(){}\[\]+\-*\/\.]/g, '\\$&');
}
var opRegExp = new RegExp(opMatch), fpRegExp = /^\d+\.\d*(?:[eE][-+]?\d+)?|^\d+(?:\.\d*)?[eE][-+]?\d+|^\.\d+(?:[eE][-+]?\d+)?/, reRegExp = /^\/((?:\\.|\[(?:\\.|[^\]])*\]|[^\/])+)\/([gimy]*)/, intRegExp = /^0[xX][\da-fA-F]+|^0[0-7]*|^\d+/, commentRegExp = /^\/\/.*/, htmlRegExp = /^html\*(.|[\r\n])*?\*html/m, identRegExp = /^[$_\w]+/, wsRegExp = /^[\ \t]+/, strRegExp = /^'([^'\\]|\\.)*'|^"([^"\\]|\\.)*"/;
// Token Class ----------------------------------------------------------------
// ----------------------------------------------------------------------------
tokenUtil_1.Token.prototype.toString = function () {
    return '[' + (this.type + '        ').substr(0, 13) + ' '
        + '[' + this.ws.indent + ':' + this.ws.before + ']' + this.line
        + ':' + this.col + '[' + this.ws.after + ':' + this.ws.trailing
        + ']' + ': ' + this.value + ']';
};
function tokenize(input) {
    var tockenizer = new Tokenizer(input);
    return tockenizer.getTokens();
}
exports.tokenize = tokenize;
// Main Tokenizer function ----------------------------------------------------
// ----------------------------------------------------------------------------
var Tokenizer = /** @class */ (function () {
    function Tokenizer(input) {
        this.list = [];
        var cursor = 0, line = 1, col = 0, spaceBefore = 0, indentation = 0, tabWidth = 4, token = new tokenUtil_1.Token(), lastToken = null;
        while (cursor < input.length) {
            // Save the last non-whitespace token
            if (token.type !== tokenUtil_1.TokenType.WHITESPACE) {
                lastToken = token;
            }
            // Get the rest
            // We also grab the rest of the line here for regexps
            var sub = input.substring(cursor), subline = sub.substring(0, sub.indexOf('\n')), m = null;
            token = new tokenUtil_1.Token();
            token.line = line;
            token.col = col;
            token.ws.indent = Math.floor(indentation / tabWidth);
            token.ws.before = lastToken && lastToken.type === tokenUtil_1.TokenType.NEWLINE ? 0 : spaceBefore;
            // Newlines
            if (sub[0] === '\n') {
                token.type = tokenUtil_1.TokenType.NEWLINE;
                token.value = '\\n';
                token.plain = sub[0];
                col = 0;
                line++;
                indentation = 0;
                // HTML
            }
            else if ((m = sub.match(htmlRegExp))) {
                token.type = tokenUtil_1.TokenType.HTML;
                token.plain = m[0];
                token.value = m[0].slice(5, -5);
                var lines = token.plain.split('\n');
                line += lines.length - 1;
                col = lines[lines.length - 1].length - m[0].length + 1;
                // Comment
            }
            else if ((m = subline.match(commentRegExp))) {
                token.type = tokenUtil_1.TokenType.COMMENT;
                token.plain = m[0];
                token.value = m[0].substr(2);
                // number
            }
            else if ((m = sub.match(fpRegExp)) || (m = sub.match(intRegExp))) {
                token.type = tokenUtil_1.TokenType.NUMBER;
                token.plain = m[0];
                token.value = +(m[0]);
                // String
            }
            else if ((m = sub.match(strRegExp))) {
                token.type = tokenUtil_1.TokenType.STRING;
                token.plain = m[0];
                token.value = eval(m[0]); // simpelst way to get the actual js string value, don't beat me, taken from narcissus!
                // Identifier
            }
            else if ((m = sub.match(identRegExp))) {
                token.value = m[0];
                token.type = KEYWORDS.indexOf(token.value) !== -1 ? tokenUtil_1.TokenType.KEYWORD : tokenUtil_1.TokenType.IDENTIFIER;
                // Operator
            }
            else if ((m = sub.match(opRegExp))) {
                // Check for assignments
                var op = OPERATORS[m[0]];
                if (op.substring(0, 6) === 'ASSIGN') {
                    token.type = tokenUtil_1.TokenType.ASSIGN;
                    if (op === 'ASSIGN') {
                        token.operator = null;
                    }
                    else {
                        token.operator = op.substring(7);
                    }
                }
                else {
                    token.type = tokenUtil_1.TokenType.OPERATOR;
                }
                token.value = m[0];
                // Whitespace handling
            }
            else if ((m = sub.match(wsRegExp))) {
                token.type = tokenUtil_1.TokenType.WHITESPACE;
                spaceBefore = m[0].replace(/\t/g, '    ').length;
                if (col === 1) {
                    indentation = spaceBefore;
                }
                else if (lastToken) {
                    lastToken.ws.after = spaceBefore;
                }
                // If we ever hit this... we suck
            }
            else if (sub[0] === '\r') {
                token.type = tokenUtil_1.TokenType.WHITESPACE;
            }
            else {
                throw new Error('Unexpected: ' + sub[0] + ' on :');
            }
            // Add non-whitespace tokens to stream
            if (token.type !== tokenUtil_1.TokenType.WHITESPACE) {
                this.list.push(token);
            }
            // Advance cursor by match length
            var len = 1;
            if (m) {
                len = m[0].length + (m.index || 0);
            }
            cursor += len;
            col += len;
        }
        var eof = new tokenUtil_1.Token();
        eof.type = tokenUtil_1.TokenType.EOF;
        this.list.push(eof);
    }
    Tokenizer.prototype.getTokens = function () {
        return this.list;
    };
    return Tokenizer;
}());


/***/ }),

/***/ "./test/template.lkf":
/*!***************************!*\
  !*** ./test/template.lkf ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("container\r\n    html*\r\n        <input type='text-area' placeholder='Texte'/>\r\n        <button > Test </button>\r\n        <p> Un long testdasfd asfpou poutaes  dafaasfd\r\n        asdfoqwiethdas\r\n        fasdfqwertasgfdsadasfaf</p>\r\n    *html\r\n\r\n\r\n\r\n\r\ncontainer vertical\r\n    container small\r\n        margin 10\r\n    container\r\n        margin 10 10 20 100\r\n            container\r\n                container small\r\n                    center middle\r\n        margin 10 10 20 100\r\n            right bottom\r\n        margin 0\r\n            margin 10 10 20 100\r\n                container vertical small\r\n                        html*\r\n                            <input type='text-area' placeholder='Texte'/>\r\n                            <button > Test </button>\r\n                            <p> Un long testdasfd asfpou poutaes  dafaasfd\r\n                            asdfoqwiethdas\r\n                            fasdfqwertasgfdsadasfaf</p>\r\n                        *html\r\n\r\ncontainer full\r\n    margin 0\r\n        margin 10 10 20 100\r\n            container vertical small\r\n                center middle\r\n    margin 10 10 20 100\r\n        right bottom\r\n            html*\r\n                <input type='text-area' placeholder='Texte'/>\r\n                <button > Test </button>\r\n                <p> Un long testdasfd asfpou poutaes  dafaasfd\r\n                asdfoqwiethdas\r\n                fasdfqwertasgfdsadasfaf</p>\r\n            *html\r\n    margin 0\r\n        margin 10 10 20 100\r\n            container vertical small\r\n");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9wYXJzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9rZW5VdGlsLnRzIiwid2VicGFjazovLy8uL3NyYy90b2tlbml6ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC90ZW1wbGF0ZS5sa2YiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLHNFQUFrQztBQUVsQyxJQUFNLEtBQUssR0FBRyxtQkFBTyxDQUFDLGlEQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDO0FBRXRELElBQU0sSUFBSSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUUzQixRQUFRLENBQUMsSUFBSSxDQUFDLFdB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QyxLQUFLLEdBQUcsV0FBVyxDQUFDO2lCQUNwQztnQkFFRCxpQ0FBaUM7YUFDcEM7aUJBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUN4QixLQUFLLENBQUMsSUFBSSxHQUFHLHFCQUFTLENBQUMsVUFBVSxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQzthQUN0RDtZQUtELHNDQUFzQztZQUN0QyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUsscUJBQVMsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1lBR0QsaUNBQWlDO1lBQ2pDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxFQUFFO2dCQUNILEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN0QztZQUVELE1BQU0sSUFBSSxHQUFHLENBQUM7WUFDZCxHQUFHLElBQUksR0FBRyxDQUFDO1NBQ2Q7UUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLGlCQUFLLEVBQUUsQ0FBQztRQUN4QixHQUFHLENBQUMsSUFBSSxHQUFHLHFCQUFTLENBQUMsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUN2QixDQUFDO0lBNUlNLDZCQUFTLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUEySUwsZ0JBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7O0FDM1FEO0FBQWUsaW9EIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi9yZW5kZXInO1xyXG5cclxuY29uc3QgaW5wdXQgPSByZXF1aXJlKCcuLi90ZXN0L3RlbXBsYXRlLmxrZicpLmRlZmF1bHQ7XHJcblxyXG5jb25zdCBwYWdlID0gcmVuZGVyKGlucHV0KTtcclxuXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFnZSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgeyBUb2tlblN0cmVhbSwgVG9rZW4sIFRva2VuVHlwZSB9IGZyb20gJy4vdG9rZW5VdGlsJztcclxuaW1wb3J0IHsgdG9rZW5pemUgfSBmcm9tICcuL3Rva2VuaXplcic7XHJcbmltcG9ydCB7IGFwcGVuZEZpbGUgfSBmcm9tICdmcyc7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKGlucHV0OiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpIHtcclxuICAgIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKHRva2VuaXplKGlucHV0KSwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgICB2YXIgYXN0ID0gcGFyc2VyLnBhcnNlKCk7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhc3QpKTtcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIE5vZGVUeXBlIHtcclxuICAgIEJMT0NLID0gJ2Jsb2NrJyxcclxuICAgIE1BUkdJTiA9ICdtYXJnaW4nLFxyXG4gICAgQUxJR04gPSAnYWxpZ24nLFxyXG4gICAgQ09OVEFJTkVSID0gJ2NvbnRhaW5lcicsXHJcbiAgICBIVE1MID0gJ2h0bWwnLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTE5vZGUge1xyXG4gICAgdHlwZTogTm9kZVR5cGU7XHJcbiAgICBvcHRpb25zOiBhbnk7XHJcbiAgICBub2RlczogTE5vZGVbXTtcclxuICAgIGxpbmU/OiBudW1iZXI7XHJcbiAgICBmaWxlbmFtZT86IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBOb2RlVHlwZSwgb3B0aW9ucz86IGFueSwgbm9kZXM/OiBMTm9kZVtdLCBsaW5lPzogbnVtYmVyLCBmaWxlbmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICB0aGlzLm5vZGVzID0gbm9kZXMgfHwgW107XHJcbiAgICAgICAgdGhpcy5saW5lID0gbGluZTtcclxuICAgICAgICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBUcmVlIHtcclxuICAgIHJvb3Q6IExOb2RlID0gbmV3IExOb2RlKE5vZGVUeXBlLkNPTlRBSU5FUiwgeyB2ZXJ0aWNhbDogdHJ1ZSB9KTtcclxuICAgIGFwcGVuZChub2RlOiBMTm9kZSwgaW5kZW50OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRoaXMucm9vdDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGVudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghcGFyZW50Tm9kZS5ub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUubm9kZXMucHVzaChuZXcgTE5vZGUoTm9kZVR5cGUuQkxPQ0spKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5ub2Rlc1twYXJlbnROb2RlLm5vZGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJlbnROb2RlLm5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBhcnNlciB7XHJcblxyXG4gICAgcHJpdmF0ZSB0b2tlbnM6IFRva2VuU3RyZWFtO1xyXG4gICAgcHJpdmF0ZSBmaWxlbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBzcmM6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0b2tlbnM6IFRva2VuW10sIG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIHRoaXMudG9rZW5zID0gbmV3IFRva2VuU3RyZWFtKHRva2Vucyk7XHJcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IG9wdGlvbnMuZmlsZW5hbWU7XHJcbiAgICAgICAgdGhpcy5zcmMgPSBvcHRpb25zLnNyYztcclxuICAgICAgICAvL3RoaXMuaW5NaXhpbiA9IDA7XHJcbiAgICAgICAgLy90aGlzLnBsdWdpbnMgPSBvcHRpb25zLnBsdWdpbnMgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgZXJyb3IoY29kZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHRva2VuOiBUb2tlbikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihjb2RlICsgJyAnICsgbWVzc2FnZSArICcgJyArIHRva2VuLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkdmFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5zLmFkdmFuY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwZWVrKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2Vucy5wZWVrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9va2FoZWFkKG46IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2Vucy5sb29rYWhlYWQobik7XHJcbiAgICB9XHJcblxyXG4gICAgcGFyc2UoKSB7XHJcbiAgICAgICAgY29uc3QgdHJlZSA9IG5ldyBUcmVlKCk7XHJcblxyXG4gICAgICAgIHdoaWxlICh0aGlzLnBlZWsoKS50eXBlICE9PSBUb2tlblR5cGUuRU9GKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBlZWsoKS50eXBlID09PSBUb2tlblR5cGUuTkVXTElORSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZHZhbmNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRlbnQgPSB0aGlzLnBlZWsoKS53cy5pbmRlbnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBleHByID0gdGhpcy5wYXJzZUV4cHIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChleHByKSB0cmVlLmFwcGVuZChleHByLCBpbmRlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJlZS5yb290O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cGVjdCh0eXBlOiBUb2tlblR5cGUpIHtcclxuICAgICAgICBpZiAodGhpcy5wZWVrKCkudHlwZSA9PT0gdHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZHZhbmNlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcignSU5WQUxJRF9UT0tFTicsICdleHBlY3RlZCBcIicgKyB0eXBlICsgJ1wiLCBidXQgZ290IFwiJyArIHRoaXMucGVlaygpLnR5cGUgKyAnXCInLCB0aGlzLnBlZWsoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWNjZXB0KHR5cGU6IFRva2VuVHlwZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnBlZWsoKS50eXBlID09PSB0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkdmFuY2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEJsb2NrKGxpbmU6IG51bWJlciwgbm9kZXM6IExOb2RlW10pIHtcclxuICAgICAgICByZXR1cm4gbmV3IExOb2RlKE5vZGVUeXBlLkJMT0NLLCB7fSwgbm9kZXMsIGxpbmUsIHRoaXMuZmlsZW5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5QmxvY2sobGluZTogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdEJsb2NrKGxpbmUsIFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZUV4cHIoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnBlZWsoKS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLktFWVdPUkQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxheW91dCgpO1xyXG4gICAgICAgICAgICBjYXNlIFRva2VuVHlwZS5IVE1MOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VIVE1MKCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yKCdJTlZBTElEX1RPS0VOJywgJ3VuZXhwZWN0ZWQgdG9rZW4gXCInICsgdGhpcy5wZWVrKCkudHlwZSArICdcIicsIHRoaXMucGVlaygpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHBhcnNlTGF5b3V0KCkge1xyXG4gICAgICAgIGNvbnN0IHRvayA9IHRoaXMuZXhwZWN0KFRva2VuVHlwZS5LRVlXT1JEKTtcclxuICAgICAgICBzd2l0Y2ggKHRvay52YWx1ZSkge1xyXG4gICAgICAgICAgICBjYXNlICdtYXJnaW4nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VNYXJnaW4oKTtcclxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6IGNhc2UgJ2NlbnRlcic6IGNhc2UgJ3JpZ2h0JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlSEFsaWduKHRvay52YWx1ZSk7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6IGNhc2UgJ21pZGRsZSc6IGNhc2UgJ2JvdHRvbSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVZBbGlnbih0b2sudmFsdWUpO1xyXG4gICAgICAgICAgICBjYXNlICdjb250YWluZXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VDb250YWluZXIodG9rLnZhbHVlKVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMTm9kZShOb2RlVHlwZS5CTE9DSylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGFyc2VNYXJnaW4oKSB7XHJcbiAgICAgICAgbGV0IHAsIG1hcmdpbiA9IFt0aGlzLmV4cGVjdChUb2tlblR5cGUuTlVNQkVSKS52YWx1ZV07XHJcbiAgICAgICAgd2hpbGUgKHAgPSB0aGlzLmFjY2VwdChUb2tlblR5cGUuTlVNQkVSKSkge1xyXG4gICAgICAgICAgICBtYXJnaW4ucHVzaChwLnZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsID0gbWFyZ2luLmxlbmd0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBMTm9kZShOb2RlVHlwZS5NQVJHSU4sIHtcclxuICAgICAgICAgICAgdG9wOiBtYXJnaW5bMF0sXHJcbiAgICAgICAgICAgIHJpZ2h0OiBtYXJnaW5bMSAlIGxdLFxyXG4gICAgICAgICAgICBib3R0b206IG1hcmdpblsyICUgbF0sXHJcbiAgICAgICAgICAgIGxlZnQ6IG1hcmdpblszICUgbF0sXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZUhBbGlnbihoOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB0b2sgPSB0aGlzLmFjY2VwdChUb2tlblR5cGUuS0VZV09SRClcclxuICAgICAgICBjb25zdCB2ID0gdG9rID8gdG9rLnZhbHVlIDogJ3RvcCc7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMTm9kZShOb2RlVHlwZS5BTElHTiwgeyBoLCB2IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlVkFsaWduKHY6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHRvayA9IHRoaXMuYWNjZXB0KFRva2VuVHlwZS5LRVlXT1JEKVxyXG4gICAgICAgIGNvbnN0IGggPSB0b2sgPyB0b2sudmFsdWUgOiAnbGVmdCc7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMTm9kZShOb2RlVHlwZS5BTElHTiwgeyBoLCB2IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlQ29udGFpbmVyKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IG9wdHM6IGFueSA9IHt9O1xyXG4gICAgICAgIGxldCB0b2s7XHJcbiAgICAgICAgd2hpbGUgKHRvayA9IHRoaXMuYWNjZXB0KFRva2VuVHlwZS5LRVlXT1JEKSkge1xyXG4gICAgICAgICAgICBvcHRzW3Rvay52YWx1ZV0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IExOb2RlKE5vZGVUeXBlLkNPTlRBSU5FUiwgb3B0cylcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZUhUTUwoKSB7XHJcbiAgICAgICAgY29uc3QgdG9rID0gdGhpcy5leHBlY3QoVG9rZW5UeXBlLkhUTUwpXHJcbiAgICAgICAgY29uc29sZS5sb2codG9rKVxyXG4gICAgICAgIHJldHVybiBuZXcgTE5vZGUoTm9kZVR5cGUuSFRNTCwgeyBjb250ZW50OiB0b2sudmFsdWUgfSlcclxuICAgIH1cclxufTsiLCJpbXBvcnQgeyBwYXJzZSwgTE5vZGUsIE5vZGVUeXBlIH0gZnJvbSAnLi9wYXJzZXInXHJcblxyXG5cclxuY29uc3QgY29sb3JzOiBzdHJpbmdbXSA9IFsnYXF1YScsICdibHVlJywgJ2Z1Y2hzaWEnLCAnZ3JheScsICdncmVlbicsXHJcbiAgICAnbGltZScsICdtYXJvb24nLCAnbmF2eScsICdvbGl2ZScsICdvcmFuZ2UnLCAncHVycGxlJywgJ3JlZCcsXHJcbiAgICAnc2lsdmVyJywgJ3RlYWwnLCAneWVsbG93J10ucmV2ZXJzZSgpO1xyXG5sZXQgY29sb3JJbmRleCA9IDA7XHJcbmZ1bmN0aW9uIG5leHRDb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGNvbG9yc1srK2NvbG9ySW5kZXggJSBjb2xvcnMubGVuZ3RoXVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKGlucHV0OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHRyZWUgPSBwYXJzZShpbnB1dCk7XHJcbiAgICBjb25zb2xlLmxvZyh0cmVlKVxyXG4gICAgcmV0dXJuIHJlbmRlck5vZGUodHJlZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlck5vZGUobm9kZTogTE5vZGUpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGxldCBjaGlsZERpdiA9IG51bGw7XHJcbiAgICAvL2Rpdi5pbm5lclRleHQgPSBub2RlLnR5cGU7XHJcbiAgICBkaXYuc3R5bGUuYmFja2dyb3VuZCA9IG5leHRDb2xvcigpO1xyXG4gICAgY29uc3Qgb3B0cyA9IG5vZGUub3B0aW9ucztcclxuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5IVE1MOlxyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gb3B0cy5jb250ZW50O1xyXG4gICAgICAgIGNhc2UgTm9kZVR5cGUuQ09OVEFJTkVSOlxyXG4gICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgZGl2LnN0eWxlLmZsZXhEaXJlY3Rpb24gPSBvcHRzLnZlcnRpY2FsID8gJ2NvbHVtbicgOiAncm93JztcclxuXHJcbiAgICAgICAgICAgIGRpdi5zdHlsZS5mbGV4ID0gb3B0cy5zbWFsbCA/ICdpbml0aWFsJyA6ICdhdXRvJztcclxuICAgICAgICAgICAgZGl2LnN0eWxlLmZsZXhXcmFwID0gb3B0cy5ub3dyYXAgPyAnbm93cmFwJyA6ICd3cmFwJztcclxuICAgICAgICAgICAgaWYgKG9wdHMuZnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGl2LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIE5vZGVUeXBlLk1BUkdJTjpcclxuICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIGRpdi5zdHlsZS5mbGV4ID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICBkaXYuc3R5bGUucGFkZGluZ1RvcCA9IG9wdHMudG9wICsgJ3B4JztcclxuICAgICAgICAgICAgZGl2LnN0eWxlLnBhZGRpbmdSaWdodCA9IG9wdHMucmlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICBkaXYuc3R5bGUucGFkZGluZ0JvdHRvbSA9IG9wdHMuYm90dG9tICsgJ3B4JztcclxuICAgICAgICAgICAgZGl2LnN0eWxlLnBhZGRpbmdMZWZ0ID0gb3B0cy5sZWZ0ICsgJ3B4JztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5BTElHTjpcclxuICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIGRpdi5zdHlsZS5mbGV4ID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICAvL2Rpdi5zdHlsZS5taW5IZWlnaHQgPSAnNDAwcHgnO1xyXG5cclxuICAgICAgICAgICAgY2hpbGREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY2hpbGREaXYuc3R5bGUuZmxleCA9ICdpbml0aWFsJztcclxuICAgICAgICAgICAgY2hpbGREaXYuc3R5bGUubWFyZ2luID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICBpZiAob3B0cy52ID09PSAndG9wJykge1xyXG4gICAgICAgICAgICAgICAgY2hpbGREaXYuc3R5bGUubWFyZ2luVG9wID0gJzAnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMudiA9PT0gJ2JvdHRvbScpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkRGl2LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcwJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdHMuaCA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZERpdi5zdHlsZS5tYXJnaW5MZWZ0ID0gJzAnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMuaCA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICAgICAgY2hpbGREaXYuc3R5bGUubWFyZ2luUmlnaHQgPSAnMCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hpbGREaXYuc3R5bGUuYmFja2dyb3VuZCA9IG5leHRDb2xvcigpO1xyXG5cclxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNoaWxkRGl2KVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgbiBvZiBub2RlLm5vZGVzKSB7XHJcbiAgICAgICAgaWYgKGNoaWxkRGl2KSB7XHJcbiAgICAgICAgICAgIGNoaWxkRGl2LmFwcGVuZENoaWxkKHJlbmRlck5vZGUobikpXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChyZW5kZXJOb2RlKG4pKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghbm9kZS5ub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNoaWxkLnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gICAgICAgIGNoaWxkLnN0eWxlLmhlaWdodCA9ICcyMHB4JztcclxuICAgICAgICBjaGlsZC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJztcclxuICAgICAgICBjaGlsZC5pbm5lclRleHQgPSAnVGVzdCdcclxuICAgICAgICBpZiAoY2hpbGREaXYpIHtcclxuICAgICAgICAgICAgY2hpbGREaXYuYXBwZW5kQ2hpbGQoY2hpbGQpXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjaGlsZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG5cclxuIiwiZXhwb3J0IGVudW0gVG9rZW5UeXBlIHtcclxuICAgIEVPRiA9ICdlb2YnLFxyXG4gICAgTkVXTElORSA9ICduZXdsaW5lJyxcclxuICAgIFdISVRFU1BBQ0UgPSAnd2hpdGVzcGFjZScsXHJcbiAgICBDT01NRU5UID0gJ2NvbW1lbnQnLFxyXG4gICAgTlVNQkVSID0gJ251bWJlcicsXHJcbiAgICBTVFJJTkcgPSAnc3RyaW5nJyxcclxuICAgIEtFWVdPUkQgPSAna2V5d29yZCcsXHJcbiAgICBJREVOVElGSUVSID0gJ2lkZW50aWZpZXInLFxyXG4gICAgQVNTSUdOID0gJ2Fzc2lnbicsXHJcbiAgICBPUEVSQVRPUiA9ICdvcGVyYXRvcicsXHJcbiAgICBMQVlPVVQgPSAnbGF5b3V0JyxcclxuICAgIElOREVOVCA9ICdpbmRlbnQnLFxyXG4gICAgSFRNTCA9ICdodG1sJyxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRva2VuIHtcclxuXHJcbiAgICBjb2wgPSAxO1xyXG4gICAgbGluZSA9IDE7XHJcbiAgICB3cyA9IHtcclxuICAgICAgICBpbmRlbnQ6IDAsXHJcbiAgICAgICAgYmVmb3JlOiAwLFxyXG4gICAgICAgIGFmdGVyOiAwLFxyXG4gICAgICAgIHRyYWlsaW5nOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIHR5cGU/OiBUb2tlblR5cGU7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIHBsYWluPzogc3RyaW5nO1xyXG4gICAgb3BlcmF0b3I/OiBhbnk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG9rZW5TdHJlYW0ge1xyXG4gICAgcHJpdmF0ZSBsaXN0OiBUb2tlbltdID0gW107XHJcbiAgICBwcml2YXRlIHRva2VuUG9zID0gLTE7XHJcblxyXG4gICAgcHVibGljIHBlZWsoKTogVG9rZW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RbdGhpcy50b2tlblBvcyArIDFdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkdmFuY2UoKTogVG9rZW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RbKyt0aGlzLnRva2VuUG9zXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2gge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VuZCBvZiBzdHJlYW0nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbG9va2FoZWFkKG46IG51bWJlcikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RbdGhpcy50b2tlblBvcyArIG5dO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRW5kIG9mIHN0cmVhbScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQoKTogVG9rZW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RbdGhpcy50b2tlblBvc107XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWxsKCk6IFRva2VuW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Q7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYXQocG9zOiBudW1iZXIpOiBUb2tlbiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdFtwb3NdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b2tlblBvcyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IodG9rZW5zOiBUb2tlbltdKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gdG9rZW5zXHJcbiAgICB9XHJcbn0iLCJcclxuLypqc2hpbnQgZXZpbDogdHJ1ZSwgcmVnZXhkYXNoOiBmYWxzZSwgcmVnZXhwOiBmYWxzZSAqL1xyXG5cclxuaW1wb3J0IHsgVG9rZW4sIFRva2VuVHlwZSB9IGZyb20gJy4vdG9rZW5VdGlsJ1xyXG5cclxuY29uc3QgS0VZV09SRFMgPSBbXHJcbiAgICAnYnJlYWsnLFxyXG4gICAgJ2Nhc2UnLCAnY2F0Y2gnLCAnY29uc3QnLCAnY29udGludWUnLFxyXG4gICAgJ2RlYnVnZ2VyJywgJ2RlZmF1bHQnLCAnZGVsZXRlJywgJ2RvJyxcclxuICAgICdlbHNlJywgJ2VudW0nLFxyXG4gICAgJ2ZhbHNlJywgJ2ZpbmFsbHknLCAnZm9yJywgJ2Z1bmN0aW9uJyxcclxuICAgICdpZicsICdpbicsICdpbnN0YW5jZW9mJyxcclxuICAgICduZXcnLCAnbnVsbCcsXHJcbiAgICAncmV0dXJuJyxcclxuICAgICdzd2l0Y2gnLFxyXG4gICAgJ3RoaXMnLCAndGhyb3cnLCAndHJ1ZScsICd0cnknLCAndHlwZW9mJyxcclxuICAgICd2YXInLCAndm9pZCcsXHJcbiAgICAnd2hpbGUnLCAnd2l0aCcsXHJcblxyXG4gICAgJ21hcmdpbicsXHJcbiAgICAnbGVmdCcsICdjZW50ZXInLCAncmlnaHQnLFxyXG4gICAgJ3RvcCcsICdtaWRkbGUnLCAnYm90dG9tJyxcclxuICAgICdjb250YWluZXInLCAndmVydGljYWwnLCAnc21hbGwnLCAnZnVsbCcsICdub3dyYXAnXHJcbl07XHJcblxyXG50eXBlIERpY3QgPSB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIH1cclxuXHJcbmNvbnN0IE9QRVJBVE9SUzogRGljdCA9IHtcclxuICAgICc+Pj49JzogJ0FTU0lHTl9VUlNIJyxcclxuICAgICc+Pj0nOiAnQVNTSUdOX1JTSCcsXHJcbiAgICAnPDw9JzogJ0FTU0lHTl9MU0gnLFxyXG4gICAgJ3w9JzogJ0FTU0lHTl9CSVRXSVNFX09SJyxcclxuICAgICdePSc6ICdBU1NJR05fQklUV0lTRV9YT1InLFxyXG4gICAgJyY9JzogJ0FTU0lHTl9CSVRXSVNFX0FORCcsXHJcbiAgICAnKz0nOiAnQVNTSUdOX1BMVVMnLFxyXG4gICAgJy09JzogJ0FTU0lHTl9NSU5VUycsXHJcbiAgICAnKj0nOiAnQVNTSUdOX01VTCcsXHJcbiAgICAnLz0nOiAnQVNTSUdOX0RJVicsXHJcbiAgICAnJT0nOiAnQVNTSUdOX01PRCcsXHJcbiAgICAnOyc6ICdTRU1JQ09MT04nLFxyXG4gICAgJywnOiAnQ09NTUEnLFxyXG4gICAgJz8nOiAnSE9PSycsXHJcbiAgICAnOic6ICdDT0xPTicsXHJcbiAgICAnfHwnOiAnT1InLFxyXG4gICAgJyYmJzogJ0FORCcsXHJcbiAgICAnfCc6ICdCSVRXSVNFX09SJyxcclxuICAgICdeJzogJ0JJVFdJU0VfWE9SJyxcclxuICAgICcmJzogJ0JJVFdJU0VfQU5EJyxcclxuICAgICc9PT0nOiAnU1RSSUNUX0VRJyxcclxuICAgICc9PSc6ICdFUScsXHJcbiAgICAnPSc6ICdBU1NJR04nLFxyXG4gICAgJyE9PSc6ICdTVFJJQ1RfTkUnLFxyXG4gICAgJyE9JzogJ05FJyxcclxuICAgICc8PCc6ICdMU0gnLFxyXG4gICAgJzw9JzogJ0xFJyxcclxuICAgICc8JzogJ0xUJyxcclxuICAgICc+Pj4nOiAnVVJTSCcsXHJcbiAgICAnPj4nOiAnUlNIJyxcclxuICAgICc+PSc6ICdHRScsXHJcbiAgICAnPic6ICdHVCcsXHJcbiAgICAnKysnOiAnSU5DUkVNRU5UJyxcclxuICAgICctLSc6ICdERUNSRU1FTlQnLFxyXG4gICAgJysnOiAnUExVUycsXHJcbiAgICAnLSc6ICdNSU5VUycsXHJcbiAgICAnKic6ICdNVUwnLFxyXG4gICAgJy8nOiAnRElWJyxcclxuICAgICclJzogJ01PRCcsXHJcbiAgICAnISc6ICdOT1QnLFxyXG4gICAgJ34nOiAnQklUV0lTRV9OT1QnLFxyXG4gICAgJy4nOiAnRE9UJyxcclxuICAgICdbJzogJ0xFRlRfQlJBQ0tFVCcsXHJcbiAgICAnXSc6ICdSSUdIVF9CUkFDS0VUJyxcclxuICAgICd7JzogJ0xFRlRfQ1VSTFknLFxyXG4gICAgJ30nOiAnUklHSFRfQ1VSTFknLFxyXG4gICAgJygnOiAnTEVGVF9QQVJFTicsXHJcbiAgICAnKSc6ICdSSUdIVF9QQVJFTidcclxuXHJcbn07XHJcblxyXG4vLyBSZWd1bGFyIEV4cHJlc3Npb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxubGV0IG9wTWF0Y2ggPSAnXic7XHJcbmZvciAobGV0IGkgaW4gT1BFUkFUT1JTKSB7XHJcblxyXG4gICAgaWYgKG9wTWF0Y2ggIT09ICdeJykge1xyXG4gICAgICAgIG9wTWF0Y2ggKz0gJ3xeJztcclxuICAgIH1cclxuXHJcbiAgICBvcE1hdGNoICs9IGkucmVwbGFjZSgvWz98XiYoKXt9XFxbXFxdK1xcLSpcXC9cXC5dL2csICdcXFxcJCYnKTtcclxuXHJcbn1cclxuXHJcbmxldCBvcFJlZ0V4cCA9IG5ldyBSZWdFeHAob3BNYXRjaCksXHJcbiAgICBmcFJlZ0V4cCA9IC9eXFxkK1xcLlxcZCooPzpbZUVdWy0rXT9cXGQrKT98XlxcZCsoPzpcXC5cXGQqKT9bZUVdWy0rXT9cXGQrfF5cXC5cXGQrKD86W2VFXVstK10/XFxkKyk/LyxcclxuICAgIHJlUmVnRXhwID0gL15cXC8oKD86XFxcXC58XFxbKD86XFxcXC58W15cXF1dKSpcXF18W15cXC9dKSspXFwvKFtnaW15XSopLyxcclxuICAgIGludFJlZ0V4cCA9IC9eMFt4WF1bXFxkYS1mQS1GXSt8XjBbMC03XSp8XlxcZCsvLFxyXG4gICAgY29tbWVudFJlZ0V4cCA9IC9eXFwvXFwvLiovLFxyXG4gICAgaHRtbFJlZ0V4cCA9IC9eaHRtbFxcKigufFtcXHJcXG5dKSo/XFwqaHRtbC9tLFxyXG4gICAgaWRlbnRSZWdFeHAgPSAvXlskX1xcd10rLyxcclxuICAgIHdzUmVnRXhwID0gL15bXFwgXFx0XSsvLFxyXG4gICAgc3RyUmVnRXhwID0gL14nKFteJ1xcXFxdfFxcXFwuKSonfF5cIihbXlwiXFxcXF18XFxcXC4pKlwiLztcclxuXHJcbi8vIFRva2VuIENsYXNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcblRva2VuLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAnWycgKyAodGhpcy50eXBlICsgJyAgICAgICAgJykuc3Vic3RyKDAsIDEzKSArICcgJ1xyXG4gICAgICAgICsgJ1snICsgdGhpcy53cy5pbmRlbnQgKyAnOicgKyB0aGlzLndzLmJlZm9yZSArICddJyArIHRoaXMubGluZVxyXG4gICAgICAgICsgJzonICsgdGhpcy5jb2wgKyAnWycgKyB0aGlzLndzLmFmdGVyICsgJzonICsgdGhpcy53cy50cmFpbGluZ1xyXG4gICAgICAgICsgJ10nICsgJzogJyArIHRoaXMudmFsdWUgKyAnXSc7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRva2VuaXplKGlucHV0OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHRvY2tlbml6ZXIgPSBuZXcgVG9rZW5pemVyKGlucHV0KTtcclxuICAgIHJldHVybiB0b2NrZW5pemVyLmdldFRva2VucygpO1xyXG59XHJcblxyXG5cclxuLy8gTWFpbiBUb2tlbml6ZXIgZnVuY3Rpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmNsYXNzIFRva2VuaXplciB7XHJcblxyXG4gICAgcHJpdmF0ZSBsaXN0OiBUb2tlbltdID0gW107XHJcblxyXG4gICAgcHVibGljIGdldFRva2VucygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgbGV0IGN1cnNvciA9IDAsXHJcbiAgICAgICAgICAgIGxpbmUgPSAxLFxyXG4gICAgICAgICAgICBjb2wgPSAwLFxyXG4gICAgICAgICAgICBzcGFjZUJlZm9yZSA9IDAsXHJcbiAgICAgICAgICAgIGluZGVudGF0aW9uID0gMCxcclxuICAgICAgICAgICAgdGFiV2lkdGggPSA0LFxyXG4gICAgICAgICAgICB0b2tlbjogVG9rZW4gPSBuZXcgVG9rZW4oKSxcclxuICAgICAgICAgICAgbGFzdFRva2VuID0gbnVsbDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGN1cnNvciA8IGlucHV0Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgLy8gU2F2ZSB0aGUgbGFzdCBub24td2hpdGVzcGFjZSB0b2tlblxyXG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gVG9rZW5UeXBlLldISVRFU1BBQ0UpIHtcclxuICAgICAgICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJlc3RcclxuICAgICAgICAgICAgLy8gV2UgYWxzbyBncmFiIHRoZSByZXN0IG9mIHRoZSBsaW5lIGhlcmUgZm9yIHJlZ2V4cHNcclxuICAgICAgICAgICAgbGV0IHN1YiA9IGlucHV0LnN1YnN0cmluZyhjdXJzb3IpLFxyXG4gICAgICAgICAgICAgICAgc3VibGluZSA9IHN1Yi5zdWJzdHJpbmcoMCwgc3ViLmluZGV4T2YoJ1xcbicpKSxcclxuICAgICAgICAgICAgICAgIG06IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gbnVsbDtcclxuXHJcblxyXG4gICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbigpO1xyXG4gICAgICAgICAgICB0b2tlbi5saW5lID0gbGluZTtcclxuICAgICAgICAgICAgdG9rZW4uY29sID0gY29sO1xyXG4gICAgICAgICAgICB0b2tlbi53cy5pbmRlbnQgPSBNYXRoLmZsb29yKGluZGVudGF0aW9uIC8gdGFiV2lkdGgpO1xyXG4gICAgICAgICAgICB0b2tlbi53cy5iZWZvcmUgPSBsYXN0VG9rZW4gJiYgbGFzdFRva2VuLnR5cGUgPT09IFRva2VuVHlwZS5ORVdMSU5FID8gMCA6IHNwYWNlQmVmb3JlO1xyXG5cclxuICAgICAgICAgICAgLy8gTmV3bGluZXNcclxuICAgICAgICAgICAgaWYgKHN1YlswXSA9PT0gJ1xcbicpIHtcclxuICAgICAgICAgICAgICAgIHRva2VuLnR5cGUgPSBUb2tlblR5cGUuTkVXTElORTtcclxuICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlID0gJ1xcXFxuJztcclxuICAgICAgICAgICAgICAgIHRva2VuLnBsYWluID0gc3ViWzBdO1xyXG4gICAgICAgICAgICAgICAgY29sID0gMDtcclxuICAgICAgICAgICAgICAgIGxpbmUrKztcclxuICAgICAgICAgICAgICAgIGluZGVudGF0aW9uID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBIVE1MXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKG0gPSBzdWIubWF0Y2goaHRtbFJlZ0V4cCkpKSB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi50eXBlID0gVG9rZW5UeXBlLkhUTUw7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi5wbGFpbiA9IG1bMF07XHJcbiAgICAgICAgICAgICAgICB0b2tlbi52YWx1ZSA9IG1bMF0uc2xpY2UoNSwgLTUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsaW5lcyA9IHRva2VuLnBsYWluLnNwbGl0KCdcXG4nKTtcclxuICAgICAgICAgICAgICAgIGxpbmUgKz0gbGluZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGNvbCA9IGxpbmVzW2xpbmVzLmxlbmd0aCAtIDFdLmxlbmd0aCAtIG1bMF0ubGVuZ3RoICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21tZW50XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKG0gPSBzdWJsaW5lLm1hdGNoKGNvbW1lbnRSZWdFeHApKSkge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4udHlwZSA9IFRva2VuVHlwZS5DT01NRU5UO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4ucGxhaW4gPSBtWzBdO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4udmFsdWUgPSBtWzBdLnN1YnN0cigyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBudW1iZXJcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgobSA9IHN1Yi5tYXRjaChmcFJlZ0V4cCkpIHx8IChtID0gc3ViLm1hdGNoKGludFJlZ0V4cCkpKSB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi50eXBlID0gVG9rZW5UeXBlLk5VTUJFUjtcclxuICAgICAgICAgICAgICAgIHRva2VuLnBsYWluID0gbVswXTtcclxuICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlID0gKyhtWzBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdHJpbmdcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgobSA9IHN1Yi5tYXRjaChzdHJSZWdFeHApKSkge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4udHlwZSA9IFRva2VuVHlwZS5TVFJJTkc7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi5wbGFpbiA9IG1bMF07XHJcbiAgICAgICAgICAgICAgICB0b2tlbi52YWx1ZSA9IGV2YWwobVswXSk7IC8vIHNpbXBlbHN0IHdheSB0byBnZXQgdGhlIGFjdHVhbCBqcyBzdHJpbmcgdmFsdWUsIGRvbid0IGJlYXQgbWUsIHRha2VuIGZyb20gbmFyY2lzc3VzIVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElkZW50aWZpZXJcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgobSA9IHN1Yi5tYXRjaChpZGVudFJlZ0V4cCkpKSB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi52YWx1ZSA9IG1bMF07XHJcbiAgICAgICAgICAgICAgICB0b2tlbi50eXBlID0gS0VZV09SRFMuaW5kZXhPZih0b2tlbi52YWx1ZSkgIT09IC0xID8gVG9rZW5UeXBlLktFWVdPUkQgOiBUb2tlblR5cGUuSURFTlRJRklFUjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBPcGVyYXRvclxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChtID0gc3ViLm1hdGNoKG9wUmVnRXhwKSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgYXNzaWdubWVudHNcclxuICAgICAgICAgICAgICAgIGxldCBvcCA9IE9QRVJBVE9SU1ttWzBdXTtcclxuICAgICAgICAgICAgICAgIGlmIChvcC5zdWJzdHJpbmcoMCwgNikgPT09ICdBU1NJR04nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLnR5cGUgPSBUb2tlblR5cGUuQVNTSUdOO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcCA9PT0gJ0FTU0lHTicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4ub3BlcmF0b3IgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5vcGVyYXRvciA9IG9wLnN1YnN0cmluZyg3KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi50eXBlID0gVG9rZW5UeXBlLk9QRVJBVE9SO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlID0gbVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBXaGl0ZXNwYWNlIGhhbmRsaW5nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKG0gPSBzdWIubWF0Y2god3NSZWdFeHApKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRva2VuLnR5cGUgPSBUb2tlblR5cGUuV0hJVEVTUEFDRTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcGFjZUJlZm9yZSA9IG1bMF0ucmVwbGFjZSgvXFx0L2csICcgICAgJykubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGVudGF0aW9uID0gc3BhY2VCZWZvcmU7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0VG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0VG9rZW4ud3MuYWZ0ZXIgPSBzcGFjZUJlZm9yZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBldmVyIGhpdCB0aGlzLi4uIHdlIHN1Y2tcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJbMF0gPT09ICdcXHInKSB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi50eXBlID0gVG9rZW5UeXBlLldISVRFU1BBQ0U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQ6ICcgKyBzdWJbMF0gKyAnIG9uIDonKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIG5vbi13aGl0ZXNwYWNlIHRva2VucyB0byBzdHJlYW1cclxuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IFRva2VuVHlwZS5XSElURVNQQUNFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaCh0b2tlbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBBZHZhbmNlIGN1cnNvciBieSBtYXRjaCBsZW5ndGhcclxuICAgICAgICAgICAgbGV0IGxlbiA9IDE7XHJcbiAgICAgICAgICAgIGlmIChtKSB7XHJcbiAgICAgICAgICAgICAgICBsZW4gPSBtWzBdLmxlbmd0aCArIChtLmluZGV4IHx8IDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjdXJzb3IgKz0gbGVuO1xyXG4gICAgICAgICAgICBjb2wgKz0gbGVuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZW9mID0gbmV3IFRva2VuKCk7XHJcbiAgICAgICAgZW9mLnR5cGUgPSBUb2tlblR5cGUuRU9GO1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKGVvZilcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IFwiY29udGFpbmVyXFxyXFxuICAgIGh0bWwqXFxyXFxuICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dC1hcmVhJyBwbGFjZWhvbGRlcj0nVGV4dGUnLz5cXHJcXG4gICAgICAgIDxidXR0b24gPiBUZXN0IDwvYnV0dG9uPlxcclxcbiAgICAgICAgPHA+IFVuIGxvbmcgdGVzdGRhc2ZkIGFzZnBvdSBwb3V0YWVzICBkYWZhYXNmZFxcclxcbiAgICAgICAgYXNkZm9xd2lldGhkYXNcXHJcXG4gICAgICAgIGZhc2RmcXdlcnRhc2dmZHNhZGFzZmFmPC9wPlxcclxcbiAgICAqaHRtbFxcclxcblxcclxcblxcclxcblxcclxcblxcclxcbmNvbnRhaW5lciB2ZXJ0aWNhbFxcclxcbiAgICBjb250YWluZXIgc21hbGxcXHJcXG4gICAgICAgIG1hcmdpbiAxMFxcclxcbiAgICBjb250YWluZXJcXHJcXG4gICAgICAgIG1hcmdpbiAxMCAxMCAyMCAxMDBcXHJcXG4gICAgICAgICAgICBjb250YWluZXJcXHJcXG4gICAgICAgICAgICAgICAgY29udGFpbmVyIHNtYWxsXFxyXFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXIgbWlkZGxlXFxyXFxuICAgICAgICBtYXJnaW4gMTAgMTAgMjAgMTAwXFxyXFxuICAgICAgICAgICAgcmlnaHQgYm90dG9tXFxyXFxuICAgICAgICBtYXJnaW4gMFxcclxcbiAgICAgICAgICAgIG1hcmdpbiAxMCAxMCAyMCAxMDBcXHJcXG4gICAgICAgICAgICAgICAgY29udGFpbmVyIHZlcnRpY2FsIHNtYWxsXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCpcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQtYXJlYScgcGxhY2Vob2xkZXI9J1RleHRlJy8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gPiBUZXN0IDwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4gVW4gbG9uZyB0ZXN0ZGFzZmQgYXNmcG91IHBvdXRhZXMgIGRhZmFhc2ZkXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzZGZvcXdpZXRoZGFzXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhc2RmcXdlcnRhc2dmZHNhZGFzZmFmPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICpodG1sXFxyXFxuXFxyXFxuY29udGFpbmVyIGZ1bGxcXHJcXG4gICAgbWFyZ2luIDBcXHJcXG4gICAgICAgIG1hcmdpbiAxMCAxMCAyMCAxMDBcXHJcXG4gICAgICAgICAgICBjb250YWluZXIgdmVydGljYWwgc21hbGxcXHJcXG4gICAgICAgICAgICAgICAgY2VudGVyIG1pZGRsZVxcclxcbiAgICBtYXJnaW4gMTAgMTAgMjAgMTAwXFxyXFxuICAgICAgICByaWdodCBib3R0b21cXHJcXG4gICAgICAgICAgICBodG1sKlxcclxcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dC1hcmVhJyBwbGFjZWhvbGRlcj0nVGV4dGUnLz5cXHJcXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiA+IFRlc3QgPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDxwPiBVbiBsb25nIHRlc3RkYXNmZCBhc2Zwb3UgcG91dGFlcyAgZGFmYWFzZmRcXHJcXG4gICAgICAgICAgICAgICAgYXNkZm9xd2lldGhkYXNcXHJcXG4gICAgICAgICAgICAgICAgZmFzZGZxd2VydGFzZ2Zkc2FkYXNmYWY8L3A+XFxyXFxuICAgICAgICAgICAgKmh0bWxcXHJcXG4gICAgbWFyZ2luIDBcXHJcXG4gICAgICAgIG1hcmdpbiAxMCAxMCAyMCAxMDBcXHJcXG4gICAgICAgICAgICBjb250YWluZXIgdmVydGljYWwgc21hbGxcXHJcXG5cIiJdLCJzb3VyY2VSb290IjoiIn0=