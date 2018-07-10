import { autorun, IReactionDisposer } from 'mobx';

// Automatically manage subscribing / unsubscribing from an observable using autorun
let unsubscribe: IReactionDisposer | null = null;
export const tap = (fn: () => void) => {
  if (unsubscribe) unsubscribe();
  unsubscribe = autorun(fn);
};
