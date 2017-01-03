import { action, computed, observable } from 'mobx'
import autobind from 'autobind-decorator'

import sequencerStore from '../state'

@autobind
class SequencerViewStore {
  @observable zoomLevel = {
    horizontal: 1,
    vertical: 1,
  }
  @observable playheadPosition = 0

  @action
  zoomInHorizontal = () => {
    this.zoomLevel.horizontal += 0.1
  }

  @action
  zoomOutHorizontal = () => {
    this.zoomLevel.horizontal -= 0.1
  }

  @computed get gridWidth() {
    return this.zoomLevel.horizontal * 50
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
