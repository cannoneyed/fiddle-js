import { action, computed, observable } from 'mobx'

import sequencerState from 'core/stores/sequencer/state'

class SequencerView {
  defaultBarWidth = 50
  barsPerGridSegment = 1

  defaultTrackHeight = 100

  @observable zoomLevel = {
    horizontal: 1,
    vertical: 1,
  }
  @observable playheadPosition = 0

  // Actions
  @action.bound
  zoomInHorizontal = () => {
    this.zoomLevel.horizontal += 0.1
  }

  @action.bound
  zoomOutHorizontal = () => {
    this.zoomLevel.horizontal -= 0.1
  }

  // Computed Fields
  @computed get barWidth() {
    return this.zoomLevel.horizontal * this.defaultBarWidth
  }

  @computed get gridSegmentWidth() {
    return this.barWidth * this.barsPerGridSegment
  }

  @computed get trackHeight() {
    return this.zoomLevel.vertical * this.defaultTrackHeight
  }

  @computed get trackWidth() {
    return this.gridCount * this.defaultBarWidth
  }

  @computed get gridCount() {
    const gridSegmentWidth = this.defaultBarWidth // eslint-disable-line
    const timelineLength = sequencerState.timelineLength
    return timelineLength
  }
}

export default new SequencerView()
export { SequencerView }
