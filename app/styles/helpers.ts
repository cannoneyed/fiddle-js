import { Numeric } from 'core/primitives/numeric';

abstract class NumberSuffix extends Numeric {
  suffix: string;
  constructor(number: number) {
    super(number);
  }
  toString = () => `${this.number}${this.suffix}`;
}

export class Px extends NumberSuffix {
  suffix = 'px';
}

export class Percent extends NumberSuffix {
  suffix = '%';
}

export const px = (number: number) => new Px(number);
export const percent = (number: number) => new Percent(number);
