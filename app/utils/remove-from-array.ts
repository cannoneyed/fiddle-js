export function removeFromArray<T>(arr: T[], predicate: (item: T) => boolean): T[];
export function removeFromArray<T>(arr: T[], item: T): T[];
export function removeFromArray<T>(arr: T[], b: (item: T, index?: number) => boolean | T): T[] {
  if (typeof b === 'function') {
    return arr.filter(b);
  } else {
    return arr.filter(other => other !== b);
  }
}
