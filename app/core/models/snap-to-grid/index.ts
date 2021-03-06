import { action, computed, observable } from 'mobx';

import { Fraction } from 'core/primitives/fraction';
import { TimelineVector } from 'core/primitives/timeline-vector';

export class SnapToGridValue {
  constructor(public name: string, public key: string, public division: Fraction) {}
}

export class AutoSnapToGrid extends SnapToGridValue {
  constructor() {
    super('auto', 'snap_auto', new Fraction(1, 1));
  }
}

export class SnapToGridValues {
  readonly snap_1 = new SnapToGridValue('1 bar', 'snap_1', new Fraction(1, 1));
  readonly snap_1_2 = new SnapToGridValue('1/2', 'snap_1_2', new Fraction(1, 2));
  readonly snap_1_4 = new SnapToGridValue('1/4', 'snap_1_4', new Fraction(1, 4));
  readonly snap_1_8 = new SnapToGridValue('1/8', 'snap_1_8', new Fraction(1, 8));
  readonly snap_1_16 = new SnapToGridValue('1/16', 'snap_1_16', new Fraction(1, 16));
  readonly snap_1_32 = new SnapToGridValue('1/32', 'snap_1_32', new Fraction(1, 32));
  readonly snap_auto = new AutoSnapToGrid();
  readonly [key: string]: SnapToGridValue;
}

export const snapToGridValues = new SnapToGridValues();

export class SnapToGrid {
  @observable
  value: SnapToGridValue;

  constructor(value: SnapToGridValue = snapToGridValues.snap_auto) {
    this.value = value;
  }

  @action
  setSnapToGridValue(value: SnapToGridValue) {
    this.value = value;
  }

  @computed
  get division() {
    return this.value.division;
  }

  static getDivisionWidth(length: TimelineVector, width: number, snapToGrid: SnapToGrid) {
    const { divisions } = TimelineVector.getNDivisions(length, snapToGrid.division);
    const gridSegmentWidth = width / divisions;
    return gridSegmentWidth;
  }
}
