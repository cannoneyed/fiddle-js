import { observable } from 'mobx';

export class TimeSignature {
  @observable
  numerator: number;
  @observable
  denominator: number;

  constructor(numerator = 4, denominator = 4) {
    this.numerator = numerator;
    this.denominator = denominator;
  }

  static serialize(timeSignature: TimeSignature): SerializedTimeSignature {
    return {
      numerator: timeSignature.numerator,
      denominator: timeSignature.denominator,
    };
  }

  static deserialize(serialized: SerializedTimeSignature) {
    const { numerator, denominator } = serialized;
    return new TimeSignature(numerator, denominator);
  }
}

export interface SerializedTimeSignature {
  numerator: number;
  denominator: number;
}
