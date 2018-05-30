import { Service } from 'typedi';

import { Fraction } from 'core/primitives/fraction';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { GridLayout } from 'core/layouts/sequencer/grid';

export enum DivisionType {
  primary,
  secondary,
  tertiary,
  quaternary,
}

@Service()
export class GridService {
  constructor(private gridLayout: GridLayout) {}

  getNearestSnapPosition = (offsetX: number) => {
    const { divisionWidth, division } = this.gridLayout;

    const prevDivision = Math.floor(offsetX / divisionWidth);
    const nextDivision = prevDivision + 1;

    const prevDifference = offsetX - prevDivision * divisionWidth;
    const nextDifference = nextDivision * divisionWidth - offsetX;
    const closestDivision = nextDifference > prevDifference ? prevDivision : nextDivision;

    const position = division.multiply(closestDivision, 1);
    let bar = Math.floor(position.numerator / position.denominator);
    let beats = position.subtract(position.denominator * bar, position.denominator);

    if (bar < 0) {
      bar = 0;
      beats = position.multiply(0, 1);
    }

    return new TimelineVector(bar, beats);
  };

  getDivisionType(division: Fraction): DivisionType {
    return DivisionType.primary;
  }
}
