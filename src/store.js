export default class Store {
  constructor(props) {
    this._storage = props.storage;
    this._storeKey = props.key;
  }

  setItem({ key, item }) {
    const items = this.getAll();
    items[key] = item;

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  getItem({ key }) {
    const items = this.getAll();
    return items[key];
  }

  removeItem({ key }) {
    const items = this.getAll();
    delete items[key];

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  getAll() {
    const emptyItems = {};
    const items = this._storage.getItem(this._storeKey);

    if (!items) {
      return emptyItems;
    }

    try {
      return JSON.parse(items);
    } catch (e) {
      console.error(`Error parse items. Error: ${e}. Items: ${items}`);
      return emptyItems;
    }
  }
}
