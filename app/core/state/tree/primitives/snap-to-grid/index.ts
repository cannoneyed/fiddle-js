import { Simple } from 'mobx-keystone';
import { computed } from 'mobx';
import { Fraction, FractionSnapshot } from 'core/state/tree/primitives/fraction';
import { TimelineVector } from 'core/state/tree/primitives/timeline-vector';

export interface SnapToGridSnapshot {
  readonly value: SnapToGridValueSnapshot;
}

export interface SnapToGridValueSnapshot {
  readonly name: string;
  readonly key: string;
  readonly division: FractionSnapshot;
}

export class SnapToGridValue extends Simple<SnapToGridValueSnapshot> {
  constructor(
    public readonly name: string,
    public readonly key: string,
    public readonly division: Fraction
  ) {
    super();
    this.initialSnapshot();
  }

  toSnapshot() {
    return { name: this.name, key: this.key, division: this.division.toSnapshot() };
  }

  static fromSnapshot(snapshot: SnapToGridValueSnapshot) {
    const { name, key } = snapshot;
    const division = Fraction.fromSnapshot(snapshot.division);
    return new SnapToGridValue(name, key, division);
  }
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
}

export const snapToGridValues = new SnapToGridValues();

export class SnapToGrid extends Simple<SnapToGridSnapshot> {
  constructor(public readonly value: SnapToGridValue = snapToGridValues.snap_auto) {
    super();
    this.initialSnapshot();
  }

  toSnapshot() {
    return { value: this.value };
  }

  static fromSnapshot(snapshot: SnapToGridSnapshot) {
    const snapToGridValue = SnapToGridValue.fromSnapshot(snapshot.value);
    return new SnapToGrid(snapToGridValue);
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
