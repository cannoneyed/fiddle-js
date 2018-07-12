import { action, computed, observable } from 'mobx';

import { Fraction } from 'core/primitives/fraction';

export class SnapToGridValue {
  constructor(public name: string, public division: Fraction) {}
}

export class SnapToGridValues {
  readonly snap_1 = new SnapToGridValue('1 bar', new Fraction(1, 1));
  readonly snap_1_2 = new SnapToGridValue('1/2', new Fraction(1, 2));
  readonly snap_1_4 = new SnapToGridValue('1/4', new Fraction(1, 4));
  readonly snap_1_8 = new SnapToGridValue('1/8', new Fraction(1, 8));
  readonly snap_1_16 = new SnapToGridValue('1/16', new Fraction(1, 16));
  readonly snap_1_32 = new SnapToGridValue('1/32', new Fraction(1, 32));
  readonly [key: string]: SnapToGridValue;
}

export const snapToGridValues = new SnapToGridValues();

export class SnapToGrid {
  @observable value: SnapToGridValue;

  constructor(value: SnapToGridValue = snapToGridValues.snap_1) {
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
}
