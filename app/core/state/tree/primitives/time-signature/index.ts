import { Simple } from 'mobx-keystone';

export interface TimeSignatureSnapshot {
  readonly numerator: number;
  readonly denominator: number;
}

export class TimeSignature extends Simple<TimeSignatureSnapshot> {
  constructor(public readonly numerator = 4, public readonly denominator = 4) {
    super();
    this.initialSnapshot();
  }

  toSnapshot() {
    return { numerator: this.numerator, denominator: this.denominator };
  }

  static fromSnapshot(snapshot: TimeSignatureSnapshot) {
    return new TimeSignature(snapshot.numerator, snapshot.denominator);
  }
}
