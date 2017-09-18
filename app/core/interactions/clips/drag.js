import { action, observable } from 'mobx'
import $ from 'jquery'

import position from 'core/stores/sequencer/position'
import clipSelect from 'core/interactions/clips/select'

export const DRAG_DELAY = 200

class ClipDrag {
  @observable isDragging = false

  @observable dragDeltaX = 0
  @observable dragDeltaY = 0

  @observable startX
  @observable startY

  @observable dropTargetPosition

  // Handles setting up mouse event listeners for drag and drop functionality
  @action setupDragHandlers = () => {
    this.$tracksContainer = $('#tracksContainer')

    const $body = $('body')

    const mouseDownStart = new Date()

    $body.mousemove((e) => {
      if (!this.isDragging && new Date() - mouseDownStart > DRAG_DELAY) {
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

  @action handleDragMove = (e) => {
    // Get position relative to tracks
    const tracksOffsetX = e.pageX - this.$tracksContainer.offset().left
    // const tracksOffsetY = e.pageY - this.$tracksContainer.offset().top

    this.dragDeltaX = e.pageX - this.startX
    this.dragDeltaY = e.pageY - this.startY

    this.dropTargetPosition = position.getPositionFromOffset(tracksOffsetX)
  }

  @action startDrag = (e) => {
    this.startX = e.pageX
    this.startY = e.pageY

    this.isDragging = true
    clipSelect.selectedClips.forEach(clip => {
      clip.isDragging = true

      clip.dragStartX = left
      clip.dragStartY = top
    })
  }

  @action endDrag = () => {
    this.isDragging = false
    clipSelect.selectedClips.forEach(clip => {
      clip.isDragging = false

      clip.dragStartX = 0
      clip.dragStartY = 0
    })
    this.dropTargetPosition = null
  }
}

export default new ClipDrag()
