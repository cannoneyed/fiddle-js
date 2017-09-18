import { action, observable } from 'mobx'
import * as $ from 'jquery'

import TimelineVector from 'core/models/timeline-vector'
import position from 'core/stores/sequencer/position'
import clipSelect from 'core/interactions/clips/select'

export const DRAG_DELAY: number = 200

class ClipDragInteraction {
  @observable isDragging: boolean = false

  @observable dragDeltaX: number = 0
  @observable dragDeltaY: number = 0

  @observable startX: number
  @observable startY: number

  @observable dropTargetPosition: TimelineVector | null

  // Imperative DOM Handling
  $tracksContainer: JQuery<HTMLElement>

  // Handles setting up mouse event listeners for drag and drop functionality
  @action
  setupDragHandlers = () => {
    this.$tracksContainer = $('#tracksContainer')

    const $body = $('body')

    const mouseDownStart = new Date().getTime()

    $body.mousemove(e => {
      if (!this.isDragging && Date.now() - mouseDownStart > DRAG_DELAY) {
        this.startDrag(e)
      }
      this.handleDragMove(e)
    })

    $body.mouseup(() => {
      this.endDrag()
      $body.off('mousemove')
      $body.off('mouseup')
    })
  }

  @action
  handleDragMove = (e: JQuery.Event<HTMLElement, null>) => {
    if (this.$tracksContainer === undefined) {
      return
    }

    // Get position relative to tracks
    const offset = this.$tracksContainer.offset()
    if (offset === undefined) {
      return
    }

    const tracksOffsetX = e.pageX - offset.left
    // const tracksOffsetY = e.pageY - this.$tracksContainer.offset().top

    this.dragDeltaX = e.pageX - this.startX
    this.dragDeltaY = e.pageY - this.startY

    this.dropTargetPosition = position.getPositionFromOffset(tracksOffsetX)
  }

  @action
  startDrag = (e: JQuery.Event<HTMLElement, null>) => {
    this.startX = e.pageX
    this.startY = e.pageY

    this.isDragging = true
    clipSelect.selectedClips.forEach(clip => {
      const coordinates = $(`#${clip.domId}`).offset()
      if (!coordinates) {
        return
      }

      const { top, left } = coordinates
      clip.isDragging = true

      clip.dragStartX = left
      clip.dragStartY = top
    })
  }

  @action
  endDrag = () => {
    this.isDragging = false
    clipSelect.selectedClips.forEach(clip => {
      clip.isDragging = false

      clip.dragStartX = 0
      clip.dragStartY = 0
    })
    this.dropTargetPosition = null
  }
}

export default new ClipDragInteraction()
export { ClipDragInteraction }
