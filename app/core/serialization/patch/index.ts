import 'reflect-metadata';
import {
  IArrayChange,
  IArraySplice,
  isObservableArray,
  isObservableMap,
  isObservableObject,
  IObjectWillChange,
  IValueDidChange,
  ObservableMap,
  intercept,
} from 'mobx';
import { serializablePropsKey } from 'core/serialization/json';

export interface IMapChange<K, T> {
  object: ObservableMap<K, T>;
  type: 'update' | 'add' | 'delete';
  name: K;
  newValue?: any;
  oldValue?: any;
}

export { toJSONPatch } from './patch';

export interface IDeepObserverMetadata {
  observerId: string;
  path: string;
}

const diffObserversKey = 'DEEP_OBSERVERS';

/* specs
* 1- Model decorator should have a name.
* 2- The Model decorator can detect a leaf.
* 3- The model decorator can detect a node.
* 4- When encounter a map or a hash, he model decorator create a child node
* 5- We can retrieve the parent of a node
* 6- We can retrieve the children of a node
*/

/**
 * Retrieve the path stored into the metadata
 * @param object
 * @param observerId
 * @param key
 * @return {string|null}
 */
function getPath(object: any, observerId: string, key?: string): string {
  const metadata = key
    ? Reflect.getMetadata(diffObserversKey, object, key)
    : Reflect.getMetadata(diffObserversKey, object);

  return metadata
    ? metadata.find((meta: IDeepObserverMetadata) => meta.observerId === observerId).path
    : '';
}

export function getObservableType(object: any): string {
  if (typeof object !== 'object' || !object || !object.constructor) {
    return '';
  }
  if (object.constructor.name === 'ObservableMap') {
    return isObservableMap(object) ? 'map' : '';
  } else if (object.constructor.name === 'ObservableArray') {
    return isObservableArray(object) ? 'array' : '';
  } else {
    return isObservableObject(object) ? 'object' : '';
  }
}

type Change =
  | IMapChange<string, any>
  | IArraySplice<any>
  | IArrayChange<any>
  | IObjectWillChange
  | IValueDidChange<any>;

// TODO: instead using Math.random, should use Mobx observer registration to make sure the ID does not exist.
function _diffObserve<T>(
  object: any,
  listener: (change: Change, type: string, path: string) => void,
  path: string = '',
  observerId: string
): void {
  // Guess the type of observable
  const observableType = getObservableType(object);

  // Not an observable key
  if (!observableType) {
    return;
  }
  // Already treated, detect circle dependencies in graphs
  const metadata = Reflect.getMetadata(diffObserversKey, object);
  if (metadata && metadata.find((o: IDeepObserverMetadata) => o.observerId === observerId)) return;

  // Set observers recursively
  // Add the observer ID and the path of the current property from the root.
  // This means that the same object could be used in different graph or/and with different observers.
  const obsMetaData = { observerId, path };

  if (metadata) metadata.push(obsMetaData);
  else Reflect.defineMetadata(diffObserversKey, [obsMetaData], object);

  const serializableProps = Reflect.getMetadata(serializablePropsKey, object) || {};

  switch (observableType) {
    case 'map':
      intercept(object, (change: IMapChange<string, any>) => {
        switch (change.type) {
          case 'add':
            _diffObserve(change.newValue, listener, path + '/' + change.name, observerId);
            break;
          case 'update':
            _diffObserve(change.newValue, listener, path + '/' + change.name, observerId);
            // TODO: remove the observer of the old value
            break;
        }
        listener(
          change as IMapChange<string, any>,
          observableType,
          getPath(object, observerId) + '/' + change.name
        );
        return change;
      });
      object.forEach((value: any, key: string) =>
        _diffObserve(value, listener, path + '/' + key, observerId)
      );
      break;
    case 'array':
      intercept(object, (change: IArraySplice<any> | IArrayChange<any>) => {
        switch (change.type) {
          case 'splice':
            if (change.addedCount) {
              change.added.forEach((value, index) => {
                _diffObserve(value, listener, path + '/' + (change.index + index), observerId);
                listener(
                  change as IArraySplice<any>,
                  observableType,
                  getPath(object, observerId) + '/' + (change.index + index)
                );
              });
            } else if (change.removedCount) {
              // TODO: remove the observer of the old value
              change.removed.forEach((value, index) => {
                listener(
                  change as IArraySplice<any>,
                  observableType,
                  getPath(object, observerId) + '/' + (change.index + index)
                );
              });
            }
            break;
          case 'update':
            // TODO: remove the observer of the old value
            _diffObserve(change.newValue, listener, path + '/' + change.index, observerId);
            listener(
              change as IArrayChange<any>,
              observableType,
              getPath(object, observerId) + '/' + change.index
            );
            break;
        }
        return change;
      });
      object.forEach((obj: any, index: number) =>
        _diffObserve(obj, listener, path + '/' + index, observerId)
      );
      break;
    case 'object':
      intercept(object, (change: IObjectWillChange) => {
        if (!(change.name in serializableProps)) {
          return change;
        }
        switch (change.type) {
          case 'add':
            listener(change, 'object', getPath(object, observerId) + '/' + change.name);
            break;
          case 'update':
            listener(change, 'object', getPath(object, observerId) + '/' + change.name);
        }
        if (change.type !== 'remove') {
          _diffObserve(change.newValue, listener, path + '/' + change.name, observerId);
        }
        return change;
      });

      // Observe the json-serializable data in each object
      for (const key in serializableProps) {
        _diffObserve(object[key], listener, path + '/' + key, observerId);
      }
  }
}

/**
 * Wrapper to prevent the user to give an observer ID.
 * @param object
 * @param {(change: IValueDidChange<T>, path: string) => void} listener A listener which takes a change object at first argument and the path of the node
 * at second argument
 * @param {string} parentPath the path of the parent node
 */
export function diffObserve<T>(
  object: any,
  listener: (change: IValueDidChange<T>, type: string, path?: string) => void,
  parentPath = ''
) {
  _diffObserve(object, listener, parentPath, 'diffObserver@' + Math.ceil(Math.random() * 10000));
}

export function DiffObserver<T>(
  listener: (change: IValueDidChange<T>, type: string, path?: string) => void
) {
  return function(target: any) {
    const newConstructor = function(this: any, ...args: any[]) {
      target.apply(this, args);
      diffObserve(this, listener, target.name);
    };

    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = target;
    return <any>newConstructor;
  };
}
