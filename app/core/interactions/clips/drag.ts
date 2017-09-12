import { action, observable } from 'mobx'
import * as $ from 'jquery'

import Position from 'core/models/Position'
import sequencerPosition from 'core/stores/sequencer/position'
import clipSelect from 'core/interactions/clips/select'

export const DRAG_DELAY = 200

class ClipDragInteraction {
  @observable isDragging = false

  @observable dragDeltaX = 0
  @observable dragDeltaY = 0

  @observable startX: number
  @observable startY: number

  @observable dropTargetPosition: Position | null

  // Imperative DOM Handling
  $tracksContainer: JQuery<HTMLElement>

  // Handles setting up mouse event listeners for drag and drop functionality
  @action
  setupDragHandlers = () => {
    this.$tracksContainer = $('#tracksContainer')
    const $body = $('body')

    const mouseDownStart = new Date()

    $body.mousemove(e => {
      if (!this.isDragging && new Date().getTime() - mouseDownStart.getTime() > DRAG_DELAY) {
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

    this.dropTargetPosition = sequencerPosition.getPositionFromOffset(tracksOffsetX)
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
