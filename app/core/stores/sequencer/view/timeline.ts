import { action, computed, observable } from 'mobx'

// import clipsDragInteraction from 'core/interactions/clips/drag'
import TimelineVector from 'core/models/timeline-vector'

class TimelineView {
  @observable dragToMarkerPosition = new TimelineVector(1)

  @computed
  get dragToMarker() {
    // return clipsDragInteraction.isDragging ? this.dragToMarkerPosition : null
    return true ? this.dragToMarkerPosition : null
  }

  // actions
  @action
  setDragToMarkerPosition(position: TimelineVector) {
    this.dragToMarkerPosition = position
  }
}

export default new TimelineView()
export { TimelineView }
