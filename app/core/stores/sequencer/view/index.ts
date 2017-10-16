import { action, computed, observable } from 'mobx'
import { clamp } from 'lodash'

import sequencerLayoutStore from 'core/stores/sequencer/layout'
import sequencerState from 'core/stores/sequencer/state'
import trackStore from 'core/stores/tracks'

import ZoomLevel from 'core/models/zoom-level'

interface ISetTracksScroll {
  x?: number
  y?: number
}

class SequencerViewStore {
  static mobxLoggerConfig = {
    methods: {
      setTracksScroll: false,
    },
  }

  defaultBarWidth = 50
  barsPerGridSegment = 1

  defaultTrackHeight = 50

  @observable zoomLevel = new ZoomLevel()
  @observable playheadPosition = 0

  @observable tracksScrollPercentX = 0
  @observable tracksScrollPercentY = 0

  // Actions
  @action.bound
  zoomInHorizontal = () => {
    this.zoomLevel.zoomInHorizontal()
  }

  @action.bound
  zoomOutHorizontal = () => {
    this.zoomLevel.zoomOutHorizontal()
  }

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
    return this.zoomLevel.horizontal * this.defaultBarWidth
  }

  @computed
  get gridSegmentWidth() {
    return this.barWidth * this.barsPerGridSegment
  }

  @computed
  get trackHeight() {
    return this.zoomLevel.vertical * this.defaultTrackHeight
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
    // const gridSegmentWidth = this.defaultBarWidth
    const timelineLength = sequencerState.timelineLength
    return timelineLength
  }

  @computed
  get tracksScrollPixelsX() {
    return this.tracksScrollPercentX * this.tracksScrollableWidth
  }

  @computed
  get tracksScrollPixelY() {
    return this.tracksScrollPercentY * this.tracksScrollableHeight
  }

  @computed
  get tracksViewPercentX() {
    const { tracksAreaWidth } = sequencerLayoutStore
    return tracksAreaWidth / this.trackWidth
  }
}

export default new SequencerViewStore()
export { SequencerViewStore }
