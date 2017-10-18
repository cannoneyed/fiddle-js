import { action, computed, observable } from 'mobx'

export class SnapToGridValue {
  constructor(public name: string, public divisions?: number) {}
}

class SnapToGridValues {
  readonly snap_1 = new SnapToGridValue('1 bar', 1)
  readonly snap_1_2 = new SnapToGridValue('1/2', 2)
  readonly snap_1_4 = new SnapToGridValue('1/4', 4)
  readonly snap_1_8 = new SnapToGridValue('1/8', 8)
  readonly snap_1_16 = new SnapToGridValue('1/16', 16)
  readonly snap_1_32 = new SnapToGridValue('1/32', 32)
  readonly snap_auto = new SnapToGridValue('auto')
  readonly snap_free = new SnapToGridValue('free')
  readonly [key: string]: SnapToGridValue
}

export const snapToGridValues = new SnapToGridValues()

class SnapToGrid {
  @observable value: SnapToGridValue

  constructor(value: SnapToGridValue = snapToGridValues.snap_1) {
    this.value = value
  }

  @action
  setSnapToGridValue(valueOrKey: SnapToGridValue | string | number) {
    if (valueOrKey) {
      if (valueOrKey instanceof SnapToGridValue) {
        this.value = valueOrKey
      } else {
        this.value = snapToGridValues[valueOrKey]
      }
    }
  }

  @computed
  get divisions() {
    const divisions = this.value.divisions
    return divisions === undefined ? 0 : divisions
  }

  getDivisionWidth(barWidth: number) {
    if (this.value.divisions) {
      return barWidth / this.value.divisions
    } else {
      return barWidth
    }
  }

  @computed
  get free() {
    return this.value === snapToGridValues.snap_free
  }

  @computed
  get auto() {
    return this.value === snapToGridValues.snap_auto
  }
}

export default SnapToGrid
