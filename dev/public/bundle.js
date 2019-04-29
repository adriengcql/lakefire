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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/app/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/component.js":
/*!***************************!*\
  !*** ./dist/component.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodeUtil_1 = __webpack_require__(/*! ./nodeUtil */ "./dist/nodeUtil.js");
var helpers_1 = __webpack_require__(/*! ./helpers */ "./dist/helpers.js");
var _components = __webpack_require__(/*! ../test/app/global.json */ "./test/app/global.json");
var colors = ['aqua', 'blue', 'fuchsia', 'gray', 'green',
    'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
    'silver', 'teal', 'yellow'].reverse();
var colorIndex = 0;
function nextColor() {
    return colors[++colorIndex % colors.length];
}
function head(h) {
    return function (constructor) {
        constructor.prototype.template = h.template;
        constructor.prototype.importedComponents = h.components;
        constructor.prototype.stylesheet = h.stylesheet;
    };
}
exports.head = head;
function evalExp(exp, ctx) {
    if (!exp) {
        return '';
    }
    try {
        return (Function('return ' + exp)).call(ctx);
    }
    catch (err) {
        console.error(err);
        helpers_1.debug(err, 'error');
        return '';
    }
}
var Component = /** @class */ (function () {
    function Component(props) {
        this.children = {};
        this.scopes = [];
        this.state = new Set();
        this.mounted = false;
        this.updating = false;
        this.elements = {};
        this.components = {};
        this.type = this.constructor.name;
        var self = this;
        this.root = __assign({}, self['template']) || new nodeUtil_1.LNode(nodeUtil_1.NodeType.BLOCK);
        this.imports = self['importedComponents'] || {};
        this.styles = self['stylesheet'] || {};
        this.props = props || {};
    }
    Component.prototype.componentWillMount = function () { };
    Component.prototype.componentDidMount = function () { };
    Component.prototype.componentWillUpdate = function () { };
    Component.prototype.componentDidUpdate = function () { };
    Component.prototype.mount = function (anchor, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.root.options = options;
        this.componentWillMount();
        this.html = this.render();
        if (this.html) {
            this.html.component = this;
            anchor.replaceWith(this.html);
        }
        for (var _i = 0, _a = Object.values(this.children); _i < _a.length; _i++) {
            var child = _a[_i];
            var _b = child.options, localId = _b.localId, tag = _b.tag;
            delete child.options.localId;
            child.component.mount(child.anchor, child.options);
            if (localId) {
                this.components[localId] = child.component;
                this.elements[localId] = child.component.html;
            }
            if (child.component.html && tag) {
                child.component.html.classList.add(tag);
            }
        }
        this.state.forEach(function (v) {
            Object.defineProperty(_this, v, {
                get: function () {
                    return this['i' + v];
                },
                set: function (value) {
                    this['i' + v] = value;
                    if (!this.updating) {
                        this.refresh();
                    }
                }
            });
        });
        this.componentDidMount();
        this.mounted = true;
    };
    Component.prototype.refresh = function (props) {
        this.props = props || this.props;
        this.updating = true;
        this.componentWillUpdate();
        var newHtml = this.render();
        if (this.html) {
            newHtml.component = this;
            this.html.replaceWith(newHtml);
            this.html = newHtml;
        }
        for (var _i = 0, _a = Object.values(this.children); _i < _a.length; _i++) {
            var child = _a[_i];
            var _b = child.options, localId = _b.localId, tag = _b.tag;
            delete child.options.localId;
            child.component.refresh(child.props);
            if (child.component.html) {
                if (tag) {
                    child.component.html.classList.add(tag);
                }
                child.anchor.replaceWith(child.component.html);
            }
            if (localId) {
                this.elements[localId] = child.component.html;
            }
        }
        this.componentDidUpdate();
        this.updating = false;
    };
    Component.prototype.render = function () {
        return this.renderNode(this.root) || undefined;
    };
    Component.prototype.renderNode = function (node) {
        switch (node.type) {
            case nodeUtil_1.NodeType.BLOCK:
                return this.renderBlock(node);
            case nodeUtil_1.NodeType.CONTAINER:
                return this.renderContainer(node);
            case nodeUtil_1.NodeType.HTML:
                return this.renderHTML(node);
            case nodeUtil_1.NodeType.COMPONENT:
                return this.renderComponent(node);
            case nodeUtil_1.NodeType.CONDITION:
                return this.renderCondition(node);
            case nodeUtil_1.NodeType.LOOP:
                return this.renderLoop(node);
            case nodeUtil_1.NodeType.SCRIPT:
                this.execJavascript(node.options.script);
                return null;
            default:
                return document.createElement('div');
        }
    };
    Component.prototype.renderChildren = function (div, nodes) {
        var vars = {};
        var proxy = new Proxy(vars, {
            has: function (target, prop) { return true; },
            get: function (target, prop) { return (prop in target ? target : window)[prop]; }
        });
        for (var _i = 0, _a = this.scopes; _i < _a.length; _i++) {
            var scope = _a[_i];
            for (var k in scope) {
                proxy[k] = scope[k];
            }
        }
        this.scopes.push(proxy);
        for (var _b = 0, nodes_1 = nodes; _b < nodes_1.length; _b++) {
            var n = nodes_1[_b];
            var children = this.renderNode(n);
            if (children) {
                if (Array.isArray(children)) {
                    div.append.apply(div, children);
                }
                else {
                    div.appendChild(children);
                }
            }
        }
        this.scopes.pop();
    };
    Component.prototype.createElement = function (tag, opts) {
        var _this = this;
        var div = document.createElement(tag);
        if (tag !== 'div') {
            div.classList.add(tag);
        }
        if (opts.classList && opts.classList.length) {
            div.classList.add(opts.classList.map(function (c) { return _this.styles[c] || c; }));
        }
        for (var att in opts.attributes) {
            div.setAttribute(att, opts.attributes[att]);
        }
        if (opts.globalId) {
            div.id = opts.globalId;
        }
        if (opts.localId) {
            this.elements[opts.localId] = div;
        }
        //div.style.background = nextColor();
        return div;
    };
    Component.prototype.renderBlock = function (node) {
        var div = this.createElement('div', node.options);
        this.renderChildren(div, node.nodes);
        return div;
    };
    Component.prototype.renderContainer = function (node) {
        var opts = node.options;
        var div = this.createElement('div', opts);
        //div.innerText = 'Container'+-+-
        div.classList.add('container');
        div.style.display = 'flex';
        div.style.flexDirection = opts.vertical ? 'column' : 'row';
        div.style.flex = opts.small ? 'initial' : 'auto';
        div.style.flexWrap = opts.nowrap ? 'nowrap' : 'wrap';
        if (opts.full) {
            div.style.height = '100%';
        }
        if (opts.margin) {
            var _a = opts.margin, top_1 = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left;
            var f = function (m) { return m >= 0 ? 'padding' : 'margin'; };
            div.style.setProperty(f(top_1) + '-top', top_1 + 'px');
            div.style.setProperty(f(right) + '-right', right + 'px');
            div.style.setProperty(f(bottom) + '-bottom', bottom + 'px');
            div.style.setProperty(f(left) + '-left', left + 'px');
        }
        if (opts.align.vertical || opts.align.horizontal) {
            var v = opts.align.vertical || 'middle';
            var h = opts.align.horizontal || 'left';
            var childDiv = document.createElement('div');
            childDiv.style.flex = 'initial';
            childDiv.style.margin = 'auto';
            if (v === 'top') {
                childDiv.style.marginTop = '0';
            }
            else if (v === 'bottom') {
                childDiv.style.marginBottom = '0';
            }
            if (h === 'left') {
                childDiv.style.marginLeft = '0';
            }
            else if (h === 'right') {
                childDiv.style.marginRight = '0';
            }
            this.renderChildren(childDiv, node.nodes);
            div.appendChild(childDiv);
        }
        else {
            this.renderChildren(div, node.nodes);
        }
        return div;
    };
    Component.prototype.renderHTML = function (node) {
        var opts = node.options;
        var div = this.createElement(opts.tag, opts);
        if (opts.content) {
            div.innerText = this.evalExp(opts.content);
        }
        this.renderChildren(div, node.nodes);
        return div;
    };
    Component.prototype.renderComponent = function (node) {
        var opts = node.options;
        var div = document.createElement('div');
        var props = this.evalExp(opts.props);
        if (!(opts.id in this.children)) {
            this.children[opts.id] = { anchor: div, component: new this.imports[opts.tag](props), options: opts, props: props };
        }
        else {
            this.children[opts.id].anchor = div;
            this.children[opts.id].props = props;
        }
        return div;
    };
    Component.prototype.renderCondition = function (node) {
        var div = document.createElement('div');
        for (var _i = 0, _a = node.nodes; _i < _a.length; _i++) {
            var n = _a[_i];
            if (((n.type === nodeUtil_1.NodeType.IF || n.type === nodeUtil_1.NodeType.ELIF) && this.evalExp(n.options.expression)) || n.type === nodeUtil_1.NodeType.ELSE) {
                this.renderChildren(div, n.nodes);
                return Array.from(div.children);
            }
        }
        return null;
    };
    Component.prototype.renderLoop = function (node) {
        var opts = node.options;
        var div = document.createElement('div');
        var proxy = helpers_1.last(this.scopes);
        for (var _i = 0, _a = this.evalExp(opts.expression); _i < _a.length; _i++) {
            var item = _a[_i];
            proxy[opts.variable.trim()] = item;
            this.renderChildren(div, node.nodes);
        }
        return Array.from(div.children);
    };
    Component.prototype.execJavascript = function (script) {
        var _this = this;
        if (!script) {
            return null;
        }
        try {
            if (!this.mounted) {
                var vars_1 = script.match(/(this\.\w+\b)(?!\()/g) || [];
                var funcs = script.match(/(this\.\w+\b)(?=\()/g) || [];
                funcs.map(function (f) { return vars_1 = vars_1.concat(_this[f.substr(5)].toString().match(/(this\.\w+\b)(?!\()/g)); });
                vars_1.filter(function (v) { return v && v !== 'this.props'; }).map(function (v) { return _this.state.add(v.substr(5)); });
            }
            var exp = script.replace(/\b(let|const)\s/g, 'var ');
            var proxy = helpers_1.last(this.scopes);
            return (Function('return (function(proxy) { with(proxy) { ' + exp + '} })'))().call(this, proxy);
        }
        catch (err) {
            helpers_1.debug(script, 'error');
            return null;
        }
    };
    Component.prototype.evalExp = function (exp) {
        return this.execJavascript('return ' + exp);
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./dist/helpers.js":
/*!*************************!*\
  !*** ./dist/helpers.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function first(array) {
    if (array.length) {
        return array[0];
    }
    return null;
}
exports.first = first;
function last(array) {
    if (array.length) {
        return array[array.length - 1];
    }
    return null;
}
exports.last = last;
function debug(msg, type) {
    if (type === void 0) { type = 'log'; }
    switch (type) {
        case 'log':
            console.log(msg);
            break;
        case 'warn':
            console.warn(msg);
            break;
        case 'error':
            console.error(msg);
            break;
    }
}
exports.debug = debug;
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./dist/modules.js":
/*!*************************!*\
  !*** ./dist/modules.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(/*! ./component */ "./dist/component.js");
exports.Component = component_1.Component;
exports.head = component_1.head;
var nodeUtil_1 = __webpack_require__(/*! ./nodeUtil */ "./dist/nodeUtil.js");
exports.LNode = nodeUtil_1.LNode;
//# sourceMappingURL=modules.js.map

/***/ }),

/***/ "./dist/nodeUtil.js":
/*!**************************!*\
  !*** ./dist/nodeUtil.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! ./helpers */ "./dist/helpers.js");
var NodeType;
(function (NodeType) {
    NodeType["BLOCK"] = "block";
    NodeType["CONTAINER"] = "container";
    NodeType["HTML"] = "html";
    NodeType["COMPONENT"] = "component";
    NodeType["DATA"] = "data";
    NodeType["SCRIPT"] = "script";
    NodeType["LOOP"] = "loop";
    NodeType["CONDITION"] = "condition";
    NodeType["IF"] = "if";
    NodeType["ELIF"] = "else if";
    NodeType["ELSE"] = "else";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
var LNode = /** @class */ (function () {
    function LNode(type, options, nodes) {
        this.type = type;
        this.options = options || {};
        this.nodes = nodes || [];
    }
    return LNode;
}());
exports.LNode = LNode;
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = new LNode(NodeType.BLOCK);
    }
    Tree.prototype.append = function (node, indent) {
        var parentNode = this.root;
        for (var i = 0; i < indent; i++) {
            if (!parentNode.nodes.length) {
                parentNode.nodes.push(new LNode(NodeType.BLOCK));
            }
            parentNode = helpers_1.last(parentNode.nodes);
        }
        if (parentNode.type === NodeType.CONDITION) {
            parentNode = helpers_1.last(parentNode.nodes);
        }
        if (node.type === NodeType.IF) {
            parentNode.nodes.push(new LNode(NodeType.CONDITION, {}, [node]));
        }
        else if (node.type === NodeType.ELIF || node.type === NodeType.ELSE) {
            var condNode = helpers_1.last(parentNode.nodes);
            if (!condNode || condNode.type !== NodeType.CONDITION) {
                throw new Error('error in condition structure');
            }
            condNode.nodes.push(node);
        }
        else {
            parentNode.nodes.push(node);
        }
    };
    return Tree;
}());
exports.Tree = Tree;
//# sourceMappingURL=nodeUtil.js.map

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./test/app/testComp/TestComp.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-1!./test/app/testComp/TestComp.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\r\n.TestComp__test___3y8_d {\r\n    border: 10px blue solid;\r\n}", ""]);

// Exports
exports.locals = {
	"test": "TestComp__test___3y8_d"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./test/app/App.ts":
/*!*************************!*\
  !*** ./test/app/App.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var modules_1 = __webpack_require__(/*! ../../dist/modules */ "./dist/modules.js");
var TestComp_1 = __importDefault(__webpack_require__(/*! ./testComp/TestComp */ "./test/app/testComp/TestComp.ts"));
var TestLoop_1 = __importDefault(__webpack_require__(/*! ./testComp/TestLoop */ "./test/app/testComp/TestLoop.ts"));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vartest = 'Hello there';
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var _this = this;
        console.log(this.elements.testlocal, this.components.testlocal);
        setTimeout(function () {
            //this.refresh()
            _this.vartest = 'Hi!';
            console.log(_this.vartest);
        }, 2000);
    };
    App = __decorate([
        modules_1.head({
            template: __webpack_require__(/*! ./app.json */ "./test/app/app.json"),
            components: { TestComp: TestComp_1.default, TestLoop: TestLoop_1.default }
        })
    ], App);
    return App;
}(modules_1.Component));
exports.default = App;


/***/ }),

/***/ "./test/app/app.json":
/*!***************************!*\
  !*** ./test/app/app.json ***!
  \***************************/
/*! exports provided: type, options, nodes, default */
/***/ (function(module) {

module.exports = {"type":"block","options":{},"nodes":[{"type":"container","options":{"align":{},"vertical":true},"nodes":[{"type":"container","options":{"align":{"horizontal":"center","vertical":"middle"},"middle":true,"margin":{"top":"20","right":"20","bottom":"20","left":"20"}},"nodes":[{"type":"script","options":{"script":" const l = 1"},"nodes":[]},{"type":"container","options":{"align":{}},"nodes":[{"type":"html","options":{"tag":"input","id":"*-0","classList":[],"attributes":{"type":"'number'","title":"'test' + 'test2'"},"props":"{}"},"nodes":[]},{"type":"container","options":{"align":{"horizontal":"right"}},"nodes":[{"type":"html","options":{"tag":"button","id":"*-1","classList":[],"attributes":{"type":"'button'"},"props":"{}","content":"'Click Here'"},"nodes":[]}]}]},{"type":"html","options":{"tag":"p","id":"*-2","classList":["test"],"attributes":{"att":"true && false","style":"'box-shadow: 10px 10px 10px black;'"},"props":"{}","content":"'Un petit texte'"},"nodes":[]},{"type":"container","options":{"align":{},"margin":{"top":"10","right":"-20","bottom":"10","left":"-20"}},"nodes":[{"type":"html","options":{"tag":"div","id":"*-3","classList":[],"attributes":{},"props":"{}","content":"this.vartest"},"nodes":[]},{"type":"html","options":{"tag":"div","id":"*-4","classList":[],"attributes":{},"props":"{}","content":"City.name.one"},"nodes":[]}]}]},{"type":"container","options":{"align":{}},"nodes":[{"type":"component","options":{"tag":"TestComp","id":"*-5","classList":[],"attributes":{},"props":"{color: 'green', test: this.vartest === 'Hi!'}","globalId":"testglobal","localId":"testlocal"},"nodes":[]},{"type":"component","options":{"tag":"TestComp","id":"*-6","classList":["test"],"attributes":{},"props":"{color: 'red'}"},"nodes":[]},{"type":"component","options":{"tag":"TestLoop","id":"*-7","classList":[],"attributes":{},"props":"{}"},"nodes":[]}]}]}]};

/***/ }),

/***/ "./test/app/global.json":
/*!******************************!*\
  !*** ./test/app/global.json ***!
  \******************************/
/*! exports provided: app, TestComp, TestLoop, default */
/***/ (function(module) {

module.exports = {"app":{"type":"block","options":{},"nodes":[{"type":"container","options":{"align":{},"vertical":true},"nodes":[{"type":"container","options":{"align":{"horizontal":"center","vertical":"middle"},"middle":true,"margin":{"top":"20","right":"20","bottom":"20","left":"20"}},"nodes":[{"type":"script","options":{"script":" const l = 1"},"nodes":[]},{"type":"container","options":{"align":{}},"nodes":[{"type":"html","options":{"tag":"input","id":"*-0","classList":[],"attributes":{"type":"'number'","title":"'test' + 'test2'"},"props":"{}"},"nodes":[]},{"type":"container","options":{"align":{"horizontal":"right"}},"nodes":[{"type":"html","options":{"tag":"button","id":"*-1","classList":[],"attributes":{"type":"'button'"},"props":"{}","content":"'Click Here'"},"nodes":[]}]}]},{"type":"html","options":{"tag":"p","id":"*-2","classList":["test"],"attributes":{"att":"true && false","style":"'box-shadow: 10px 10px 10px black;'"},"props":"{}","content":"'Un petit texte'"},"nodes":[]},{"type":"container","options":{"align":{},"margin":{"top":"10","right":"-20","bottom":"10","left":"-20"}},"nodes":[{"type":"html","options":{"tag":"div","id":"*-3","classList":[],"attributes":{},"props":"{}","content":"this.vartest"},"nodes":[]},{"type":"html","options":{"tag":"div","id":"*-4","classList":[],"attributes":{},"props":"{}","content":"City.name.one"},"nodes":[]}]}]},{"type":"container","options":{"align":{}},"nodes":[{"type":"component","options":{"tag":"TestComp","id":"*-5","classList":[],"attributes":{},"props":"{color: 'green', test: this.vartest === 'Hi!'}","globalId":"testglobal","localId":"testlocal"},"nodes":[]},{"type":"component","options":{"tag":"TestComp","id":"*-6","classList":["test"],"attributes":{},"props":"{color: 'red'}"},"nodes":[]},{"type":"component","options":{"tag":"TestLoop","id":"*-7","classList":[],"attributes":{},"props":"{}"},"nodes":[]}]}]}]},"TestComp":{"type":"block","options":{},"nodes":[{"type":"container","options":{"align":{},"margin":{"top":"20","right":"20","bottom":"20","left":"20"}},"nodes":[{"type":"html","options":{"tag":"div","id":"*-0","classList":["test"],"attributes":{},"props":"{}","localId":"div","content":"'un test simple'"},"nodes":[]},{"type":"html","options":{"tag":"div","id":"*-1","classList":[],"attributes":{},"props":"{}","content":"this.props.color"},"nodes":[]},{"type":"html","options":{"tag":"div","id":"*-2","classList":[],"attributes":{},"props":"{}","content":"this.props.test"},"nodes":[]}]}]},"TestLoop":{"type":"block","options":{},"nodes":[{"type":"container","options":{"align":{"vertical":"middle"},"middle":true},"nodes":[{"type":"script","options":{"script":" const b = true"},"nodes":[]},{"type":"condition","options":{},"nodes":[{"type":"if","options":{"expression":"this.test(true)"},"nodes":[{"type":"html","options":{"tag":"p","id":"*-0","classList":[],"attributes":{},"props":"{}","content":"'Ok'"},"nodes":[]}]},{"type":"else if","options":{"expression":"this.test(false)"},"nodes":[{"type":"script","options":{"script":" const c = 2"},"nodes":[]},{"type":"html","options":{"tag":"p","id":"*-1","classList":[],"attributes":{},"props":"{}","content":"'else if'"},"nodes":[]},{"type":"html","options":{"tag":"a","id":"*-2","classList":[],"attributes":{},"props":"{}","content":"'un deuxime paragraphe'"},"nodes":[]}]},{"type":"else","options":{},"nodes":[{"type":"html","options":{"tag":"p","id":"*-3","classList":[],"attributes":{},"props":"{}","content":"'else'"},"nodes":[]}]}]},{"type":"loop","options":{"variable":"val","expression":"[1,5,76,23]"},"nodes":[{"type":"html","options":{"tag":"p","id":"*-4","classList":[],"attributes":{},"props":"{}","content":"'Loop'"},"nodes":[]},{"type":"html","options":{"tag":"p","id":"*-5","classList":[],"attributes":{},"props":"{}","content":"val"},"nodes":[]}]}]}]}};

/***/ }),

/***/ "./test/app/index.ts":
/*!***************************!*\
  !*** ./test/app/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(__webpack_require__(/*! ./App */ "./test/app/App.ts"));
var testComp_1 = __importDefault(__webpack_require__(/*! ./testComp/testComp */ "./test/app/testComp/testComp.ts"));
var _components = __webpack_require__(/*! ./global.json */ "./test/app/global.json");
var app = new App_1.default();
var test = new testComp_1.default();
app.mount(document.getElementById('app'));


/***/ }),

/***/ "./test/app/testComp/TestComp.css":
/*!****************************************!*\
  !*** ./test/app/testComp/TestComp.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--7-1!./TestComp.css */ "./node_modules/css-loader/dist/cjs.js?!./test/app/testComp/TestComp.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./test/app/testComp/TestComp.json":
/*!*****************************************!*\
  !*** ./test/app/testComp/TestComp.json ***!
  \*****************************************/
/*! exports provided: type, options, nodes, default */
/***/ (function(module) {

module.exports = {"type":"block","options":{},"nodes":[{"type":"container","options":{"align":{},"margin":{"top":"20","right":"20","bottom":"20","left":"20"}},"nodes":[{"type":"html","options":{"tag":"div","id":"*-0","classList":["test"],"attributes":{},"props":"{}","localId":"div","content":"'un test simple'"},"nodes":[]},{"type":"html","options":{"tag":"div","id":"*-1","classList":[],"attributes":{},"props":"{}","content":"this.props.color"},"nodes":[]},{"type":"html","options":{"tag":"div","id":"*-2","classList":[],"attributes":{},"props":"{}","content":"this.props.test"},"nodes":[]}]}]};

/***/ }),

/***/ "./test/app/testComp/TestComp.ts":
/*!***************************************!*\
  !*** ./test/app/testComp/TestComp.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var modules_1 = __webpack_require__(/*! ../../../dist/modules */ "./dist/modules.js");
var TestComp = /** @class */ (function (_super) {
    __extends(TestComp, _super);
    function TestComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestComp.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.elements.div.innerText = 'new text';
        }, 1000);
    };
    TestComp = __decorate([
        modules_1.head({
            template: __webpack_require__(/*! ./TestComp.json */ "./test/app/testComp/TestComp.json"),
            stylesheet: __webpack_require__(/*! ./TestComp.css */ "./test/app/testComp/TestComp.css")
        })
    ], TestComp);
    return TestComp;
}(modules_1.Component));
exports.default = TestComp;


/***/ }),

/***/ "./test/app/testComp/TestLoop.json":
/*!*****************************************!*\
  !*** ./test/app/testComp/TestLoop.json ***!
  \*****************************************/
/*! exports provided: type, options, nodes, default */
/***/ (function(module) {

module.exports = {"type":"block","options":{},"nodes":[{"type":"container","options":{"align":{"vertical":"middle"},"middle":true},"nodes":[{"type":"script","options":{"script":" const b = true"},"nodes":[]},{"type":"condition","options":{},"nodes":[{"type":"if","options":{"expression":"this.test(true)"},"nodes":[{"type":"html","options":{"tag":"p","id":"*-0","classList":[],"attributes":{},"props":"{}","content":"'Ok'"},"nodes":[]}]},{"type":"else if","options":{"expression":"this.test(false)"},"nodes":[{"type":"script","options":{"script":" const c = 2"},"nodes":[]},{"type":"html","options":{"tag":"p","id":"*-1","classList":[],"attributes":{},"props":"{}","content":"'else if'"},"nodes":[]},{"type":"html","options":{"tag":"a","id":"*-2","classList":[],"attributes":{},"props":"{}","content":"'un deuxime paragraphe'"},"nodes":[]}]},{"type":"else","options":{},"nodes":[{"type":"html","options":{"tag":"p","id":"*-3","classList":[],"attributes":{},"props":"{}","content":"'else'"},"nodes":[]}]}]},{"type":"loop","options":{"variable":"val","expression":"[1,5,76,23]"},"nodes":[{"type":"html","options":{"tag":"p","id":"*-4","classList":[],"attributes":{},"props":"{}","content":"'Loop'"},"nodes":[]},{"type":"html","options":{"tag":"p","id":"*-5","classList":[],"attributes":{},"props":"{}","content":"val"},"nodes":[]}]}]}]};

/***/ }),

/***/ "./test/app/testComp/TestLoop.ts":
/*!***************************************!*\
  !*** ./test/app/testComp/TestLoop.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var modules_1 = __webpack_require__(/*! ../../../dist/modules */ "./dist/modules.js");
var TestLoop = /** @class */ (function (_super) {
    __extends(TestLoop, _super);
    function TestLoop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hello = 'variable test';
        return _this;
    }
    TestLoop.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.hello = 'Hello';
        }, 5000);
    };
    TestLoop.prototype.test = function (b) {
        return b && this.hello === 'Hello';
    };
    TestLoop = __decorate([
        modules_1.head({
            template: __webpack_require__(/*! ./TestLoop.json */ "./test/app/testComp/TestLoop.json")
        })
    ], TestLoop);
    return TestLoop;
}(modules_1.Component));
exports.default = TestLoop;


/***/ }),

/***/ "./test/app/testComp/testComp.ts":
/*!***************************************!*\
  !*** ./test/app/testComp/testComp.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var modules_1 = __webpack_require__(/*! ../../../dist/modules */ "./dist/modules.js");
var TestComp = /** @class */ (function (_super) {
    __extends(TestComp, _super);
    function TestComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestComp.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.elements.div.innerText = 'new text';
        }, 1000);
    };
    TestComp = __decorate([
        modules_1.head({
            template: __webpack_require__(/*! ./TestComp.json */ "./test/app/testComp/TestComp.json"),
            stylesheet: __webpack_require__(/*! ./TestComp.css */ "./test/app/testComp/TestComp.css")
        })
    ], TestComp);
    return TestComp;
}(modules_1.Component));
exports.default = TestComp;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2Rpc3QvbW9kdWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L25vZGVVdGlsLmpzIiwid2VicGFjazovLy8uL3Rlc3QvYXBwL3Rlc3RDb21wL1Rlc3RDb21wLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3Rlc3QvYXBwL0FwcC50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L2FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L2FwcC90ZXN0Q29tcC9UZXN0Q29tcC5jc3M/YzZkNiIsIndlYnBhY2s6Ly8vLi90ZXN0L2FwcC90ZXN0Q29tcC9UZXN0Q29tcC50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L2FwcC90ZXN0Q29tcC9UZXN0TG9vcC50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L2FwcC90ZXN0Q29tcC90ZXN0Q29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlE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QTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0EsS0FBSyxLQUF3QyxFQUFFLEVBRTdDOztBQUVGLFFBQVEsc0JBQWlCO0FBQ3pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7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VUFBVTtRQUU1QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBUGdCLFFBQVE7UUFKNUIsY0FBSSxDQUFDO1lBQ0YsUUFBUSxFQUFFLG1CQUFPLENBQUMsMERBQWlCLENBQUM7WUFDcEMsVUFBVSxFQUFFLG1CQUFPLENBQUMsd0RBQWdCLENBQUM7U0FDeEMsQ0FBQztPQUNtQixRQUFRLENBUTVCO0lBQUQsZUFBQztDQUFBLENBUnFDLG1CQUFTLEdBUTlDO2tCQVJvQixRQUFRIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdC9hcHAvaW5kZXgudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBub2RlVXRpbF8xID0gcmVxdWlyZShcIi4vbm9kZVV0aWxcIik7XHJcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzXCIpO1xyXG52YXIgX2NvbXBvbmVudHMgPSByZXF1aXJlKCcuLi90ZXN0L2FwcC9nbG9iYWwuanNvbicpO1xyXG52YXIgY29sb3JzID0gWydhcXVhJywgJ2JsdWUnLCAnZnVjaHNpYScsICdncmF5JywgJ2dyZWVuJyxcclxuICAgICdsaW1lJywgJ21hcm9vbicsICduYXZ5JywgJ29saXZlJywgJ29yYW5nZScsICdwdXJwbGUnLCAncmVkJyxcclxuICAgICdzaWx2ZXInLCAndGVhbCcsICd5ZWxsb3cnXS5yZXZlcnNlKCk7XHJcbnZhciBjb2xvckluZGV4ID0gMDtcclxuZnVuY3Rpb24gbmV4dENvbG9yKCkge1xyXG4gICAgcmV0dXJuIGNvbG9yc1srK2NvbG9ySW5kZXggJSBjb2xvcnMubGVuZ3RoXTtcclxufVxyXG5mdW5jdGlvbiBoZWFkKGgpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcclxuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUudGVtcGxhdGUgPSBoLnRlbXBsYXRlO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5pbXBvcnRlZENvbXBvbmVudHMgPSBoLmNvbXBvbmVudHM7XHJcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlLnN0eWxlc2hlZXQgPSBoLnN0eWxlc2hlZXQ7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuaGVhZCA9IGhlYWQ7XHJcbmZ1bmN0aW9uIGV2YWxFeHAoZXhwLCBjdHgpIHtcclxuICAgIGlmICghZXhwKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gKEZ1bmN0aW9uKCdyZXR1cm4gJyArIGV4cCkpLmNhbGwoY3R4KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgaGVscGVyc18xLmRlYnVnKGVyciwgJ2Vycm9yJyk7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59XHJcbnZhciBDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMpIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0ge307XHJcbiAgICAgICAgdGhpcy5zY29wZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IFNldCgpO1xyXG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge307XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0ge307XHJcbiAgICAgICAgdGhpcy50eXBlID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnJvb3QgPSBfX2Fzc2lnbih7fSwgc2VsZlsndGVtcGxhdGUnXSkgfHwgbmV3IG5vZGVVdGlsXzEuTE5vZGUobm9kZVV0aWxfMS5Ob2RlVHlwZS5CTE9DSyk7XHJcbiAgICAgICAgdGhpcy5pbXBvcnRzID0gc2VsZlsnaW1wb3J0ZWRDb21wb25lbnRzJ10gfHwge307XHJcbiAgICAgICAgdGhpcy5zdHlsZXMgPSBzZWxmWydzdHlsZXNoZWV0J10gfHwge307XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHt9O1xyXG4gICAgfVxyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVXBkYXRlID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLm1vdW50ID0gZnVuY3Rpb24gKGFuY2hvciwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cclxuICAgICAgICB0aGlzLnJvb3Qub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsTW91bnQoKTtcclxuICAgICAgICB0aGlzLmh0bWwgPSB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIGlmICh0aGlzLmh0bWwpIHtcclxuICAgICAgICAgICAgdGhpcy5odG1sLmNvbXBvbmVudCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGFuY2hvci5yZXBsYWNlV2l0aCh0aGlzLmh0bWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LnZhbHVlcyh0aGlzLmNoaWxkcmVuKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gX2FbX2ldO1xyXG4gICAgICAgICAgICB2YXIgX2IgPSBjaGlsZC5vcHRpb25zLCBsb2NhbElkID0gX2IubG9jYWxJZCwgdGFnID0gX2IudGFnO1xyXG4gICAgICAgICAgICBkZWxldGUgY2hpbGQub3B0aW9ucy5sb2NhbElkO1xyXG4gICAgICAgICAgICBjaGlsZC5jb21wb25lbnQubW91bnQoY2hpbGQuYW5jaG9yLCBjaGlsZC5vcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKGxvY2FsSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1tsb2NhbElkXSA9IGNoaWxkLmNvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHNbbG9jYWxJZF0gPSBjaGlsZC5jb21wb25lbnQuaHRtbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hpbGQuY29tcG9uZW50Lmh0bWwgJiYgdGFnKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5jb21wb25lbnQuaHRtbC5jbGFzc0xpc3QuYWRkKHRhZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfdGhpcywgdiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbJ2knICsgdl07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzWydpJyArIHZdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnVwZGF0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnREaWRNb3VudCgpO1xyXG4gICAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHRoaXMucHJvcHM7XHJcbiAgICAgICAgdGhpcy51cGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKCk7XHJcbiAgICAgICAgdmFyIG5ld0h0bWwgPSB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIGlmICh0aGlzLmh0bWwpIHtcclxuICAgICAgICAgICAgbmV3SHRtbC5jb21wb25lbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmh0bWwucmVwbGFjZVdpdGgobmV3SHRtbCk7XHJcbiAgICAgICAgICAgIHRoaXMuaHRtbCA9IG5ld0h0bWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3QudmFsdWVzKHRoaXMuY2hpbGRyZW4pOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBfYVtfaV07XHJcbiAgICAgICAgICAgIHZhciBfYiA9IGNoaWxkLm9wdGlvbnMsIGxvY2FsSWQgPSBfYi5sb2NhbElkLCB0YWcgPSBfYi50YWc7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjaGlsZC5vcHRpb25zLmxvY2FsSWQ7XHJcbiAgICAgICAgICAgIGNoaWxkLmNvbXBvbmVudC5yZWZyZXNoKGNoaWxkLnByb3BzKTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLmNvbXBvbmVudC5odG1sKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuY29tcG9uZW50Lmh0bWwuY2xhc3NMaXN0LmFkZCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2hpbGQuYW5jaG9yLnJlcGxhY2VXaXRoKGNoaWxkLmNvbXBvbmVudC5odG1sKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobG9jYWxJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50c1tsb2NhbElkXSA9IGNoaWxkLmNvbXBvbmVudC5odG1sO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5yb290KSB8fCB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIG5vZGVVdGlsXzEuTm9kZVR5cGUuQkxPQ0s6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJCbG9jayhub2RlKTtcclxuICAgICAgICAgICAgY2FzZSBub2RlVXRpbF8xLk5vZGVUeXBlLkNPTlRBSU5FUjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckNvbnRhaW5lcihub2RlKTtcclxuICAgICAgICAgICAgY2FzZSBub2RlVXRpbF8xLk5vZGVUeXBlLkhUTUw6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJIVE1MKG5vZGUpO1xyXG4gICAgICAgICAgICBjYXNlIG5vZGVVdGlsXzEuTm9kZVR5cGUuQ09NUE9ORU5UOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ29tcG9uZW50KG5vZGUpO1xyXG4gICAgICAgICAgICBjYXNlIG5vZGVVdGlsXzEuTm9kZVR5cGUuQ09ORElUSU9OOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ29uZGl0aW9uKG5vZGUpO1xyXG4gICAgICAgICAgICBjYXNlIG5vZGVVdGlsXzEuTm9kZVR5cGUuTE9PUDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxvb3Aobm9kZSk7XHJcbiAgICAgICAgICAgIGNhc2Ugbm9kZVV0aWxfMS5Ob2RlVHlwZS5TQ1JJUFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNKYXZhc2NyaXB0KG5vZGUub3B0aW9ucy5zY3JpcHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQ2hpbGRyZW4gPSBmdW5jdGlvbiAoZGl2LCBub2Rlcykge1xyXG4gICAgICAgIHZhciB2YXJzID0ge307XHJcbiAgICAgICAgdmFyIHByb3h5ID0gbmV3IFByb3h5KHZhcnMsIHtcclxuICAgICAgICAgICAgaGFzOiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7IHJldHVybiB0cnVlOyB9LFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHsgcmV0dXJuIChwcm9wIGluIHRhcmdldCA/IHRhcmdldCA6IHdpbmRvdylbcHJvcF07IH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5zY29wZXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzY29wZSA9IF9hW19pXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgayBpbiBzY29wZSkge1xyXG4gICAgICAgICAgICAgICAgcHJveHlba10gPSBzY29wZVtrXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjb3Blcy5wdXNoKHByb3h5KTtcclxuICAgICAgICBmb3IgKHZhciBfYiA9IDAsIG5vZGVzXzEgPSBub2RlczsgX2IgPCBub2Rlc18xLmxlbmd0aDsgX2IrKykge1xyXG4gICAgICAgICAgICB2YXIgbiA9IG5vZGVzXzFbX2JdO1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnJlbmRlck5vZGUobik7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmFwcGVuZC5hcHBseShkaXYsIGNoaWxkcmVuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjaGlsZHJlbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY29wZXMucG9wKCk7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKHRhZywgb3B0cykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuICAgICAgICBpZiAodGFnICE9PSAnZGl2Jykge1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCh0YWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0cy5jbGFzc0xpc3QgJiYgb3B0cy5jbGFzc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKG9wdHMuY2xhc3NMaXN0Lm1hcChmdW5jdGlvbiAoYykgeyByZXR1cm4gX3RoaXMuc3R5bGVzW2NdIHx8IGM7IH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgYXR0IGluIG9wdHMuYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKGF0dCwgb3B0cy5hdHRyaWJ1dGVzW2F0dF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0cy5nbG9iYWxJZCkge1xyXG4gICAgICAgICAgICBkaXYuaWQgPSBvcHRzLmdsb2JhbElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0cy5sb2NhbElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHNbb3B0cy5sb2NhbElkXSA9IGRpdjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9kaXYuc3R5bGUuYmFja2dyb3VuZCA9IG5leHRDb2xvcigpO1xyXG4gICAgICAgIHJldHVybiBkaXY7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJCbG9jayA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgdmFyIGRpdiA9IHRoaXMuY3JlYXRlRWxlbWVudCgnZGl2Jywgbm9kZS5vcHRpb25zKTtcclxuICAgICAgICB0aGlzLnJlbmRlckNoaWxkcmVuKGRpdiwgbm9kZS5ub2Rlcyk7XHJcbiAgICAgICAgcmV0dXJuIGRpdjtcclxuICAgIH07XHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckNvbnRhaW5lciA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgdmFyIG9wdHMgPSBub2RlLm9wdGlvbnM7XHJcbiAgICAgICAgdmFyIGRpdiA9IHRoaXMuY3JlYXRlRWxlbWVudCgnZGl2Jywgb3B0cyk7XHJcbiAgICAgICAgLy9kaXYuaW5uZXJUZXh0ID0gJ0NvbnRhaW5lcicrLSstXHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xyXG4gICAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGRpdi5zdHlsZS5mbGV4RGlyZWN0aW9uID0gb3B0cy52ZXJ0aWNhbCA/ICdjb2x1bW4nIDogJ3Jvdyc7XHJcbiAgICAgICAgZGl2LnN0eWxlLmZsZXggPSBvcHRzLnNtYWxsID8gJ2luaXRpYWwnIDogJ2F1dG8nO1xyXG4gICAgICAgIGRpdi5zdHlsZS5mbGV4V3JhcCA9IG9wdHMubm93cmFwID8gJ25vd3JhcCcgOiAnd3JhcCc7XHJcbiAgICAgICAgaWYgKG9wdHMuZnVsbCkge1xyXG4gICAgICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0cy5tYXJnaW4pIHtcclxuICAgICAgICAgICAgdmFyIF9hID0gb3B0cy5tYXJnaW4sIHRvcF8xID0gX2EudG9wLCByaWdodCA9IF9hLnJpZ2h0LCBib3R0b20gPSBfYS5ib3R0b20sIGxlZnQgPSBfYS5sZWZ0O1xyXG4gICAgICAgICAgICB2YXIgZiA9IGZ1bmN0aW9uIChtKSB7IHJldHVybiBtID49IDAgPyAncGFkZGluZycgOiAnbWFyZ2luJzsgfTtcclxuICAgICAgICAgICAgZGl2LnN0eWxlLnNldFByb3BlcnR5KGYodG9wXzEpICsgJy10b3AnLCB0b3BfMSArICdweCcpO1xyXG4gICAgICAgICAgICBkaXYuc3R5bGUuc2V0UHJvcGVydHkoZihyaWdodCkgKyAnLXJpZ2h0JywgcmlnaHQgKyAncHgnKTtcclxuICAgICAgICAgICAgZGl2LnN0eWxlLnNldFByb3BlcnR5KGYoYm90dG9tKSArICctYm90dG9tJywgYm90dG9tICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIGRpdi5zdHlsZS5zZXRQcm9wZXJ0eShmKGxlZnQpICsgJy1sZWZ0JywgbGVmdCArICdweCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0cy5hbGlnbi52ZXJ0aWNhbCB8fCBvcHRzLmFsaWduLmhvcml6b250YWwpIHtcclxuICAgICAgICAgICAgdmFyIHYgPSBvcHRzLmFsaWduLnZlcnRpY2FsIHx8ICdtaWRkbGUnO1xyXG4gICAgICAgICAgICB2YXIgaCA9IG9wdHMuYWxpZ24uaG9yaXpvbnRhbCB8fCAnbGVmdCc7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjaGlsZERpdi5zdHlsZS5mbGV4ID0gJ2luaXRpYWwnO1xyXG4gICAgICAgICAgICBjaGlsZERpdi5zdHlsZS5tYXJnaW4gPSAnYXV0byc7XHJcbiAgICAgICAgICAgIGlmICh2ID09PSAndG9wJykge1xyXG4gICAgICAgICAgICAgICAgY2hpbGREaXYuc3R5bGUubWFyZ2luVG9wID0gJzAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHYgPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZERpdi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGggPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgY2hpbGREaXYuc3R5bGUubWFyZ2luTGVmdCA9ICcwJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChoID09PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZERpdi5zdHlsZS5tYXJnaW5SaWdodCA9ICcwJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNoaWxkcmVuKGNoaWxkRGl2LCBub2RlLm5vZGVzKTtcclxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNoaWxkRGl2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2hpbGRyZW4oZGl2LCBub2RlLm5vZGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpdjtcclxuICAgIH07XHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckhUTUwgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHZhciBvcHRzID0gbm9kZS5vcHRpb25zO1xyXG4gICAgICAgIHZhciBkaXYgPSB0aGlzLmNyZWF0ZUVsZW1lbnQob3B0cy50YWcsIG9wdHMpO1xyXG4gICAgICAgIGlmIChvcHRzLmNvbnRlbnQpIHtcclxuICAgICAgICAgICAgZGl2LmlubmVyVGV4dCA9IHRoaXMuZXZhbEV4cChvcHRzLmNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlckNoaWxkcmVuKGRpdiwgbm9kZS5ub2Rlcyk7XHJcbiAgICAgICAgcmV0dXJuIGRpdjtcclxuICAgIH07XHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlckNvbXBvbmVudCA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgdmFyIG9wdHMgPSBub2RlLm9wdGlvbnM7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHZhciBwcm9wcyA9IHRoaXMuZXZhbEV4cChvcHRzLnByb3BzKTtcclxuICAgICAgICBpZiAoIShvcHRzLmlkIGluIHRoaXMuY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5bb3B0cy5pZF0gPSB7IGFuY2hvcjogZGl2LCBjb21wb25lbnQ6IG5ldyB0aGlzLmltcG9ydHNbb3B0cy50YWddKHByb3BzKSwgb3B0aW9uczogb3B0cywgcHJvcHM6IHByb3BzIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuW29wdHMuaWRdLmFuY2hvciA9IGRpdjtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltvcHRzLmlkXS5wcm9wcyA9IHByb3BzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGl2O1xyXG4gICAgfTtcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyQ29uZGl0aW9uID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IG5vZGUubm9kZXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBpZiAoKChuLnR5cGUgPT09IG5vZGVVdGlsXzEuTm9kZVR5cGUuSUYgfHwgbi50eXBlID09PSBub2RlVXRpbF8xLk5vZGVUeXBlLkVMSUYpICYmIHRoaXMuZXZhbEV4cChuLm9wdGlvbnMuZXhwcmVzc2lvbikpIHx8IG4udHlwZSA9PT0gbm9kZVV0aWxfMS5Ob2RlVHlwZS5FTFNFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckNoaWxkcmVuKGRpdiwgbi5ub2Rlcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShkaXYuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyTG9vcCA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgdmFyIG9wdHMgPSBub2RlLm9wdGlvbnM7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHZhciBwcm94eSA9IGhlbHBlcnNfMS5sYXN0KHRoaXMuc2NvcGVzKTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5ldmFsRXhwKG9wdHMuZXhwcmVzc2lvbik7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBwcm94eVtvcHRzLnZhcmlhYmxlLnRyaW0oKV0gPSBpdGVtO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNoaWxkcmVuKGRpdiwgbm9kZS5ub2Rlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGRpdi5jaGlsZHJlbik7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5leGVjSmF2YXNjcmlwdCA9IGZ1bmN0aW9uIChzY3JpcHQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghc2NyaXB0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubW91bnRlZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhcnNfMSA9IHNjcmlwdC5tYXRjaCgvKHRoaXNcXC5cXHcrXFxiKSg/IVxcKCkvZykgfHwgW107XHJcbiAgICAgICAgICAgICAgICB2YXIgZnVuY3MgPSBzY3JpcHQubWF0Y2goLyh0aGlzXFwuXFx3K1xcYikoPz1cXCgpL2cpIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgZnVuY3MubWFwKGZ1bmN0aW9uIChmKSB7IHJldHVybiB2YXJzXzEgPSB2YXJzXzEuY29uY2F0KF90aGlzW2Yuc3Vic3RyKDUpXS50b1N0cmluZygpLm1hdGNoKC8odGhpc1xcLlxcdytcXGIpKD8hXFwoKS9nKSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgdmFyc18xLmZpbHRlcihmdW5jdGlvbiAodikgeyByZXR1cm4gdiAmJiB2ICE9PSAndGhpcy5wcm9wcyc7IH0pLm1hcChmdW5jdGlvbiAodikgeyByZXR1cm4gX3RoaXMuc3RhdGUuYWRkKHYuc3Vic3RyKDUpKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGV4cCA9IHNjcmlwdC5yZXBsYWNlKC9cXGIobGV0fGNvbnN0KVxccy9nLCAndmFyICcpO1xyXG4gICAgICAgICAgICB2YXIgcHJveHkgPSBoZWxwZXJzXzEubGFzdCh0aGlzLnNjb3Blcyk7XHJcbiAgICAgICAgICAgIHJldHVybiAoRnVuY3Rpb24oJ3JldHVybiAoZnVuY3Rpb24ocHJveHkpIHsgd2l0aChwcm94eSkgeyAnICsgZXhwICsgJ30gfSknKSkoKS5jYWxsKHRoaXMsIHByb3h5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBoZWxwZXJzXzEuZGVidWcoc2NyaXB0LCAnZXJyb3InKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuZXZhbEV4cCA9IGZ1bmN0aW9uIChleHApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leGVjSmF2YXNjcmlwdCgncmV0dXJuICcgKyBleHApO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDb21wb25lbnQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wb25lbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gZmlyc3QoYXJyYXkpIHtcclxuICAgIGlmIChhcnJheS5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gYXJyYXlbMF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5leHBvcnRzLmZpcnN0ID0gZmlyc3Q7XHJcbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHtcclxuICAgIGlmIChhcnJheS5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5leHBvcnRzLmxhc3QgPSBsYXN0O1xyXG5mdW5jdGlvbiBkZWJ1Zyhtc2csIHR5cGUpIHtcclxuICAgIGlmICh0eXBlID09PSB2b2lkIDApIHsgdHlwZSA9ICdsb2cnOyB9XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICBjYXNlICdsb2cnOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd3YXJuJzpcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlYnVnID0gZGVidWc7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50XCIpO1xyXG5leHBvcnRzLkNvbXBvbmVudCA9IGNvbXBvbmVudF8xLkNvbXBvbmVudDtcclxuZXhwb3J0cy5oZWFkID0gY29tcG9uZW50XzEuaGVhZDtcclxudmFyIG5vZGVVdGlsXzEgPSByZXF1aXJlKFwiLi9ub2RlVXRpbFwiKTtcclxuZXhwb3J0cy5MTm9kZSA9IG5vZGVVdGlsXzEuTE5vZGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZHVsZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnNcIik7XHJcbnZhciBOb2RlVHlwZTtcclxuKGZ1bmN0aW9uIChOb2RlVHlwZSkge1xyXG4gICAgTm9kZVR5cGVbXCJCTE9DS1wiXSA9IFwiYmxvY2tcIjtcclxuICAgIE5vZGVUeXBlW1wiQ09OVEFJTkVSXCJdID0gXCJjb250YWluZXJcIjtcclxuICAgIE5vZGVUeXBlW1wiSFRNTFwiXSA9IFwiaHRtbFwiO1xyXG4gICAgTm9kZVR5cGVbXCJDT01QT05FTlRcIl0gPSBcImNvbXBvbmVudFwiO1xyXG4gICAgTm9kZVR5cGVbXCJEQVRBXCJdID0gXCJkYXRhXCI7XHJcbiAgICBOb2RlVHlwZVtcIlNDUklQVFwiXSA9IFwic2NyaXB0XCI7XHJcbiAgICBOb2RlVHlwZVtcIkxPT1BcIl0gPSBcImxvb3BcIjtcclxuICAgIE5vZGVUeXBlW1wiQ09ORElUSU9OXCJdID0gXCJjb25kaXRpb25cIjtcclxuICAgIE5vZGVUeXBlW1wiSUZcIl0gPSBcImlmXCI7XHJcbiAgICBOb2RlVHlwZVtcIkVMSUZcIl0gPSBcImVsc2UgaWZcIjtcclxuICAgIE5vZGVUeXBlW1wiRUxTRVwiXSA9IFwiZWxzZVwiO1xyXG59KShOb2RlVHlwZSA9IGV4cG9ydHMuTm9kZVR5cGUgfHwgKGV4cG9ydHMuTm9kZVR5cGUgPSB7fSkpO1xyXG52YXIgTE5vZGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBMTm9kZSh0eXBlLCBvcHRpb25zLCBub2Rlcykge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICB0aGlzLm5vZGVzID0gbm9kZXMgfHwgW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTE5vZGU7XHJcbn0oKSk7XHJcbmV4cG9ydHMuTE5vZGUgPSBMTm9kZTtcclxudmFyIFRyZWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBUcmVlKCkge1xyXG4gICAgICAgIHRoaXMucm9vdCA9IG5ldyBMTm9kZShOb2RlVHlwZS5CTE9DSyk7XHJcbiAgICB9XHJcbiAgICBUcmVlLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZW50KSB7XHJcbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSB0aGlzLnJvb3Q7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXBhcmVudE5vZGUubm9kZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLm5vZGVzLnB1c2gobmV3IExOb2RlKE5vZGVUeXBlLkJMT0NLKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IGhlbHBlcnNfMS5sYXN0KHBhcmVudE5vZGUubm9kZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyZW50Tm9kZS50eXBlID09PSBOb2RlVHlwZS5DT05ESVRJT04pIHtcclxuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IGhlbHBlcnNfMS5sYXN0KHBhcmVudE5vZGUubm9kZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS50eXBlID09PSBOb2RlVHlwZS5JRikge1xyXG4gICAgICAgICAgICBwYXJlbnROb2RlLm5vZGVzLnB1c2gobmV3IExOb2RlKE5vZGVUeXBlLkNPTkRJVElPTiwge30sIFtub2RlXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChub2RlLnR5cGUgPT09IE5vZGVUeXBlLkVMSUYgfHwgbm9kZS50eXBlID09PSBOb2RlVHlwZS5FTFNFKSB7XHJcbiAgICAgICAgICAgIHZhciBjb25kTm9kZSA9IGhlbHBlcnNfMS5sYXN0KHBhcmVudE5vZGUubm9kZXMpO1xyXG4gICAgICAgICAgICBpZiAoIWNvbmROb2RlIHx8IGNvbmROb2RlLnR5cGUgIT09IE5vZGVUeXBlLkNPTkRJVElPTikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlcnJvciBpbiBjb25kaXRpb24gc3RydWN0dXJlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uZE5vZGUubm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUubm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFRyZWU7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVHJlZSA9IFRyZWU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vZGVVdGlsLmpzLm1hcCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxyXFxuLlRlc3RDb21wX190ZXN0X19fM3k4X2Qge1xcclxcbiAgICBib3JkZXI6IDEwcHggYmx1ZSBzb2xpZDtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gRXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwidGVzdFwiOiBcIlRlc3RDb21wX190ZXN0X19fM3k4X2RcIlxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gJ0BtZWRpYSAnICsgaXRlbVsyXSArICd7JyArIGNvbnRlbnQgKyAnfSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgIH1cbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gbW9kdWxlc1tpXTsgLy8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuICAgICAgLy8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcbiAgICAgIC8vIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cbiAgICAgIC8vIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblxuICAgICAgaWYgKGl0ZW1bMF0gPT0gbnVsbCB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBpZiAobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2UgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgICBpdGVtWzJdID0gJygnICsgaXRlbVsyXSArICcpIGFuZCAoJyArIG1lZGlhUXVlcnkgKyAnKSc7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLyc7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG4gIHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gdHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nXG5cdFx0ID8gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcykgXG5cdFx0IDogb3B0aW9ucy50cmFuc2Zvcm0uZGVmYXVsdChvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBoZWFkIH0gZnJvbSAnLi4vLi4vZGlzdC9tb2R1bGVzJ1xyXG5pbXBvcnQgVGVzdENvbXAgZnJvbSAnLi90ZXN0Q29tcC9UZXN0Q29tcCdcclxuaW1wb3J0IFRlc3RMb29wIGZyb20gJy4vdGVzdENvbXAvVGVzdExvb3AnXHJcblxyXG5AaGVhZCh7XHJcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9hcHAuanNvbicpLFxyXG4gICAgY29tcG9uZW50czogeyBUZXN0Q29tcCwgVGVzdExvb3AgfVxyXG59KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIHZhcnRlc3Q6IHN0cmluZyA9ICdIZWxsbyB0aGVyZSdcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVsZW1lbnRzLnRlc3Rsb2NhbCwgdGhpcy5jb21wb25lbnRzLnRlc3Rsb2NhbClcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy90aGlzLnJlZnJlc2goKVxyXG4gICAgICAgICAgICB0aGlzLnZhcnRlc3QgPSAnSGkhJ1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnZhcnRlc3QpO1xyXG5cclxuICAgICAgICB9LCAyMDAwKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgTE5vZGUgfSBmcm9tICcuLi8uLi9kaXN0L21vZHVsZXMnXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnXHJcbmltcG9ydCBUZXN0Q29tcCBmcm9tICcuL3Rlc3RDb21wL3Rlc3RDb21wJ1xyXG5cclxudmFyIF9jb21wb25lbnRzOiB7IFtuYW1lOiBzdHJpbmddOiBMTm9kZSB9ID0gcmVxdWlyZSgnLi9nbG9iYWwuanNvbicpXHJcblxyXG5jb25zdCBhcHAgPSBuZXcgQXBwKClcclxuY29uc3QgdGVzdCA9IG5ldyBUZXN0Q29tcCgpXHJcblxyXG5hcHAubW91bnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEhUTUxFbGVtZW50KSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS03LTEhLi9UZXN0Q29tcC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTctMSEuL1Rlc3RDb21wLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTctMSEuL1Rlc3RDb21wLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCB7IENvbXBvbmVudCwgaGVhZCB9IGZyb20gJy4uLy4uLy4uL2Rpc3QvbW9kdWxlcydcclxuXHJcblxyXG5cclxuQGhlYWQoe1xyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vVGVzdENvbXAuanNvbicpLFxyXG4gICAgc3R5bGVzaGVldDogcmVxdWlyZSgnLi9UZXN0Q29tcC5jc3MnKVxyXG59KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0Q29tcCBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuZGl2LmlubmVyVGV4dCA9ICduZXcgdGV4dCdcclxuXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIGhlYWQgfSBmcm9tICcuLi8uLi8uLi9kaXN0L21vZHVsZXMnXHJcblxyXG5cclxuXHJcbkBoZWFkKHtcclxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL1Rlc3RMb29wLmpzb24nKVxyXG59KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0TG9vcCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBoZWxsbyA9ICd2YXJpYWJsZSB0ZXN0J1xyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhlbGxvID0gJ0hlbGxvJ1xyXG5cclxuICAgICAgICB9LCA1MDAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0ZXN0KGI6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGIgJiYgdGhpcy5oZWxsbyA9PT0gJ0hlbGxvJ1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBoZWFkIH0gZnJvbSAnLi4vLi4vLi4vZGlzdC9tb2R1bGVzJ1xyXG5cclxuXHJcblxyXG5AaGVhZCh7XHJcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9UZXN0Q29tcC5qc29uJyksXHJcbiAgICBzdHlsZXNoZWV0OiByZXF1aXJlKCcuL1Rlc3RDb21wLmNzcycpXHJcbn0pXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RDb21wIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5kaXYuaW5uZXJUZXh0ID0gJ25ldyB0ZXh0J1xyXG5cclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=