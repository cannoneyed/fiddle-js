import { action, computed, observable } from 'mobx'

import sequencerStore from '../state'

class SequencerViewStore {
  defaultGridWidth = 50
  defaultTrackHeight = 100

  @observable zoomLevel = {
    horizontal: 1,
    vertical: 1,
  }
  @observable playheadPosition = 0

  @action.bound
  zoomInHorizontal = () => {
    this.zoomLevel.horizontal += 0.1
  }

  @action.bound
  zoomOutHorizontal = () => {
    this.zoomLevel.horizontal -= 0.1
  }

  @computed get gridWidth() {
    return this.zoomLevel.horizontal * this.defaultGridWidth
  }

  @computed get trackHeight() {
    return this.zoomLevel.vertical * this.defaultTrackHeight
  }

  @computed get gridCount() {
    const gridWidth = this.gridWidth // eslint-disable-line
    const timelineLength = sequencerStore.timelineLength
    return timelineLength
  }
}

const sequencerViewStore = new SequencerViewStore()

export default sequencerViewStore
export { SequencerViewStore }
