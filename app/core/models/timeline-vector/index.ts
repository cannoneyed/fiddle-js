export const prefixModule = 'prefixModule'

import gridView from 'core/stores/sequencer/view/grid'

class TimelineVector {
  bar: number

  get offsetX() {
    return this.bar * gridView.barWidth
  }

  constructor(bar = 0) {
    this.bar = bar
  }
}

export default TimelineVector
