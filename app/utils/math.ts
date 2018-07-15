export interface DivideIntWithRemainder {
  int: number;
  remainder: number;
}

export const divideIntWithRemainder = (n: number, d: number): DivideIntWithRemainder => {
  const int = Math.floor(n / d);
  const remainder = n % d;
  return { int, remainder };
};
