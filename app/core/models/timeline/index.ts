import { action, computed, observable } from 'mobx';
import { first, last, range } from 'lodash';

import { Fraction } from 'core/primitives/fraction';
import { TimeSignature } from 'core/primitives/time-signature';
import { TimelineVector } from 'core/primitives/timeline-vector';

export const DEFAULT_PRIMARY_WIDTH = 25;
export const ZOOM_FACTOR = 1.5;

const MIN_DIVISION_WIDTH = 15;
const MAX_DIVISION_WIDTH = 25;

export class Timeline {
  @observable
  timeSignature: TimeSignature;

  @observable
  length: TimelineVector;

  @observable
  primaryWidth = DEFAULT_PRIMARY_WIDTH;

  @computed
  get barWidth() {
    return this.primaryWidth * this.timeSignature.numerator;
  }

  constructor(length = new TimelineVector(64), timeSignature = new TimeSignature()) {
    this.length = length;
    this.timeSignature = timeSignature;
  }

  private getInitialFraction(): Fraction {
    const numerator = this.timeSignature.numerator;
    for (let i = 2; i <= numerator; i++) {
      if (numerator % i === 0) return new Fraction(1, i);
    }
    return new Fraction(1, 2);
  }

  @computed
  get segmentDivisions(): Fraction[] {
    const divisions: Fraction[] = [];
    let division = new Fraction(1, 1);
    let fraction = this.getInitialFraction();
    let divisionWidth = this.barWidth;

    if (divisionWidth >= MAX_DIVISION_WIDTH) {
      divisions.push(division);
      while (divisionWidth >= MAX_DIVISION_WIDTH) {
        division = division.multiply(fraction);
        divisionWidth = division.multiplyScalar(this.barWidth);
        if (divisionWidth >= MIN_DIVISION_WIDTH) {
          divisions.push(division);
        }
        fraction = new Fraction(1, 2);
      }
    } else {
      fraction = new Fraction(2, 1);
      if (divisionWidth >= MIN_DIVISION_WIDTH) {
        divisions.unshift(division);
      }
      while (divisionWidth < MAX_DIVISION_WIDTH) {
        division = division.multiply(fraction);
        divisionWidth = division.multiplyScalar(this.barWidth);
        if (divisionWidth >= MIN_DIVISION_WIDTH) {
          divisions.unshift(division);
        }
      }
    }

    // Convert from the array of division types into an array of each division marking.
    const firstDivision = first(divisions) || new Fraction(1, 1);
    const lastDivision = last(divisions) || new Fraction(1, 1);
    const nDivisions = firstDivision.divide(lastDivision).reduce().numerator;
    const segmentDivisions: Fraction[] = range(nDivisions).map(() => lastDivision.copy());
    for (let i = divisions.length - 2; i > 0; i--) {
      const fraction = divisions[i];
      const ratio = fraction.divide(firstDivision);
      const division = ratio.multiplyScalar(nDivisions);
      for (let j = 0; j < nDivisions; j += division) {
        segmentDivisions[j] = fraction.copy();
      }
    }
    segmentDivisions[0] = divisions[0];
    return segmentDivisions;
  }

  private getFirstDivision(): Fraction {
    return this.segmentDivisions[0] || new Fraction(1, 1);
  }

  @computed
  get segmentWidth(): number {
    const firstDivision = this.getFirstDivision();
    return firstDivision.multiplyScalar(this.barWidth);
  }

  @computed
  get divisionWidth(): number {
    return this.segmentWidth / this.segmentDivisions.length;
  }

  // TODO Fix legacy snap to grid implementation
  @computed
  get division(): Fraction {
    return last(this.segmentDivisions) || new Fraction(1, 1);
  }

  @computed
  get barsPerSegment(): number {
    const firstDivision = this.getFirstDivision();
    return firstDivision.numerator;
  }

  @action
  zoomIn() {
    this.primaryWidth = this.primaryWidth * ZOOM_FACTOR;
  }

  @action
  zoomOut() {
    this.primaryWidth = this.primaryWidth / ZOOM_FACTOR;
  }

  @action
  fitToWidth(width: number, length: TimelineVector = this.length) {
    const bars = length.bars;
    const barWidth = width / bars;
    this.primaryWidth = barWidth / this.timeSignature.numerator;
  }
}
