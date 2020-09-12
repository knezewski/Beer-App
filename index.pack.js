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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getBeers = function () {
   var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var url, getPromise, beers, beerDiv, beerHtml, genericBottle;
      return regeneratorRuntime.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  url = urlBase + page + optionsABV + optionsIBU;

                  // fetch

                  _context.next = 3;
                  return fetch(url);

               case 3:
                  getPromise = _context.sent;
                  _context.next = 6;
                  return getPromise.json();

               case 6:
                  beers = _context.sent;


                  // pagination
                  page === 1 ? prevPage.disabled = true : prevPage.disabled = false;
                  beers.lenght < 25 ? nextPage.disabled = true : nextPage.disabled = false;
                  pageText.innerText = page;

                  // render data
                  beerDiv = document.querySelector(".beers");
                  beerHtml = "";
                  genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';

                  // Add the rest of the beer data to the HTML template

                  beers.forEach(function (beer) {
                     beerHtml += "\n      <div class=\"beer-wrapper card\">\n         <div class=\"beer\">\n            <img class=\"beer__img\" src=\"" + (beer.image_url ? beer.image_url : genericBottle) + "\">\n            <h3>" + beer.name + "</h3>\n            <span class=\"beer__info\">\n               <span>ABV: " + beer.abv + "%</span>\n               <span>IBU: " + beer.ibu + "</span>\n            </span>\n         </div>\n         <div class=\"beer__content\">\n            <div class=\"beer__name\">" + beer.name + "</div>\n            <div class=\"beer__tagline\">" + beer.tagline + "</div>\n            <div class=\"beer__description\">" + beer.description + "</div>\n            <div class=\"beer__food-pairing\">\n               Pair with: " + beer.food_pairing.join(', ') + "\n            </div>\n         </div>\n      </div>\n      ";
                  });
                  beerDiv.innerHTML = beerHtml;

               case 15:
               case "end":
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));

   return function getBeers() {
      return _ref.apply(this, arguments);
   };
}();

// pagination


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// variables

var urlBase = "https://api.punkapi.com/v2/beers?page=";
var filterABV = document.getElementById("filterABV");
var filterIBU = document.getElementById("filterIBU");
var pageText = document.getElementById("pageNumber");
var prevPage = document.getElementById("prevPage");
var nextPage = document.getElementById("nextPage");
var optionsABV = "";
var optionsIBU = "";
page = 1;

// filters

filterABV.addEventListener('change', function (event) {
   var value = event.target.value;

   switch (value) {
      case "all":
         optionsABV = "";
         break;
      case "weak":
         optionsABV = "&abv_lt=4.6";
         break;
      case "medium":
         optionsABV = "&abv_gt=4.5&abv_lt=7.6";
         break;
      case "strong":
         optionsABV = "&abv_gt=7.5";
         break;
   }

   page = 1;
   getBeers();
});

filterIBU.addEventListener('change', function (event) {
   var value = event.target.value;

   switch (value) {
      case "all":
         optionsIBU = "";
         break;
      case "weak":
         optionsIBU = "&ibu_lt=35";
         break;
      case "medium":
         optionsIBU = "&ibu_gt=34&ibu_lt=75";
         break;
      case "strong":
         optionsIBU = "&ibu_gt=74";
         break;
   }

   page = 1;
   getBeers();
});

prevPage.addEventListener('click', function () {
   page--;
   getBeers();
});
nextPage.addEventListener('click', function () {
   page++;
   getBeers();
});

// initial get
getBeers();

/***/ })
/******/ ]);