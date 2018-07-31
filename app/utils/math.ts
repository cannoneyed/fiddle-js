export interface DivideIntWithRemainder {
  int: number;
  remainder: number;
}

export const divideIntWithRemainder = (n: number, d: number): DivideIntWithRemainder => {
  const int = Math.floor(n / d);
  const remainder = n % d;
  return { int, remainder };
};

// Computes the "floor" of either a positive or negative number as the
// next integer closest to zero.
export const absFloor = (n: number) => {
  return n < 0 ? Math.ceil(n) : Math.floor(n);
};
