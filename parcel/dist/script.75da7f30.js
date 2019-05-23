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
})({"data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MnistData = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var IMAGE_SIZE = 784;
var NUM_CLASSES = 10;
var NUM_DATASET_ELEMENTS = 65000;
var TRAIN_TEST_RATIO = 5 / 6;
var NUM_TRAIN_ELEMENTS = Math.floor(TRAIN_TEST_RATIO * NUM_DATASET_ELEMENTS);
var NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;
var MNIST_IMAGES_SPRITE_PATH = 'https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png';
var MNIST_LABELS_PATH = 'https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8';
/**
 * A class that fetches the sprited MNIST dataset and returns shuffled batches.
 *
 * NOTE: This will get much easier. For now, we do data fetching and
 * manipulation manually.
 */

var MnistData =
/*#__PURE__*/
function () {
  function MnistData() {
    _classCallCheck(this, MnistData);

    this.shuffledTrainIndex = 0;
    this.shuffledTestIndex = 0;
  }

  _createClass(MnistData, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var img, canvas, ctx, imgRequest, labelsRequest, _ref, _ref2, imgResponse, labelsResponse;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Make a request for the MNIST sprited image.
                img = new Image();
                canvas = document.createElement('canvas');
                ctx = canvas.getContext('2d');
                imgRequest = new Promise(function (resolve, reject) {
                  img.crossOrigin = '';

                  img.onload = function () {
                    img.width = img.naturalWidth;
                    img.height = img.naturalHeight;
                    var datasetBytesBuffer = new ArrayBuffer(NUM_DATASET_ELEMENTS * IMAGE_SIZE * 4);
                    var chunkSize = 5000;
                    canvas.width = img.width;
                    canvas.height = chunkSize;

                    for (var i = 0; i < NUM_DATASET_ELEMENTS / chunkSize; i++) {
                      var datasetBytesView = new Float32Array(datasetBytesBuffer, i * IMAGE_SIZE * chunkSize * 4, IMAGE_SIZE * chunkSize);
                      ctx.drawImage(img, 0, i * chunkSize, img.width, chunkSize, 0, 0, img.width, chunkSize);
                      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                      for (var j = 0; j < imageData.data.length / 4; j++) {
                        // All channels hold an equal value since the image is grayscale, so
                        // just read the red channel.
                        datasetBytesView[j] = imageData.data[j * 4] / 255;
                      }
                    }

                    _this.datasetImages = new Float32Array(datasetBytesBuffer);
                    resolve();
                  };

                  img.src = MNIST_IMAGES_SPRITE_PATH;
                });
                labelsRequest = fetch(MNIST_LABELS_PATH);
                _context.next = 7;
                return Promise.all([imgRequest, labelsRequest]);

              case 7:
                _ref = _context.sent;
                _ref2 = _slicedToArray(_ref, 2);
                imgResponse = _ref2[0];
                labelsResponse = _ref2[1];
                _context.t0 = Uint8Array;
                _context.next = 14;
                return labelsResponse.arrayBuffer();

              case 14:
                _context.t1 = _context.sent;
                this.datasetLabels = new _context.t0(_context.t1);
                // Create shuffled indices into the train/test set for when we select a
                // random dataset element for training / validation.
                this.trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
                this.testIndices = tf.util.createShuffledIndices(NUM_TEST_ELEMENTS); // Slice the the images and labels into train and test sets.

                this.trainImages = this.datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
                this.testImages = this.datasetImages.slice(IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
                this.trainLabels = this.datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS);
                this.testLabels = this.datasetLabels.slice(NUM_CLASSES * NUM_TRAIN_ELEMENTS);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "nextTrainBatch",
    value: function nextTrainBatch(batchSize) {
      var _this2 = this;

      return this.nextBatch(batchSize, [this.trainImages, this.trainLabels], function () {
        _this2.shuffledTrainIndex = (_this2.shuffledTrainIndex + 1) % _this2.trainIndices.length;
        return _this2.trainIndices[_this2.shuffledTrainIndex];
      });
    }
  }, {
    key: "nextTestBatch",
    value: function nextTestBatch(batchSize) {
      var _this3 = this;

      return this.nextBatch(batchSize, [this.testImages, this.testLabels], function () {
        _this3.shuffledTestIndex = (_this3.shuffledTestIndex + 1) % _this3.testIndices.length;
        return _this3.testIndices[_this3.shuffledTestIndex];
      });
    }
  }, {
    key: "nextBatch",
    value: function nextBatch(batchSize, data, index) {
      var batchImagesArray = new Float32Array(batchSize * IMAGE_SIZE);
      var batchLabelsArray = new Uint8Array(batchSize * NUM_CLASSES);

      for (var i = 0; i < batchSize; i++) {
        var idx = index();
        var image = data[0].slice(idx * IMAGE_SIZE, idx * IMAGE_SIZE + IMAGE_SIZE);
        batchImagesArray.set(image, i * IMAGE_SIZE);
        var label = data[1].slice(idx * NUM_CLASSES, idx * NUM_CLASSES + NUM_CLASSES);
        batchLabelsArray.set(label, i * NUM_CLASSES);
      }

      var xs = tf.tensor2d(batchImagesArray, [batchSize, IMAGE_SIZE]);
      var labels = tf.tensor2d(batchLabelsArray, [batchSize, NUM_CLASSES]);
      return {
        xs: xs,
        labels: labels
      };
    }
  }]);

  return MnistData;
}();

exports.MnistData = MnistData;
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _data = require("./data.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function showExamples(_x) {
  return _showExamples.apply(this, arguments);
}

function _showExamples() {
  _showExamples = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(data) {
    var surface, examples, numExamples, _loop, i;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Create a container in the visor
            surface = tfvis.visor().surface({
              name: 'Input Data Examples',
              tab: 'Input Data'
            }); // Get the examples

            examples = data.nextTestBatch(20);
            numExamples = examples.xs.shape[0]; // Create a canvas element to render each example

            _loop =
            /*#__PURE__*/
            regeneratorRuntime.mark(function _loop(i) {
              var imageTensor, canvas;
              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      imageTensor = tf.tidy(function () {
                        // Reshape the image to 28x28 px
                        return examples.xs.slice([i, 0], [1, examples.xs.shape[1]]).reshape([28, 28, 1]);
                      });
                      canvas = document.createElement('canvas');
                      canvas.width = 28;
                      canvas.height = 28;
                      canvas.style = 'margin: 4px;';
                      _context.next = 7;
                      return tf.browser.toPixels(imageTensor, canvas);

                    case 7:
                      surface.drawArea.appendChild(canvas);
                      imageTensor.dispose();

                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop);
            });
            i = 0;

          case 5:
            if (!(i < numExamples)) {
              _context2.next = 10;
              break;
            }

            return _context2.delegateYield(_loop(i), "t0", 7);

          case 7:
            i++;
            _context2.next = 5;
            break;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));
  return _showExamples.apply(this, arguments);
}

function run() {
  return _run.apply(this, arguments);
}

function _run() {
  _run = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var data;
    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = new _data.MnistData();
            _context3.next = 3;
            return data.load();

          case 3:
            _context3.next = 5;
            return showExamples(data);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));
  return _run.apply(this, arguments);
}

document.addEventListener('DOMContentLoaded', run);
},{"./data.js":"data.js"}]},{},["script.js"], null)
//# sourceMappingURL=/script.75da7f30.map