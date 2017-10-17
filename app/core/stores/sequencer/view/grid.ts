import { computed } from 'mobx'
import * as defaults from 'defaults/view'

import sequencerState from 'core/stores/sequencer/state'

import sequencerView from './index'

class GridView {
  barsPerGridSegment = 1

  // Computed Fields
  @computed
  get barWidth() {
    return sequencerView.zoom.level.horizontal * defaults.barWidth
  }

  @computed
  get gridCount() {
    const timelineLength = sequencerState.timelineLength
    return timelineLength
  }

  @computed
  get gridSegmentWidth() {
    return this.barWidth * this.barsPerGridSegment
  }
}

export default new GridView()
export { GridView }
