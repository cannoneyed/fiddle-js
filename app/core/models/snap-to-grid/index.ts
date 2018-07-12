import { action, computed, observable } from 'mobx';

export class SnapToGridValue {
  constructor(public name: string, public divisions: number) {}
}

export class SnapToGridValues {
  readonly snap_1 = new SnapToGridValue('1 bar', 1);
  readonly snap_1_2 = new SnapToGridValue('1/2', 2);
  readonly snap_1_4 = new SnapToGridValue('1/4', 4);
  readonly snap_1_8 = new SnapToGridValue('1/8', 8);
  readonly snap_1_16 = new SnapToGridValue('1/16', 16);
  readonly snap_1_32 = new SnapToGridValue('1/32', 32);
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
  get divisions() {
    return this.value.divisions;
  }

  getDivisionWidth(barWidth: number) {
    return barWidth / this.value.divisions;
  }
}
