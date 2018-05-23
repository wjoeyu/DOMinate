const DOMNodeCollection = require("./dom_node_collection.js");

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
