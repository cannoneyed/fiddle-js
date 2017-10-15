import { action, computed, observable } from 'mobx'

import sequencerLayoutStore from 'core/stores/sequencer/layout'
import sequencerState from 'core/stores/sequencer/state'

class ZoomLevel {
  @observable horizontal: number
  @observable vertical: number

  zoomInterval = 0.1

  constructor(horizontal = 1, vertical = 1) {
    this.horizontal = horizontal
    this.vertical = vertical
  }

  @action
  zoomInHorizontal() {
    this.horizontal += this.zoomInterval
  }

  @action
  zoomOutHorizontal() {
    this.horizontal = Math.max(0, (this.horizontal -= this.zoomInterval))
  }
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

  @observable tracksScrollX = 0
  @observable tracksScrollY = 0

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
  setTracksScroll = (scrollX: number, scrollY: number) => {
    this.tracksScrollX = scrollX
    this.tracksScrollY = scrollY
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
  get gridCount() {
    // const gridSegmentWidth = this.defaultBarWidth
    const timelineLength = sequencerState.timelineLength
    return timelineLength
  }

  @computed
  get tracksScrollPercentX() {
    return this.tracksScrollX / this.trackWidth
  }

  @computed
  get tracksViewPercentX() {
    const { tracksAreaWidth } = sequencerLayoutStore
    return tracksAreaWidth / this.trackWidth
  }
}

export default new SequencerViewStore()
export { SequencerViewStore }
