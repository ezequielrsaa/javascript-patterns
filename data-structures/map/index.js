// Use your own namespace to keep global scope clean
var myNS = myNS || Object.create(null);

myNS.Map = function() {
  // Use weak map to encapsulate the items of each map instance
  const data = new WeakMap();

  class Entry {

    constructor(key, value) {
      this.key = key;
      this.value = value;
    }

    toString() {
      return `{${this.key}: ${this.value}}`;
    }
  }

  class Map {

    constructor() {
      data.set(this, []);
    }

    set(key, value) {
      let m = data.get(this);
      let entry = m.find(entry => key === entry.key);

      if (entry) {
        entry.value = value;
      } else {
        m.push(new Entry(key, value));
      }
    }

    get(key) {
      let m = data.get(this);
      let entry = m.find(entry => key === entry.key);

      if (entry) {
        return entry.value;
      } else {
        return null;
      }
    }

    delete(key) {
      let m = data.get(this);
      let index = m.findIndex(entry => key === entry.key);

      if (index !== -1) {
        m.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }

    has(key) {
      let m = data.get(this);
      return m.findIndex(entry => key === entry.key) !== -1;
    }

    isEmpty() {
      return this.size() === 0;
    }

    clear() {
      data.set(this, []);
    }

    size() {
      return data.get(this).length;
    }

    keys() {
      let m = data.get(this);
      return m.map(entry => entry.key);
    }

    values() {
      let m = data.get(this);
      return m.map(entry => entry.value);
    }

    toString() {
      return `Map: [${data.get(this).join(', ')}]`;
    }
  }

  return Map;
}();

let m = new myNS.Map();

m.set('bob', 'bob@mail.com'); // [{bob: bob@mail.com}]
m.set('alice', 'alice@mail.com'); // [{bob: bob@mail.com}, {alice: alice@mail.com}]

m.keys(); // ['bob', 'alice']
m.values(); // ['bob@mail.com', 'alice@mail.com']

m.delete('bob'); // [{alice: alice@mail.com}]

m.keys(); // ['alice']
m.values(); // ['alice: alice@mail.com']
