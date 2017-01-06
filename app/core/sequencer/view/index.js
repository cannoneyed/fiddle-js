import { action, computed, observable } from 'mobx'

import sequencerStore from '../state'

class SequencerView {
  defaultgridSegmentWidth = 50
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
  @computed get gridSegmentWidth() {
    return this.zoomLevel.horizontal * this.defaultgridSegmentWidth
  }

  @computed get trackHeight() {
    return this.zoomLevel.vertical * this.defaultTrackHeight
  }

  @computed get trackWidth() {
    return this.gridCount * this.gridSegmentWidth
  }

  @computed get gridCount() {
    const gridSegmentWidth = this.gridSegmentWidth // eslint-disable-line
    const timelineLength = sequencerStore.timelineLength
    return timelineLength
  }
}

export default new SequencerView()
export { SequencerView }
