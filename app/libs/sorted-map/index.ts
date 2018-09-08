import Tree from 'avl';

export class SortedMap<K, T> {
  private map = new Map<K, T>();
  private tree = new Tree<K, T>();

  constructor(
    entries?: [K, T][],
    comparator?: (a: K, b: K) => number,
    private getDefault?: () => T
  ) {
    if (entries) {
      entries.forEach(entry => {
        const [key, value] = entry;
        this.set(key, value);
      });
    }
    if (comparator) {
      this.tree = new Tree(comparator);
    }
  }

  get length() {
    return this.values().length;
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  set(key: K, value: T) {
    if (!this.has(key)) {
      this.tree.insert(key, value);
    }
    this.map.set(key, value);
  }

  get(key: K, defaultValue?: T): T | undefined {
    const value = this.map.get(key);
    if (value === undefined) {
      return defaultValue === undefined
        ? this.getDefault
          ? this.getDefault()
          : undefined
        : defaultValue;
    }
    return value;
  }

  delete(key: K) {
    this.map.delete(key);
    this.tree.remove(key);
  }

  keys(): K[] {
    return this.tree.keys();
  }

  values(): T[] {
    return this.tree.keys().map(key => this.get(key)!);
  }

  entries(): [K, T][] {
    return this.keys().map(key => {
      const value = this.get(key);
      return [key, value] as [K, T];
    });
  }

  clear() {
    this.map.clear();
    this.tree.clear();
  }
}
