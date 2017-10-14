import { action, computed, observable } from 'mobx'

import sequencerLayoutStore from 'core/stores/sequencer/layout'
import sequencerState from 'core/stores/sequencer/state'

class ZoomLevel {
  @observable horizontal: number
  @observable vertical: number

  constructor(horizontal = 1, vertical = 1) {
    this.horizontal = horizontal
    this.vertical = vertical
  }
}

class SequencerViewStore {
  static mobxLoggerConfig = {
    methods: {
      setScrollPercentX: false,
    },
  }

  defaultBarWidth = 50
  barsPerGridSegment = 1

  defaultTrackHeight = 50

  @observable zoomLevel = new ZoomLevel()
  @observable playheadPosition = 0

  @observable scrollPercentX = 0

  // Actions
  @action.bound
  zoomInHorizontal = () => {
    this.zoomLevel.horizontal += 0.1
  }

  @action.bound
  zoomOutHorizontal = () => {
    this.zoomLevel.horizontal -= 0.1
  }

  @action.bound
  setScrollPercentX = (scrollPercentX: number) => {
    this.scrollPercentX = scrollPercentX
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
  get tracksViewPercentX() {
    const { zoomLevel } = this
    console.log(zoomLevel)
    const { tracksAreaWidth } = sequencerLayoutStore
    return tracksAreaWidth / this.trackWidth
  }
}

export default new SequencerViewStore()
export { SequencerViewStore }
