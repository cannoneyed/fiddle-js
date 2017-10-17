import { action, computed, observable } from 'mobx'

export class SnapToGridValue {
  constructor(public name: string, public value: number | string) {}
}

class SnapToGridValues {
  readonly snap_1 = new SnapToGridValue('1 bar', 1)
  readonly snap_1_2 = new SnapToGridValue('1/2', 2)
  readonly snap_1_4 = new SnapToGridValue('1/4', 4)
  readonly snap_1_8 = new SnapToGridValue('1/8', 8)
  readonly snap_1_16 = new SnapToGridValue('1/16', 16)
  readonly snap_1_32 = new SnapToGridValue('1/32', 32)
  readonly snap_auto = new SnapToGridValue('auto', 'auto')
  readonly snap_free = new SnapToGridValue('free', 'free')
  readonly [key: string]: SnapToGridValue
}

export const snapToGridValues = new SnapToGridValues()

class SnapToGrid {
  @observable snap: SnapToGridValue

  constructor(snap: SnapToGridValue = snapToGridValues.snap_1) {
    this.snap = snap
  }

  @action
  setSnapToGridValue(snap: SnapToGridValue) {
    this.snap = snap
  }

  @computed
  get division() {
    const value = this.snap.value
    return typeof value === 'number' ? value : 0
  }

  @computed
  get free() {
    return this.snap === snapToGridValues.snap_free
  }

  @computed
  get auto() {
    return this.snap === snapToGridValues.snap_auto
  }
}

export default SnapToGrid
