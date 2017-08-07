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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Random = (function () {
    function Random(seed) {
        this.seed = seed;
    }
    Random.prototype.next = function () {
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    };
    Random.prototype.nextBetween = function (min, max) {
        if (min === max)
            return (min);
        var next = this.next();
        return ((next * (max - min)) + min);
    };
    ;
    Random.static = new Random(Math.random());
    return Random;
}());
exports.Random = Random;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Commands = __webpack_require__(2);
var CommandHandlers = __webpack_require__(3);
var TileWorkerContext_1 = __webpack_require__(9);
var Random_1 = __webpack_require__(0);
var TileWorker = (function () {
    function TileWorker() {
        var _this = this;
        this.handlers = {};
        this.handleMessage = function (message) {
            var handler = _this.handlers[message.data.name];
            var handlerInstance = new handler();
            handlerInstance.handle(_this.context, message.data);
        };
        this.handlers[new Commands.Initialize().name] = CommandHandlers.Initialize;
        addEventListener('message', this.handleMessage);
        this.initializeContext();
    }
    TileWorker.prototype.initializeContext = function () {
        var random = new Random_1.Random(500);
        this.context = new TileWorkerContext_1.TileWorkerContext(this, random);
    };
    TileWorker.prototype.sendMessage = function (message) {
        postMessage(message, undefined);
    };
    return TileWorker;
}());
exports.TileWorker = TileWorker;
var worker = new TileWorker();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Initialize = (function () {
    function Initialize() {
        this.name = "Initialize";
    }
    return Initialize;
}());
exports.Initialize = Initialize;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Initialize_1 = __webpack_require__(4);
exports.Initialize = Initialize_1.Initialize;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector2_1 = __webpack_require__(5);
var Tree_1 = __webpack_require__(6);
var TileSet_1 = __webpack_require__(7);
var Events_1 = __webpack_require__(8);
var Initialize = (function () {
    function Initialize() {
    }
    Initialize.prototype.handle = function (context, command) {
        context.tileSet = new TileSet_1.TileSet(10);
        this.createTrees(context);
        context.tileSet.initialize();
    };
    Initialize.prototype.createTrees = function (context) {
        for (var x = -5; x <= 5; x++) {
            for (var z = -5; z <= 5; z++) {
                if (context.random.next() < 0.75) {
                    var tree = new Tree_1.Tree(context);
                    var seed = context.random.next();
                    var age = context.random.next();
                    tree.init(seed, age);
                    context.tileSet.setTile(x, z, tree);
                    var event = new Events_1.CreatedTree();
                    event.tileIndex = new Vector2_1.Vector2(x, z);
                    event.seed = seed;
                    event.age = age;
                    context.worker.sendMessage(event);
                }
            }
        }
    };
    return Initialize;
}());
exports.Initialize = Initialize;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector2;
}());
exports.Vector2 = Vector2;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Random_1 = __webpack_require__(0);
var Tree = (function () {
    function Tree(context) {
        this.context = context;
    }
    Tree.prototype.init = function (seed, age) {
        this.seed = seed;
        this.age = age;
    };
    Tree.prototype.setTile = function (tile) {
        this.tile = tile;
    };
    Tree.prototype.runTick = function (tickNr) {
        var random = new Random_1.Random(this.seed + tickNr);
        if (this.age < 1) {
            if (random.next() < 0.1) {
                this.age += .01;
                if (this.age > 1)
                    this.age = 1;
            }
        }
    };
    return Tree;
}());
exports.Tree = Tree;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Tile = (function () {
    function Tile() {
    }
    Tile.prototype.runTick = function (tickNr) {
        if (this.content)
            this.content.runTick(tickNr);
    };
    return Tile;
}());
exports.Tile = Tile;
var TileSet = (function () {
    function TileSet(size) {
        this.tileSize = 10;
        this.tickNr = 0;
        this.tiles = [];
        for (var x = -size / 2; x <= size / 2; x++) {
            this.tiles[x] = [];
        }
    }
    TileSet.prototype.setTile = function (x, z, content) {
        var tile = this.tiles[x][z];
        if (!tile)
            tile = this.tiles[x][z] = new Tile();
        tile.content = content;
        content.setTile(tile);
    };
    TileSet.prototype.getTile = function (index) {
        var row = this.tiles[index.x];
        return row ? row[index.y] : undefined;
    };
    TileSet.prototype.initialize = function () {
        var _this = this;
        setInterval(function () { return _this.runTick(); }, 1000);
    };
    TileSet.prototype.runTick = function () {
        this.tickNr++;
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var tileRow = _a[_i];
            for (var _b = 0, tileRow_1 = tileRow; _b < tileRow_1.length; _b++) {
                var tile = tileRow_1[_b];
                if (tile)
                    tile.runTick(this.tickNr);
            }
        }
    };
    return TileSet;
}());
exports.TileSet = TileSet;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CreatedTree = (function () {
    function CreatedTree() {
        this.name = "CreatedTree";
    }
    return CreatedTree;
}());
exports.CreatedTree = CreatedTree;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TileWorkerContext = (function () {
    function TileWorkerContext(worker, random) {
        this.worker = worker;
        this.random = random;
    }
    return TileWorkerContext;
}());
exports.TileWorkerContext = TileWorkerContext;


/***/ })
/******/ ]);
//# sourceMappingURL=tileworker.js.map