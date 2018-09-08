import { SortedMap } from 'libs/sorted-map';

describe('Sorted Map', () => {
  it('inserts values', () => {
    const sortedMap = new SortedMap<number, string>();
    sortedMap.set(10, 'hey');
    expect(sortedMap.get(10)).toEqual('hey');
  });

  it('has a length property', () => {
    const sortedMap = new SortedMap<number, string>();
    expect(sortedMap.length).toEqual(0);
    sortedMap.set(10, 'hey');
    expect(sortedMap.length).toEqual(1);
  });

  it('returns undefined when no value present', () => {
    const sortedMap = new SortedMap<number, string>();
    sortedMap.set(10, 'hey');
    expect(sortedMap.get(20)).toEqual(undefined);
  });

  it('overwrites values at the same key', () => {
    const sortedMap = new SortedMap<number, string>();
    sortedMap.set(10, 'hey');
    sortedMap.set(10, 'ho');
    expect(sortedMap.get(10)).toEqual('ho');
  });

  it('gets a default value', () => {
    const sortedMap = new SortedMap<number, string>();
    expect(sortedMap.get(10, 'ho')).toEqual('ho');
  });

  it('has a "has" method', () => {
    const sortedMap = new SortedMap<number, string>();
    expect(sortedMap.has(10)).toEqual(false);
    sortedMap.set(10, 'yo');
    expect(sortedMap.has(10)).toEqual(true);
  });

  it('has a "delete" method', () => {
    const sortedMap = new SortedMap<number, string>();
    sortedMap.set(10, 'yo');
    expect(sortedMap.has(10)).toEqual(true);
    sortedMap.delete(10);
    expect(sortedMap.has(10)).toEqual(false);
  });

  it('has a "keys" method that returns sorted keys', () => {
    const sortedMap = new SortedMap<number, string>();
    sortedMap.set(10, 'a');
    sortedMap.set(80, 'c');
    sortedMap.set(50, 'b');
    expect(sortedMap.keys()).toEqual([10, 50, 80]);
  });

  it('has a "values" method that returns sorted values', () => {
    const sortedMap = new SortedMap<number, string>();
    sortedMap.set(10, 'a');
    sortedMap.set(80, 'c');
    sortedMap.set(50, 'b');
    expect(sortedMap.values()).toEqual(['a', 'b', 'c']);
  });

  it('has an "entries" method that returns sorted entries', () => {
    const sortedMap = new SortedMap<number, string>();
    sortedMap.set(10, 'a');
    sortedMap.set(80, 'c');
    sortedMap.set(50, 'b');
    expect(sortedMap.entries()).toEqual([[10, 'a'], [50, 'b'], [80, 'c']]);
  });

  it('has a "clear" method', () => {
    const sortedMap = new SortedMap<number, string>();
    sortedMap.set(10, 'a');
    sortedMap.set(80, 'c');
    sortedMap.set(50, 'b');
    expect(sortedMap.length).toEqual(3);
    sortedMap.clear();
    expect(sortedMap.length).toEqual(0);
  });
});
