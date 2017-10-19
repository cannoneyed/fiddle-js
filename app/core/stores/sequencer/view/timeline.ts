import { computed } from 'mobx'

import clipsDragInteraction from 'core/stores/interactions/clips/drag'

class TimelineView {
  @computed
  get dropTargetPosition() {
    return clipsDragInteraction.isDragging ? clipsDragInteraction.dropTargetPosition : null
  }
}

export default new TimelineView()
export { TimelineView }
