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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

function $l (arg) {

  if (typeof arg === 'string' ) {
    const elementList = document.querySelectorAll(arg);
    const array = Array.from(elementList);
    return new DOMNodeCollection(array);
  }
  if (arg instanceof HTMLElement) {
    const dNc = new DOMNodeCollection([arg]);
    return dNc;
  }

  if (arg instanceof Function) {
    window.addEventListener('load', () => {
      arg();
    });
  }

}

$l.extend = function (...objs) {
  for (let i = 1; i < objs.length; i++) {
    Object.assign(objs[0], objs[i]);
  }
  return objs[0];
};

$l.ajax = function (obj) {
  const defaults = {
    success: () => {},
    error: () => {},
    url: "",
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  options = $l.extend(defaults, obj);
  options.method = options.method.toUpperCase();

  if (options.method === 'GET') {
    options.url += `?${toQueryString(options.data)}`;
  }

  const request = new XMLHttpRequest();
  request.open(options.method, options.url, true);
  request.onload = (e) => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));

};

toQueryString = (obj)=> {
  let result = '';
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
};


window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function DOMNodeCollection (html_elements) {
  this.html_elements = html_elements;
}

DOMNodeCollection.prototype.html = function (arg) {
  if (typeof arg === 'undefined') {
    return this.html_elements[0].innerHTML;
  } else {
    this.html_elements.forEach(el => {
      el.innerHTML = arg;
    });
  }
};

DOMNodeCollection.prototype.empty = function () {
  this.html("");
};

DOMNodeCollection.prototype.append = function (arg) {
  if(arg instanceof HTMLElement) {
    this.html_elements.forEach(el => {
      const newEl = arg.cloneNode(true);
      el.appendChild(newEl);
    });
  }
  if (typeof arg === "string") {
    this.html_elements.forEach(el => {
      const getTag = arg.split('>')[0].slice(1);
      const newEl = document.createElement(getTag);
      const innerHTML = arg.slice(getTag.length + 2, arg.length - (getTag.length + 3));
      newEl.innerHTML = innerHTML;
      el.appendChild(newEl);
    });
  }
  if (arg instanceof DOMNodeCollection) {
    this.html_elements.forEach(el => {
      arg.html_elements.forEach(el2 => {
        el.innerHTML += el2.outerHTML;
      });
    });
  }
};

DOMNodeCollection.prototype.attr = function (attr, value) {
  this.html_elements.forEach(el => {
    el.setAttribute(attr, value);
  });
};

DOMNodeCollection.prototype.addClass = function(className) {
  this.html_elements.forEach(el => {
    el.classList.add(className);
  });
};

DOMNodeCollection.prototype.removeClass = function(className) {
  this.html_elements.forEach(el => {
    el.classList.remove(className);
  });
};

DOMNodeCollection.prototype.children = function () {
  let childrenArr = [];

  this.html_elements.forEach(el => {
    childrenArr = childrenArr.concat(Array.from(el.children));
  });

  return new DOMNodeCollection(childrenArr);

};

DOMNodeCollection.prototype.parent = function () {
  const parentArr = [];

  this.html_elements.forEach(el => {
    parentArr.push(el.parentElement);
  });

  return new DOMNodeCollection(parentArr);

};

DOMNodeCollection.prototype.find = function (selector) {
  let found = [];

  this.html_elements.forEach(el => {
    found = found.concat(el.querySelectorAll(selector));
  });

  return new DOMNodeCollection(found);

};

DOMNodeCollection.prototype.remove = function () {

  this.html_elements.forEach(el => {
    el.parentElement.removeChild(el);
  });
};

DOMNodeCollection.prototype.on = function (type, callback) {

  this.html_elements.forEach(el => {
    el.callbacks = el.callbacks || {};
    el.callbacks[type] = callback;
    el.addEventListener(type, callback);
  });
};


DOMNodeCollection.prototype.off = function (type, callback) {
  this.html_elements.forEach(el => {
    if (!type) {
      el.outerHTML = el.outerHTML;
    } else {
      if (!callback) {
        callback = el.callbacks[type];
      }
      el.removeEventListener(type, callback);
    }
  });
};


module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=dominate.js.map