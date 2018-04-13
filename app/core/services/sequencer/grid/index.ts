import { Fraction } from 'core/classes/fraction';
import { TimelineVector } from 'core/classes/timeline-vector';

import { gridView } from 'core/stores/sequencer/view/grid';

export enum DivisionType {
  primary,
  secondary,
  tertiary,
  quaternary,
}

export class GridService {
  getNearestSnapPosition = (offsetX: number) => {
    const { divisionWidth, division } = gridView;

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

export const gridService = new GridService();
