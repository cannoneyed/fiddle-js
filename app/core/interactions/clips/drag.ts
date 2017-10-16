import { action, observable } from 'mobx'

import TimelineVector from 'core/models/timeline-vector'

export const DRAG_DELAY: number = 200

class ClipDragInteraction {
  static mobxLoggerConfig = {
    methods: {
      setDelta: false,
      setStart: false,
    },
  }

  @observable isDragging: boolean = false

  @observable deltaX: number = 0
  @observable deltaY: number = 0

  @observable startX: number
  @observable startY: number

  @observable dropTargetPosition: TimelineVector | null

  @action
  setStart(x: number, y: number) {
    this.startX = x
    this.startY = y
  }

  @action
  setDelta(x: number, y: number) {
    this.deltaX = x
    this.deltaY = y
  }

  @action
  beginDrag() {
    this.isDragging = true
  }

  @action
  endDrag() {
    this.isDragging = false
  }
}

export default new ClipDragInteraction()
export { ClipDragInteraction }
