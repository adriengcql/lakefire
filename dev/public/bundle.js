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

Object.defineProperty(exports, "__esModule", { value: true });
var nodeUtil_1 = __webpack_require__(/*! ./nodeUtil */ "./dist/nodeUtil.js");
var Component = /** @class */ (function () {
    function Component(root) {
        this.root = root;
    }
    Component.prototype.mount = function (anchor) {
        anchor.replaceWith(this.render());
    };
    Component.prototype.render = function () {
        return this.renderNode(this.root);
    };
    Component.prototype.renderNode = function (node) {
        var div = document.createElement('div');
        switch (node.type) {
            case nodeUtil_1.NodeType.CONTAINER:
                div.innerText = 'Container';
                break;
            case nodeUtil_1.NodeType.HTML:
                div.innerText = 'Html';
                break;
        }
        for (var _i = 0, _a = node.nodes; _i < _a.length; _i++) {
            var n = _a[_i];
            div.appendChild(this.renderNode(n));
        }
        return div;
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map

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
var NodeType;
(function (NodeType) {
    NodeType["BLOCK"] = "block";
    NodeType["CONTAINER"] = "container";
    NodeType["HTML"] = "html";
    NodeType["COMPONENT"] = "component";
    NodeType["DATA"] = "data";
    NodeType["SCRIPT"] = "script";
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
            parentNode = parentNode.nodes[parentNode.nodes.length - 1];
        }
        parentNode.nodes.push(node);
    };
    return Tree;
}());
exports.Tree = Tree;
//# sourceMappingURL=nodeUtil.js.map

/***/ }),

/***/ "./test/app/app.json":
/*!***************************!*\
  !*** ./test/app/app.json ***!
  \***************************/
/*! exports provided: app, TestComp, default */
/***/ (function(module) {

module.exports = {"app":{"type":"block","options":{},"nodes":[{"type":"container","options":{"vertical":true},"nodes":[{"type":"container","options":{"left":true,"margin":true},"nodes":[{"type":"script","options":{"script":" Object.keys(stats)"},"nodes":[]},{"type":"html","options":{"classList":["test"],"attributes":{"att":"true"},"content":{"line":3,"col":28,"value":"City.population({\"where\": { \"population\": {\"$gt\": 80","type":"meta.embedded.inline.js","scopes":["source.lkf","meta.tag.lkf","meta.embedded.inline.js"]}},"nodes":[]},{"type":"container","options":{"margin":true},"nodes":[{"type":"html","options":{"classList":[],"attributes":{},"content":{"line":5,"col":17,"value":"City.name.one","type":"meta.embedded.inline.js","scopes":["source.lkf","meta.tag.lkf","meta.embedded.inline.js"]}},"nodes":[]}]}]}]}]},"TestComp":{"type":"block","options":{},"nodes":[{"type":"container","options":{"margin":true},"nodes":[{"type":"html","options":{"classList":[],"attributes":{},"content":{"line":1,"col":9,"value":"'un test simple'","type":"meta.embedded.inline.js","scopes":["source.lkf","meta.tag.lkf","meta.embedded.inline.js"]}},"nodes":[]}]}]}};

/***/ }),

/***/ "./test/app/index.ts":
/*!***************************!*\
  !*** ./test/app/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var modules_1 = __webpack_require__(/*! ../../dist/modules */ "./dist/modules.js");
var _components = __webpack_require__(/*! ./app.json */ "./test/app/app.json");
var app = new modules_1.Component(_components.app);
app.mount(document.getElementById('app'));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9tb2R1bGVzLmpzIiwid2VicGFjazovLy8uL2Rpc3Qvbm9kZVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGlCQUFpQixtQkFBTyxDQUFDLHNDQUFZO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsZ0JBQWdCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHFDOzs7Ozs7Ozs7Ozs7QUNoQ2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyx3Q0FBYTtBQUN2QztBQUNBLGlCQUFpQixtQkFBTyxDQUFDLHNDQUFZO0FBQ3JDO0FBQ0EsbUM7Ozs7Ozs7Ozs7OztBQ05hO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsdURBQXVEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFlBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLG9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNBLG1GQUFxRDtBQUVyRCxJQUFNLFdBQVcsR0FBOEIsbUJBQU8sQ0FBQyx1Q0FBWSxDQUFDO0FBRXBFLElBQU0sR0FBRyxHQUFHLElBQUksbUJBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO0FBRTFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQWdCLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi90ZXN0L2FwcC9pbmRleC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBub2RlVXRpbF8xID0gcmVxdWlyZShcIi4vbm9kZVV0aWxcIik7XHJcbnZhciBDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDb21wb25lbnQocm9vdCkge1xyXG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XHJcbiAgICB9XHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLm1vdW50ID0gZnVuY3Rpb24gKGFuY2hvcikge1xyXG4gICAgICAgIGFuY2hvci5yZXBsYWNlV2l0aCh0aGlzLnJlbmRlcigpKTtcclxuICAgIH07XHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJOb2RlKHRoaXMucm9vdCk7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBub2RlVXRpbF8xLk5vZGVUeXBlLkNPTlRBSU5FUjpcclxuICAgICAgICAgICAgICAgIGRpdi5pbm5lclRleHQgPSAnQ29udGFpbmVyJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG5vZGVVdGlsXzEuTm9kZVR5cGUuSFRNTDpcclxuICAgICAgICAgICAgICAgIGRpdi5pbm5lclRleHQgPSAnSHRtbCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IG5vZGUubm9kZXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJOb2RlKG4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpdjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ29tcG9uZW50O1xyXG59KCkpO1xyXG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxuZXhwb3J0cy5Db21wb25lbnQgPSBjb21wb25lbnRfMS5Db21wb25lbnQ7XHJcbnZhciBub2RlVXRpbF8xID0gcmVxdWlyZShcIi4vbm9kZVV0aWxcIik7XHJcbmV4cG9ydHMuTE5vZGUgPSBub2RlVXRpbF8xLkxOb2RlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2R1bGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBOb2RlVHlwZTtcclxuKGZ1bmN0aW9uIChOb2RlVHlwZSkge1xyXG4gICAgTm9kZVR5cGVbXCJCTE9DS1wiXSA9IFwiYmxvY2tcIjtcclxuICAgIE5vZGVUeXBlW1wiQ09OVEFJTkVSXCJdID0gXCJjb250YWluZXJcIjtcclxuICAgIE5vZGVUeXBlW1wiSFRNTFwiXSA9IFwiaHRtbFwiO1xyXG4gICAgTm9kZVR5cGVbXCJDT01QT05FTlRcIl0gPSBcImNvbXBvbmVudFwiO1xyXG4gICAgTm9kZVR5cGVbXCJEQVRBXCJdID0gXCJkYXRhXCI7XHJcbiAgICBOb2RlVHlwZVtcIlNDUklQVFwiXSA9IFwic2NyaXB0XCI7XHJcbn0pKE5vZGVUeXBlID0gZXhwb3J0cy5Ob2RlVHlwZSB8fCAoZXhwb3J0cy5Ob2RlVHlwZSA9IHt9KSk7XHJcbnZhciBMTm9kZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIExOb2RlKHR5cGUsIG9wdGlvbnMsIG5vZGVzKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIHRoaXMubm9kZXMgPSBub2RlcyB8fCBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiBMTm9kZTtcclxufSgpKTtcclxuZXhwb3J0cy5MTm9kZSA9IExOb2RlO1xyXG52YXIgVHJlZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRyZWUoKSB7XHJcbiAgICAgICAgdGhpcy5yb290ID0gbmV3IExOb2RlKE5vZGVUeXBlLkJMT0NLKTtcclxuICAgIH1cclxuICAgIFRyZWUucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRlbnQpIHtcclxuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IHRoaXMucm9vdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGVudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghcGFyZW50Tm9kZS5ub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUubm9kZXMucHVzaChuZXcgTE5vZGUoTm9kZVR5cGUuQkxPQ0spKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5ub2Rlc1twYXJlbnROb2RlLm5vZGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJlbnROb2RlLm5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFRyZWU7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVHJlZSA9IFRyZWU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vZGVVdGlsLmpzLm1hcCIsImltcG9ydCB7IENvbXBvbmVudCwgTE5vZGUgfSBmcm9tICcuLi8uLi9kaXN0L21vZHVsZXMnXHJcblxyXG5jb25zdCBfY29tcG9uZW50czogeyBbbmFtZTogc3RyaW5nXTogTE5vZGUgfSA9IHJlcXVpcmUoJy4vYXBwLmpzb24nKVxyXG5cclxuY29uc3QgYXBwID0gbmV3IENvbXBvbmVudChfY29tcG9uZW50cy5hcHApXHJcblxyXG5hcHAubW91bnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEhUTUxFbGVtZW50KSJdLCJzb3VyY2VSb290IjoiIn0=