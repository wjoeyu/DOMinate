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
