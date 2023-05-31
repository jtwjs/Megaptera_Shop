import PATH from "@/constants/path";

export class PathStorage {
  private _key: string;

  constructor(key: string) {
    this._key = key;
  }

  get key() {
    return this._key;
  }

  getPath() {
    return globalThis?.sessionStorage.getItem(this.key) ?? PATH.ROOT;
  }

  setPath(path: string) {
    globalThis?.sessionStorage.setItem(this._key, path);
  }

  clearPath() {
    globalThis?.sessionStorage.removeItem(this.key);
  }
}
