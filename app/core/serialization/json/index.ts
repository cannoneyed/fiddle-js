import 'reflect-metadata';
import { getOrCreateComputed, save, load, canLoadInto } from './helpers';

export const serializablePropsKey = 'SERIALIZABLE_PROPERTIES';
export const computedJsonKey = 'SERIALIZABLE_JSON';

function getJsonComputed(that: any) {
  return getOrCreateComputed(that, computedJsonKey, () => ({
    get() {
      const data: { [key: string]: any } = {};
      const serializableProps = Reflect.getMetadata(serializablePropsKey, that);
      for (const propertyName in serializableProps) {
        data[propertyName] = save(that[propertyName]);
      }
      return data;
    },
    set(data: any) {
      const serializableProps = Reflect.getMetadata(serializablePropsKey, that);
      if (!data || typeof data !== 'object') {
        return;
      }

      for (const propertyName in serializableProps) {
        if (!(propertyName in data)) {
          continue;
        }

        const source = data[propertyName];
        const target = that[propertyName];

        if (source !== null && source !== undefined && canLoadInto(target)) {
          load(target, source);
        } else {
          const desc = Object.getOwnPropertyDescriptor(that, propertyName);
          if (!desc || desc.set || !desc.get) {
            that[propertyName] = source;
          }
        }
      }
    },
  }));
}

export function json<T>(target: T, propertyName: keyof T) {
  const metadata = Reflect.getMetadata(serializablePropsKey, target);
  if (metadata) {
    metadata[propertyName] = true;
  } else {
    Reflect.defineMetadata(serializablePropsKey, { [propertyName]: true }, target);
  }

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
