import { action, computed, observable } from 'mobx'

import Clip from 'core/models/clip'
import ScreenPosition from 'core/models/screen-position'
import TimelineVector from 'core/models/timeline-vector'
import ClipsSelection from 'core/interactions/clips/select'

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

  @observable handleClip: Clip
  @observable handleClipScreenPosition: ScreenPosition
  @observable relativePositions = observable.map<ScreenPosition>({})

  @observable dropTargetPosition: TimelineVector | null

  @computed
  get draggedClipsPosition() {
    const { x, y } = this.handleClipScreenPosition
    return {
      x: x + this.deltaX,
      y: y + this.deltaY,
    }
  }

  @action
  setStartPosition(x: number, y: number) {
    this.startX = x
    this.startY = y
  }

  @action
  setDelta(x: number, y: number) {
    this.deltaX = x
    this.deltaY = y
  }

  @action
  beginDrag(handleClip: Clip) {
    this.isDragging = true
    this.handleClip = handleClip

    // Set the position of the handled clip to relatively position the other selected clips on the
    // DraggedClips container div
    this.handleClipScreenPosition = handleClip.getScreenPosition()

    // Set the relative screen positions of the other selected clips, so that they can be positioned
    // correctly in the DraggedClips container div
    const { selectedClips } = ClipsSelection
    selectedClips.forEach(selectedClip => {
      const clipScreenPosition = selectedClip.getScreenPosition()
      const relativePosition = clipScreenPosition.subtract(this.handleClipScreenPosition)
      this.relativePositions.set(selectedClip.id, relativePosition)
    })
  }

  getRelativePosition(clip: Clip) {
    const { id } = clip
    const relativePosition = this.relativePositions.get(id)
    return relativePosition || new ScreenPosition()
  }

  @action
  endDrag() {
    this.isDragging = false
    this.relativePositions.clear()
  }
}

export default new ClipDragInteraction()
export { ClipDragInteraction }
