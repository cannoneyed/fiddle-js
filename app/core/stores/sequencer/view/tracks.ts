import { action, computed, observable } from 'mobx'
import { clamp } from 'lodash'
import * as defaults from 'defaults/view'

import sequencerLayoutStore from 'core/stores/sequencer/layout'
import sequencerState from 'core/stores/sequencer/state'
import trackStore from 'core/stores/tracks'

import sequencerView from './index'

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
  get barWidth() {
    return sequencerView.zoom.level.horizontal * defaults.barWidth
  }

  @computed
  get trackHeight() {
    return sequencerView.zoom.level.vertical * defaults.trackHeight
  }

  @computed
  get trackWidth() {
    return this.gridCount * this.barWidth
  }

  @computed
  get tracksHeight() {
    return this.trackHeight * trackStore.trackList.length
  }

  @computed
  get tracksScrollableWidth() {
    return this.trackWidth - sequencerLayoutStore.tracksAreaWidth
  }

  @computed
  get tracksScrollableHeight() {
    return this.tracksHeight - sequencerLayoutStore.tracksAreaHeight
  }

  @computed
  get gridCount() {
    const timelineLength = sequencerState.timelineLength
    return timelineLength
  }

  @computed
  get tracksViewPercentX() {
    const { tracksAreaWidth } = sequencerLayoutStore
    return tracksAreaWidth / this.trackWidth
  }
}

export default new TracksView()
export { TracksView }
