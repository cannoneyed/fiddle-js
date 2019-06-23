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
export default class GridService {
  private computeDivisionWidth(timeline: Timeline, snapToGrid: SnapToGrid) {
    const { barWidth } = timeline;
    return snapToGrid.division.multiplyScalar(barWidth);
  }

  getNearestSnapPosition = (
    timeline: Timeline,
    offsetX: number,
    snapToGrid: SnapToGrid
  ): TimelineVector => {
    // TODO: Figure out the way to handle timelines with arbitrary changes in time signature
    const isAuto = snapToGrid.value === snapToGridValues.snap_auto;
    const division = isAuto ? timeline.division : snapToGrid.division;
    const divisionWidth = isAuto
      ? timeline.divisionWidth
      : this.computeDivisionWidth(timeline, snapToGrid);

    const prevDivision = Math.floor(offsetX / divisionWidth);
    const nextDivision = prevDivision + 1;

    const prevDifference = offsetX - prevDivision * divisionWidth;
    const nextDifference = nextDivision * divisionWidth - offsetX;
    const closestDivision = nextDifference > prevDifference ? prevDivision : nextDivision;

    const position = division.multiply(closestDivision, 1);
    let { number: bars, fraction: barFraction } = position.mixedNumber();

    if (bars < 0) {
      return new TimelineVector(0);
    }

    const barVector = new TimelineVector(bars);
    const beatsVector = TimelineVector.fromFraction(barFraction, timeline.timeSignature);
    const result = barVector.add(beatsVector);

    if (result.absoluteTicks < 0) {
      return new TimelineVector();
    } else {
      return result;
    }
  };

  getDivisionType(division: Fraction): DivisionType {
    return DivisionType.primary;
  }
}
