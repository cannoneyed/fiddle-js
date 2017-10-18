import { action, computed, observable } from 'mobx'
import { clamp } from 'lodash'
import * as defaults from 'defaults/view'

import sequencerLayout from 'core/stores/sequencer/layout'
import timelineState from 'core/stores/sequencer/state/timeline'
import trackStore from 'core/stores/tracks'

import grid from './grid'
import zoom from './zoom'

interface ISetTracksScroll {
  x?: number
  y?: number
}

class TracksView {
  static mobxLoggerConfig = {
    methods: {
      setTracksScroll: false,
    },
  }

  @observable tracksScrollPercentX = 0
  @observable tracksScrollPercentY = 0

  @action.bound
  setTracksScroll = (tracksScroll: ISetTracksScroll) => {
    const { x, y } = tracksScroll
    if (x !== undefined) {
      this.tracksScrollPercentX = clamp(x, 0, 1)
    }
    if (y !== undefined) {
      this.tracksScrollPercentY = clamp(y, 0, 1)
    }
  }

  // Computed Fields
  @computed
  get trackHeight() {
    return zoom.level.vertical * defaults.trackHeight
  }

  @computed
  get trackWidth() {
    return timelineState.length * grid.barWidth
  }

  @computed
  get tracksHeight() {
    return this.trackHeight * trackStore.trackList.length
  }

  @computed
  get tracksScrollableWidth() {
    return this.trackWidth - sequencerLayout.tracksAreaWidth
  }

  @computed
  get tracksScrollableHeight() {
    return this.tracksHeight - sequencerLayout.tracksAreaHeight
  }

  @computed
  get tracksViewPercentX() {
    const { tracksAreaWidth } = sequencerLayout
    return tracksAreaWidth / this.trackWidth
  }

  @computed
  get tracksScrolledX() {
    return this.tracksScrollableWidth * this.tracksScrollPercentX
  }
}

export default new TracksView()
export { TracksView }
