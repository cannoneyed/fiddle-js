import { computed, observable } from 'mobx';
// import { Fraction } from 'core/primitives/fraction';
import { TimeSignature } from 'core/primitives/time-signature';

const DEFAULT_PRIMARY_DIVISION_WIDTH = 100;
const MIN_DIVISION_WIDTH = 15;
const MAX_DIVISION_WIDTH = 25;

export class Timeline {
  @observable
  timeSignature: TimeSignature;

  @observable
  length: number;

  @observable
  primaryDivisionWidth = DEFAULT_PRIMARY_DIVISION_WIDTH;

  constructor(length = 64, timeSignature = new TimeSignature()) {
    this.length = length;
    this.timeSignature = timeSignature;
  }

  @computed
  get firstDivision(): number {
    const numerator = this.timeSignature.numerator;
    for (let i = 2; i < numerator; i++) {
      if (numerator % i === 0) return i;
    }
    return numerator;
  }

  @computed
  get divisionIndex(): number {
    let divisionIndex = 0;
    let divisionWidth = this.primaryDivisionWidth;
    const firstDivision = this.firstDivision;

    // If the current bar width is greater than minimum divison width, we need to increase our division size
    if (divisionWidth < MIN_DIVISION_WIDTH) {
      while (divisionWidth < MIN_DIVISION_WIDTH) {
        divisionWidth = divisionWidth * 2;
        divisionIndex += 1;
      }
    } else if (divisionWidth > MAX_DIVISION_WIDTH) {
      while (divisionWidth > MAX_DIVISION_WIDTH) {
        const divisor = divisionIndex === 0 ? firstDivision : 2;
        divisionWidth = divisionWidth / divisor;
        divisionIndex -= 1;
      }
    }
    return divisionIndex;
  }
}
