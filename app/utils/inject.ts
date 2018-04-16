import { inject as injectMobx } from 'mobx-react';

export function inject<T, K extends keyof T>(
  ComponentClass: React.ComponentType<T>,
  ...stores: K[]
): React.ComponentType<Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>> {
  return injectMobx(...stores)(ComponentClass);
}
