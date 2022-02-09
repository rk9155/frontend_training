class Utils {
  isNull = (value) => {
    if (value === null) {
      return true;
    }
    return false;
  };

  isUndefined = (value) => {
    // logic to find whether value is undefined

    if (value === undefined) {
      return true;
    }
    return false;
  };

  isNumber = (value) => {
    // logic to find whether value is number

    if (typeof value === 'number') {
      return true;
    }
    return false;
  };

  isString = (value) => {
    // logic to find whether value is string

    if (typeof value === 'string') {
      return true;
    }
    return false;
  };

  isBoolean = (value) => {
    // logic to find whether value is boolean value

    if (typeof value === 'boolean') {
      return true;
    }
    return false;
  };

  isObject = (value) => {
    // logic to find whether value is an object

    if (typeof value === 'object' && value !== null) {
      return true;
    }
    return false;
  };


  isArray = (value) => {
    // logic to find whether value is an Array

    if (Array.isArray(value)) {
      return true;
    }
    return false;
  };


  isTruthy = (value) => {
    // logic to find whether value is truthy

    if (this.isFalsy(value) === false) {
      return true;
    }
    return false;
  };

  isFalsy = (value) => {
    // logic to find whether value is falsy

    if (value === false || value === undefined || value === null || value === 0 || value === -0 || value === "" || value === NaN) {
      return true;
    }
    return false;
  };

  isFunction = (value) => {
    return typeof value === "function";
  };

  keys = (value) => {
    var res = Object.keys(value);
    console.log(res);
    return res;
  };

  values = (value) => {
    var res = Object.values(value);
    console.log(res);
    return res;
  };

  size = (value) => {
    return value.length;
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
  };
}

async function fetchDefinition() {
  /**
   * URL: https://raw.githubusercontent.com/karthik-hr/js-utils/master/definition.json;
   */

  const response = await fetch('https://raw.githubusercontent.com/karthik-hr/js-utils/master/definition.json');
  const data = await response.json();

  return data;
}

function findStats(definition) {
  const instance = new Utils();

  data = definition.data;
  // console.log(data);

  const stats = {
    numberOfItems: 0,
    null: 0,
    undefined: 0,
    numbers: 0,
    strings: 0,
    boolean: 0,
    objects: 0,
    array: 0,
    truthy: 0,
    falsy: 0,
  };

  stats.numberOfItems = data.length;

  for (let i = 0; i < data.length; i++) {
    var item = instance.values(data[i]);
    for (let j = 0; j < item.length; j++) {
      if (instance.isNull(item[j])) {
        stats.null++;
      }
      if (instance.isUndefined(item[j])) {
        stats.undefined++;
      }
      if (instance.isNumber(item[j])) {
        stats.numbers++;
      }
      if (instance.isString(item[j])) {
        stats.strings++;
      }
      if (instance.isBoolean(item[j])) {
        stats.boolean++;
      }
      if (instance.isObject(item[j])) {
        stats.objects++;
      }
      if (instance.isArray(item[j])) {
        stats.array++;
      }
      if (instance.isTruthy(item[j])) {
        stats.truthy++;
      }
      if (instance.isFalsy(item[j])) {
        stats.falsy++;
      }
    }
  }
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

async function main() {
  const definition = await fetchDefinition();

  const stats = findStats(definition);
  render(stats);
}

main();