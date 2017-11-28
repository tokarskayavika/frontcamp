/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _App = __webpack_require__(1);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var application = new _App2.default();
	application.initialize();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(2);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _NewsItem = __webpack_require__(3);
	
	var _NewsItem2 = _interopRequireDefault(_NewsItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Application = function () {
	    function Application() {
	        _classCallCheck(this, Application);
	
	        this.sources = Constants.sources;
	        this.apiKey = Constants.apiKey;
	        this.activeSourceId = this.sources[0].id;
	    }
	
	    _createClass(Application, [{
	        key: 'initialize',
	        value: function initialize() {
	            this.renderSourceList();
	            document.getElementById(this.activeSourceId).click();
	        }
	    }, {
	        key: 'renderSourceList',
	        value: function renderSourceList() {
	            var _this = this;
	
	            var sourceList = document.getElementById('source-list');
	
	            this.sources.forEach(function (source) {
	                var sourceElement = document.createElement('li');
	                sourceElement.id = source.id;
	                sourceElement.innerHTML = source.name;
	                sourceElement.addEventListener('click', function () {
	                    return _this.changeSource(source.id);
	                });
	
	                sourceList.appendChild(sourceElement);
	            });
	        }
	    }, {
	        key: 'renderNewsItems',
	        value: function renderNewsItems(newsItems) {
	            var newsSection = document.getElementById('feed');
	            newsSection.innerHTML = "";
	
	            newsItems.forEach(function (item) {
	                var newsItem = new _NewsItem2.default(item);
	                newsSection.appendChild(newsItem.render());
	            });
	        }
	    }, {
	        key: 'changeSource',
	        value: function changeSource(activeSourceId) {
	            var activeSource = document.getElementById(activeSourceId);
	            var previousActiveSource = document.getElementById(this.activeSourceId);
	
	            this.sendRequest(activeSourceId);
	
	            previousActiveSource.classList.remove('active');
	            activeSource.classList.add('active');
	            this.activeSourceId = activeSourceId;
	        }
	    }, {
	        key: 'sendRequest',
	        value: function sendRequest(id) {
	            var _this2 = this;
	
	            var promise = fetch('https://newsapi.org/v1/articles?source=' + id + '&apiKey=' + this.apiKey);
	
	            promise.then(function (response) {
	                return response.json();
	            }).then(function (data) {
	                _this2.renderNewsItems(data.articles);
	            }).catch(alert);
	        }
	    }]);
	
	    return Application;
	}();
	
	exports.default = Application;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var options = exports.options = {
	    weekday: 'long',
	    year: 'numeric',
	    month: 'long',
	    day: 'numeric',
	    hour: 'numeric',
	    minute: 'numeric'
	};
	
	var sources = exports.sources = [{ id: 'techcrunch', name: 'techcrunch' }, { id: 'bild', name: 'bild' }, { id: 'mtv-news', name: 'mtv news' }, { id: 'national-geographic', name: 'national geographic' }, { id: 'cnn', name: 'cnn' }];
	
	var apiKey = exports.apiKey = 'eb81ab5ae83542edbef091949ecf6c34';

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(2);
	
	var Constants = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NewsItem = function () {
	    function NewsItem(news) {
	        _classCallCheck(this, NewsItem);
	
	        news.publishedAt = this.transformDate(news.publishedAt);
	        this.newsData = news;
	    }
	
	    _createClass(NewsItem, [{
	        key: 'render',
	        value: function render() {
	            var newsElement = document.createElement('li');
	            var data = this.newsData;
	
	            newsElement.innerHTML = '\n            <h3 class="title">' + data.title + '</h3>\n            <p class="image"><img src="' + data.urlToImage + '" alt="' + data.title + '"/></p>\n            <div class="feed-info">\n                <p class="author">' + (data.author ? data.author : '') + '</p>\n                <p class="publishedAt">published at ' + data.publishedAt + '</p>\n                <p class="description">' + data.description + '</p>\n                <p class="url">\n                    <a href="' + data.url + '" target="_blank">Click to see full article</a>\n                </p>\n            </div>\n        ';
	
	            return newsElement;
	        }
	    }, {
	        key: 'transformDate',
	        value: function transformDate(date) {
	            var dateObject = new Date(date);
	            return dateObject.toLocaleDateString('en', Constants.options);
	        }
	    }]);
	
	    return NewsItem;
	}();
	
	exports.default = NewsItem;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map