// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/scroll-parallax/dist/Parallax.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('Parallax', ['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.Parallax = mod.exports;
  }
})(this, function (module) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function $$(selector, ctx) {
    var els = void 0;

    if (typeof selector == 'string') {
      els = (ctx || document).querySelectorAll(selector);
    } else {
      els = selector;
    }

    return Array.prototype.slice.call(els);
  }

  function extend(src) {
    var obj = void 0,
        args = arguments;
    for (var i = 1; i < args.length; ++i) {
      if (obj = args[i]) {
        for (var key in obj) {
          src[key] = obj[key];
        }
      }
    }
    return src;
  }

  function isUndefined(val) {
    return typeof val == 'undefined';
  }

  function toCamel(string) {
    return string.replace(/-(\w)/g, function (_, c) {
      return c.toUpperCase();
    });
  }

  function elementData(el, attr) {
    if (attr) return el.dataset[attr] || el.getAttribute('data-' + attr);else return el.dataset || Array.prototype.slice.call(el.attributes).reduce(function (ret, attribute) {
      if (/data-/.test(attribute.name)) ret[toCamel(attribute.name)] = attribute.value;
      return ret;
    }, {});
  }

  function prefix(obj, prop) {
    var prefixes = ['ms', 'o', 'Moz', 'webkit'];
    var i = prefixes.length;
    while (i--) {
      var _prefix = prefixes[i],
          p = _prefix ? _prefix + prop[0].toUpperCase() + prop.substr(1) : prop.toLowerCase() + prop.substr(1);
      if (p in obj) {
        return p;
      }
    }
    return '';
  }

  var observable = function observable(el) {

    el = el || {};

    var callbacks = {},
        slice = Array.prototype.slice;

    Object.defineProperties(el, {
      on: {
        value: function value(event, fn) {
          if (typeof fn == 'function') (callbacks[event] = callbacks[event] || []).push(fn);
          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      off: {
        value: function value(event, fn) {
          if (event == '*' && !fn) callbacks = {};else {
            if (fn) {
              var arr = callbacks[event];
              for (var i = 0, cb; cb = arr && arr[i]; ++i) {
                if (cb == fn) arr.splice(i--, 1);
              }
            } else delete callbacks[event];
          }
          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      one: {
        value: function value(event, fn) {
          function on() {
            el.off(event, on);
            fn.apply(el, arguments);
          }
          return el.on(event, on);
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      trigger: {
        value: function value(event) {
          var arglen = arguments.length - 1,
              args = new Array(arglen),
              fns,
              fn,
              i;

          for (i = 0; i < arglen; i++) {
            args[i] = arguments[i + 1];
          }

          fns = slice.call(callbacks[event] || [], 0);

          for (i = 0; fn = fns[i]; ++i) {
            fn.apply(el, args);
          }

          if (callbacks['*'] && event != '*') el.trigger.apply(el, ['*', event].concat(args));

          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      }
    });

    return el;
  };

  var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (cb) {
    setTimeout(cb, 1000 / 60);
  };
  var RESIZE_DELAY = 20;

  var Stage = function () {
    function Stage() {
      _classCallCheck(this, Stage);

      observable(this);
      this.resizeTimer = null;
      this.tick = false;
      this.bind();
    }

    _createClass(Stage, [{
      key: 'bind',
      value: function bind() {
        var _this = this;

        window.addEventListener('scroll', function () {
          return _this.scroll();
        }, true);
        window.addEventListener('mousewheel', function () {
          return _this.scroll();
        }, true);
        window.addEventListener('touchmove', function () {
          return _this.scroll();
        }, true);
        window.addEventListener('resize', function () {
          return _this.resize();
        }, true);
        window.addEventListener('orientationchange', function () {
          return _this.resize();
        }, true);
        window.onload = function () {
          return _this.scroll();
        };

        return this;
      }
    }, {
      key: 'scroll',
      value: function scroll() {
        var _this2 = this;

        if (this.tick) return this;
        this.tick = !this.tick;
        rAF(function () {
          return _this2.update();
        });
        return this;
      }
    }, {
      key: 'update',
      value: function update() {
        this.trigger('scroll', this.scrollTop);
        this.tick = !this.tick;
        return this;
      }
    }, {
      key: 'resize',
      value: function resize() {
        var _this3 = this;

        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
          return _this3.trigger('resize', _this3.size);
        }, RESIZE_DELAY);
        return this;
      }
    }, {
      key: 'scrollTop',
      get: function get() {
        var top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
        return window.isNaN(top) ? 0 : top;
      }
    }, {
      key: 'height',
      get: function get() {
        return window.innerHeight;
      }
    }, {
      key: 'width',
      get: function get() {
        return window.innerWidth;
      }
    }, {
      key: 'size',
      get: function get() {
        return {
          width: this.width,
          height: this.height
        };
      }
    }]);

    return Stage;
  }();

  var TRANSFORM_PREFIX = function (div) {
    return prefix(div.style, 'transform');
  }(document.createElement('div'));
  var HAS_MATRIX = function (div) {
    div.style[TRANSFORM_PREFIX] = 'matrix(1, 0, 0, 1, 0, 0)';
    return (/matrix/g.test(div.style.cssText)
    );
  }(document.createElement('div'));

  var Canvas = function () {
    function Canvas(img, opts) {
      _classCallCheck(this, Canvas);

      observable(this);
      this.opts = opts;
      this.img = img;
      this.wrapper = img.parentNode;
      this.isLoaded = false;

      this.initial = img.cloneNode(true);
    }

    _createClass(Canvas, [{
      key: 'load',
      value: function load() {
        var _this4 = this;

        if (!this.img.width || !this.img.height || !this.img.complete) {
          this.img.onload = function () {
            return _this4.onImageLoaded();
          };
        } else {
          this.onImageLoaded();
        }

        return this;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.img.parentNode.replaceChild(this.initial, this.img);
        this.off('*');
      }
    }, {
      key: 'onImageLoaded',
      value: function onImageLoaded() {
        this.isLoaded = true;
        this.update();
        this.img.style.willChange = 'transform';
        this.trigger('loaded', this.img);
        return this;
      }
    }, {
      key: 'update',
      value: function update() {
        var iw = this.img.naturalWidth || this.img.width,
            ih = this.img.naturalHeight || this.img.height,
            ratio = iw / ih,
            size = this.size;

        var nh = void 0,
            nw = void 0,
            offsetTop = void 0,
            offsetLeft = void 0;

        if (size.width / ratio <= size.height) {
          nw = size.height * ratio;
          nh = size.height;
        } else {
          nw = size.width;
          nh = size.width / ratio;
        }

        if (nh <= size.height + size.height * this.opts.safeHeight) {
          nw += nw * this.opts.safeHeight;
          nh += nh * this.opts.safeHeight;
        }

        offsetTop = -~~((nh - size.height) / 2);
        offsetLeft = -~~((nw - size.width) / 2);

        this.img.width = nw;
        this.img.height = nh;
        this.img.style.top = offsetTop + 'px';
        this.img.style.left = offsetLeft + 'px';

        return this;
      }
    }, {
      key: 'draw',
      value: function draw(_ref) {
        var scrollTop = _ref.scrollTop,
            width = _ref.width,
            height = _ref.height;

        var size = this.size,
            perc = (this.offset.top + size.height * this.opts.center + height / 2 - scrollTop) / height - 1,
            offset = ~~(perc * (this.img.height / size.height / 2 * this.opts.intensity) * 10);

        this.img.style[TRANSFORM_PREFIX] = HAS_MATRIX ? 'matrix(1,0,0,1, 0, ' + -offset + ')' : 'translate(0, ' + -offset + 'px)';

        return this;
      }
    }, {
      key: 'bounds',
      get: function get() {
        return this.wrapper.getBoundingClientRect();
      }
    }, {
      key: 'offset',
      get: function get() {
        return {
          top: this.wrapper.offsetTop,
          left: this.wrapper.offsetLeft
        };
      }
    }, {
      key: 'size',
      get: function get() {
        var props = this.bounds;
        return {
          height: props.height | 0,
          width: props.width | 0
        };
      }
    }]);

    return Canvas;
  }();

  var stage = void 0;

  var Parallax = function () {
    function Parallax() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Parallax);

      observable(this);

      this.opts = opts;
      this.selector = selector;
      this.canvases = [];
      this.bound = false;

      if (selector !== null) {
        this.add(selector);
      }

      if (!stage) stage = new Stage();

      return this;
    }

    _createClass(Parallax, [{
      key: 'init',
      value: function init() {

        if (this.bound) {
          throw 'The parallax instance has already been initialized';
        }

        if (!this.canvases.length && this.selector !== null) {
          console.warn('No images were found with the selector "' + this.selector + '"');
        } else {
          this.imagesLoaded = 0;
          this.bind();
        }

        return this;
      }
    }, {
      key: 'bind',
      value: function bind() {
        var _this5 = this;

        this._onResize = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _this5.resize.apply(_this5, args);
        };
        this._onScroll = function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _this5.scroll.apply(_this5, args);
        };

        stage.on('resize', this._onResize);
        stage.on('scroll', this._onScroll);

        this.canvases.forEach(function (canvas) {
          canvas.one('loaded', function () {
            return _this5.onCanvasLoaded(canvas);
          });
          canvas.load();
        });

        this.bound = true;

        return this;
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.onResize(stage.size).onScroll(stage.scrollTop);
        return this;
      }
    }, {
      key: 'onCanvasLoaded',
      value: function onCanvasLoaded(canvas) {
        this.trigger('image:loaded', canvas.img, canvas);
        this.imagesLoaded++;
        canvas.draw(stage);
        if (this.imagesLoaded == this.canvases.length) this.trigger('images:loaded');
        return this;
      }
    }, {
      key: 'scroll',
      value: function scroll(scrollTop) {
        var offsetYBounds = this.opts.offsetYBounds,
            _stage = stage,
            height = _stage.height,
            width = _stage.width;


        var i = this.canvases.length;

        while (i--) {
          var canvas = this.canvases[i],
              canvasHeight = canvas.size.height,
              canvasOffset = canvas.offset;

          if (canvas.isLoaded && scrollTop + stage.height + offsetYBounds > canvasOffset.top && canvasOffset.top + canvasHeight > scrollTop - offsetYBounds) {
            canvas.draw({ height: height, scrollTop: scrollTop, width: width });
            this.trigger('draw', canvas.img);
          }
        }

        this.trigger('update', scrollTop);

        return this;
      }
    }, {
      key: 'add',
      value: function add(els) {
        var _this6 = this;

        var canvases = this.createCanvases($$(els));

        if (this.bound) {
          canvases.forEach(function (canvas) {
            canvas.one('loaded', function () {
              return _this6.onCanvasLoaded(canvas);
            });
            canvas.load();
          });
        }

        this.canvases = this.canvases.concat(canvases);

        return this;
      }
    }, {
      key: 'remove',
      value: function remove(els) {
        var _this7 = this;

        $$(els).forEach(function (el) {
          var i = _this7.canvases.length;
          while (i--) {
            if (el == _this7.canvases[i].img) {
              _this7.canvases[i].destroy();
              _this7.canvases.splice(i, 1);
              break;
            }
          }
        });
        return this;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.off('*');
        this.canvases = [];
        stage.off('resize', this._onResize).off('scroll', this._onScroll);
        return this;
      }
    }, {
      key: 'resize',
      value: function resize(size) {
        var i = this.canvases.length;
        while (i--) {
          var canvas = this.canvases[i];
          if (!canvas.isLoaded) return;
          canvas.update().draw(stage);
        }
        this.trigger('resize');
        return this;
      }
    }, {
      key: 'createCanvases',
      value: function createCanvases(els) {
        var _this8 = this;

        return els.map(function (el) {
          var data = elementData(el);
          return new Canvas(el, {
            intensity: !isUndefined(data.intensity) ? +data.intensity : _this8.opts.intensity,
            center: !isUndefined(data.center) ? +data.center : _this8.opts.center,
            safeHeight: !isUndefined(data.safeHeight) ? +data.safeHeight : _this8.opts.safeHeight
          });
        });
      }
    }, {
      key: 'opts',
      set: function set(opts) {
        this._defaults = {
          offsetYBounds: 50,
          intensity: 30,
          center: 0.5,

          safeHeight: 0.15 };
        extend(this._defaults, opts);
      },
      get: function get() {
        return this._defaults;
      }
    }]);

    return Parallax;
  }();

  module.exports = Parallax;
});
},{}],"node_modules/scroll-parallax/index.js":[function(require,module,exports) {
// use here your library name
module.exports = require('./dist/Parallax')
},{"./dist/Parallax":"node_modules/scroll-parallax/dist/Parallax.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _scrollParallax = _interopRequireDefault(require("scroll-parallax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var p = new _scrollParallax.default(".parallax").init();
});
},{"scroll-parallax":"node_modules/scroll-parallax/index.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60146" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/personal-website.e31bb0bc.map