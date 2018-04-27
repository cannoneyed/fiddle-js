import { getOrCreateComputed, save, load, canLoadInto } from './helpers';

const serializablePropsKey = 'SERIALIZABLE_PROPERTIES';
const computedJsonKey = 'SERIALIZABLE_JSON';

function getJsonComputed(that: any) {
  return getOrCreateComputed(that, computedJsonKey, () => ({
    get(this: any) {
      const data: { [key: string]: any } = {};
      for (const propertyName of that[serializablePropsKey]) {
        data[propertyName] = save(that[propertyName]);
      }
      return data;
    },
    set(this: any, data: any) {
      if (!data || typeof data !== 'object') {
        return;
      }

      for (const propertyName of this[serializablePropsKey]) {
        if (!(propertyName in data)) {
          continue;
        }

        const source = data[propertyName];
        const target = this[propertyName];

        if (source !== null && source !== undefined && canLoadInto(target)) {
          load(target, source);
        } else {
          const desc = Object.getOwnPropertyDescriptor(this, propertyName);
          if (!desc || desc.set || !desc.get) {
            this[propertyName] = source;
          }
        }
      }
    },
  }));
}

function jsonImpl<T>(target: T, propertyName: keyof T) {
  if (Object.prototype.hasOwnProperty.call(target, serializablePropsKey)) {
    (target as any)[serializablePropsKey].push(propertyName);
    return;
  }

  Object.defineProperty(target, serializablePropsKey, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: [propertyName],
  });

  if (!Object.prototype.hasOwnProperty.call(target, 'json')) {
    Object.defineProperty(target, 'json', {
      get(this: T) {
        return getJsonComputed(this).get();
      },
      set(this: T, data: any) {
        getJsonComputed(this).set(data);
      },
    });
  }
}

export const json = Object.assign(jsonImpl, { load, save });
