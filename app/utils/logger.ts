import { toJS, isObservable } from 'mobx';

export const initializeLogger = () => {
  const _log = console.log;
  console.log = function() {
    const args = [...arguments].map(arg => {
      try {
        if (isObservable(arg)) {
          return makeMobxLoggable(arg);
        }
      } catch (err) {
        return arg;
      }
      return arg;
    });
    _log.apply(null, args);
  };
};

function makeMobxLoggable(arg: any) {
  const converted = toJS(arg);
  if (arg.constructor) {
    const { name } = arg.constructor;
    const code = `class ${name} {}; instance = new ${name}()`;
    let instance: any = {};
    eval(code);
    for (const key in converted) {
      instance[key] = converted[key];
    }
    return instance;
  }
  return converted;
}
