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
	    }
	
	    _createClass(Application, [{
	        key: 'initialize',
	        value: function initialize() {
	            this.renderSourceList();
	            this.initListeners();
	        }
	    }, {
	        key: 'initListeners',
	        value: function initListeners() {
	            var _this = this;
	
	            var sourceList = document.getElementById('source-list');
	            sourceList.addEventListener('click', function (e) {
	                return _this.sendRequest(e);
	            });
	            document.querySelector('#source-list > li').click();
	        }
	    }, {
	        key: 'renderSourceList',
	        value: function renderSourceList() {
	            var sourceList = document.getElementById('source-list');
	            var sources = this.sources;
	
	            for (var i = 0; i < sources.length; i++) {
	                var sourceElement = document.createElement('li');
	                sourceElement.dataset.id = sources[i].id;
	                sourceElement.innerHTML = sources[i].name;
	
	                sourceList.appendChild(sourceElement);
	            }
	        }
	    }, {
	        key: 'renderNewsItems',
	        value: function renderNewsItems(newsItems, activeSource) {
	            var newsSection = document.getElementById('feed');
	            var sources = document.querySelectorAll('#source-list li');
	            newsSection.innerHTML = "";
	
	            for (var i = 0; i < sources.length; i++) {
	                sources[i].classList.remove('active');
	            }
	            activeSource.classList.add('active');
	
	            for (var _i = 0; _i < newsItems.length; _i++) {
	                var newsItem = new _NewsItem2.default(newsItems[_i]);
	                newsSection.appendChild(newsItem.render());
	            }
	        }
	    }, {
	        key: 'sendRequest',
	        value: function sendRequest(event) {
	            var _this2 = this;
	
	            var activeSource = event.target;
	            var promise = fetch('https://newsapi.org/v1/articles?source=' + activeSource.dataset.id + '&apiKey=' + this.apiKey);
	
	            promise.then(function (response) {
	                return response.json();
	            }).then(function (data) {
	                _this2.renderNewsItems(data.articles, activeSource);
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
	
	        this.title = news.title;
	        this.urlToImage = news.urlToImage;
	        this.author = news.author;
	        this.publishedAt = this.transformDate(news.publishedAt);
	        this.description = news.description;
	        this.url = news.url;
	    }
	
	    _createClass(NewsItem, [{
	        key: 'render',
	        value: function render() {
	            var newsElement = document.createElement('li');
	
	            newsElement.innerHTML = '\n            <h3 class="title">' + this.title + '</h3>\n            <p class="image"><img src="' + this.urlToImage + '" alt="' + this.title + '"/></p>\n            <div class="feed-info">\n                <p class="author">' + (this.author ? this.author : '') + '</p>\n                <p class="publishedAt">published at ' + this.publishedAt + '</p>\n                <p class="description">' + this.description + '</p>\n                <p class="url">\n                    <a href="' + this.url + '" target="_blank">Click to see full article</a>\n                </p>\n            </div>\n        ';
	
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