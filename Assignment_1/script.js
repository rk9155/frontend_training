class Utils {
  isNull = (value) => {
    return value === null;
  };

  isUndefined = (value) => {
    return value === undefined;
  };

  isNumber = (value) => {
    return typeof value === "number";
  };

  isString = (value) => {
    return typeof value === "string";
  };

  isBoolean = (value) => {
    return typeof value === "boolean";
  };

  isObject = (value) => {
    return (
      typeof value === "object" && !this.isNull(value) && !this.isArray(value)
    );
  };

  isArray = (value) => {
    return Array.isArray(value);
  };


  isTruthy = (value) => {
    return !!value;
  };

  isFalsy = (value) => {
    return !value;
  };


  isFunction = (value) => {
    return typeof value === "function";
  };

  keys = (value) => {
    if(this.isObject(value)){
      return Object.keys(value);
    }
    return [];
  };

  values = (value) => {
    if(this.isObject(value)){
      return Object.values(value);
    }
    return [];
  };

  size = (value) => {
    if (this.isString(value) || this.isArray(value)) {
      return value.length;
    }
    return 0;
  };

  filter = (collection, predicate) => {

    if (!this.isArray(collection)) {
      return [];
    }

    if (!this.isFunction(predicate)) {
      return collection;
    }

    const result = [];
    for (const item of collection) {
      const truthy = predicate(item);

      if (truthy) {
        result.push(item);
      }
    }

    return result;
  };
}


async function fetchDefinition() {

  const API_URL =
    "https://raw.githubusercontent.com/karthik-hr/js-utils/master/definition.json";

  let response = await fetch(API_URL);
  response = await response.json();
  return response.data;
}

function findStats(definition) {
  const instance = new Utils();
  
  const data = definition.map((value) => instance.values(value)).flat();
  const stats = {
    numberOfItems: instance.size(definition),
    null: instance.size(instance.filter(data, instance.isNull)),
    undefined: instance.size(instance.filter(data, instance.isUndefined)),
    numbers: instance.size(instance.filter(data, instance.isNumber)),
    strings: instance.size(instance.filter(data, instance.isString)),
    boolean: instance.size(instance.filter(data, instance.isBoolean)),
    objects: instance.size(instance.filter(data, instance.isObject)),
    array: instance.size(instance.filter(data, instance.isArray)),
    truthy: instance.size(instance.filter(data, instance.isTruthy)),
    falsy: instance.size(instance.filter(data, instance.isFalsy)),
  };

  return stats;
}

function render(stats) {
  const items = Object.keys(stats);
  const ul = document.createElement("ul");
  for (const item of items) {
    const li = document.createElement("li");
    li.innerHTML = `${item}: ${stats[item]}`;
    ul.appendChild(li);
  }
  const root = document.getElementById("stats");
  if (root) {
    root.innerHTML = "";
    root.append(ul);
  }
}

function renderError() {
  const root = document.getElementById("stats");
  if (root) {
    root.innerHTML = "Oops! Something went wrong";
  }
}

async function main() {
  try {
    const definition = await fetchDefinition();
    const stats = findStats(definition);
    render(stats);
  } catch (ex) {
    renderError(ex);
  }
}

main();