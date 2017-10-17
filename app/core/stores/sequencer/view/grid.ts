import { computed } from 'mobx'
import * as defaults from 'defaults/view'

import timeline from 'core/stores/sequencer/state/timeline'

import zoom from './zoom'

class GridView {
  barsPerGridSegment = 1

  // Computed Fields
  @computed
  get barWidth() {
    return zoom.level.horizontal * defaults.barWidth
  }

  @computed
  get gridCount() {
    return timeline.length
  }

  @computed
  get gridSegmentWidth() {
    return this.barWidth * this.barsPerGridSegment
  }
}

export default new GridView()
export { GridView }
