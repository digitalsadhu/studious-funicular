export default class LocalStorageAdapter {
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  get(key) {
    const entry = window.localStorage.getItem(key);
    try {
      return JSON.parse(entry);
    } catch (err) {
      return null;
    }
  }
}
