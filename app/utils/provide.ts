import { inject } from 'mobx-react';
import { Container, Token } from 'typedi';

export function provide<T, K extends keyof T>(
  ComponentClass: React.ComponentType<T>,
  toInject: Partial<{ [field in keyof T]: Token<any> }>
): React.ComponentType<Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>> {
  let injectedProps: Partial<{ [field in keyof T]: Token<any> }> = {};
  for (const name in toInject) {
    const Token = toInject[name];
    injectedProps[name] = Container.get(Token!);
  }

  return inject(() => injectedProps)(ComponentClass);
}
