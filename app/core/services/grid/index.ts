import { Service } from 'libs/typedi';

import { Fraction } from 'core/primitives/fraction';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { SnapToGrid, snapToGridValues } from 'core/models/snap-to-grid';
import { Timeline } from 'core/models/timeline';

export enum DivisionType {
  primary,
  secondary,
  tertiary,
  quaternary,
}

@Service()
export default class __GridService {
  getNearestSnapPosition = (timeline: Timeline, offsetX: number, snapToGrid: SnapToGrid) => {
    const isAuto = snapToGrid.value === snapToGridValues.snap_auto;
    const division = isAuto ? timeline.division : snapToGrid.division;
    const divisionWidth = isAuto
      ? timeline.divisionWidth
      : division.divide(timeline.division).multiplyScalar(timeline.divisionWidth);

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

    const nearestBar = new TimelineVector(bar);
    const nearestBeats = TimelineVector.fromFraction(beats);
    return nearestBar.add(nearestBeats);
  };

  getDivisionType(division: Fraction): DivisionType {
    return DivisionType.primary;
  }
}
