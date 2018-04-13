import { computed } from 'mobx'

import { clipDrag } from 'core/stores/interactions/clips/drag'

export class TimelineView {
  @computed
  get dropTargetPosition() {
    return clipDrag.isDragging ? clipDrag.dropTargetPosition : null
  }
}

export const timelineView = new TimelineView()
