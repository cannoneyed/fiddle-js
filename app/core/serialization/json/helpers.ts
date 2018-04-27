import {
  computed,
  IComputedValue,
  IObservableArray,
  isObservableArray,
  isObservableMap,
  ObservableMap,
} from 'mobx';

interface Pojo {
  [key: string]: any;
}

const hasOwnProperty = (obj: any, key: string) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export function getOrCreateComputed(
  obj: any,
  key: string,
  options: () => { get(): any; set(data: any): void }
) {
  let result: IComputedValue<any>;
  if (!hasOwnProperty(obj, key)) {
    const { get, set } = options();
    obj[key] = result = computed(get, set);
  } else {
    result = obj[key];
  }
  return result;
}

export function isMap(obj: any) {
  return obj instanceof Map || isObservableMap(obj);
}

export function isArray(obj: any) {
  return Array.isArray(obj) || isObservableArray(obj);
}

export function hasJsonProperty(obj: any) {
  return obj && typeof obj === 'object' && 'json' in obj;
}

export function canLoadInto(obj: any) {
  return hasJsonProperty(obj) || (obj && isArray(obj));
}

export function saveObservableArray(obj: IObservableArray) {
  const arr: any[] = obj.map((value, key) => {
    const json = value.json;
    return json ? json : value;
  });
  return arr;
}

export function saveObservableMap(obj: ObservableMap) {
  const pojo: Pojo = {};
  obj.forEach((value, key) => {
    if (value.json) {
      pojo[key] = value.json;
    }
  });
  return pojo;
}

export function save(obj: any): any {
  if (isObservableMap(obj)) {
    return saveObservableMap(obj);
  }
  if (isObservableArray(obj)) {
    return saveObservableArray(obj);
  }

  return hasJsonProperty(obj) ? obj.json : obj;
}

export function load(obj: any, data: any) {
  if (data === 'undefined' || !obj) {
    return;
  }

  if (!canLoadInto(obj)) {
    throw new Error('Can only load JSON into an object with a json property, or an array');
  }

  if (hasJsonProperty(obj)) {
    obj.json = data;
    return;
  }

  if (isArray(obj)) {
    // Plain array data, so just replace everything
    if (isArray(data)) {
      obj.splice.apply(obj, [0, obj.length].concat(data));
    } else {
      obj.length = 0;
    }
    return;
  }
}
