import { action, observable } from 'mobx'
import $ from 'jquery'

import position from 'core/stores/sequencer/position'
import clipSelect from 'core/interactions/clips/select'

class ClipDrag {
  DRAG_DELAY = 100

  @observable isDragging = false

  @observable dragX
  @observable dragY

  @observable dropTargetPosition

  // Handles setting up mouse event listeners for drag and drop functionality
  @action setupDragHandlers = () => {
    const $tracksContainer = $('#tracksContainer')
    const $body = $('body')

    const mouseDownStart = new Date()

    $body.mousemove((e) => {
      if (!this.isDragging && new Date() - mouseDownStart > this.DRAG_DELAY) {
        this.startDrag()
      }
      // Get position relative to tracks
      const tracksOffsetX = e.pageX - $tracksContainer.offset().left
      const tracksOffsetY = e.pageY - $tracksContainer.offset().top

      this.setDropTargetPosition(tracksOffsetX, tracksOffsetY)
    })

    $body.mouseup(() => {
      this.endDrag()
      $body.off('mousemove')
      $body.off('mouseup')
    })
  }

  @action setDropTargetPosition = (offsetX) => {
    this.dropTargetPosition = position.getPositionFromOffset(offsetX)
  }

  @action startDrag = () => {
    this.isDragging = true
    clipSelect.selectedClips.forEach(clip => {
      console.log('🍕', clip.domId, $(`#${clip.domId}`).offset())
      clip.isDragging = true
    })
  }

  @action endDrag = () => {
    this.isDragging = false
    clipSelect.selectedClips.forEach(clip => {
      clip.isDragging = false
    })
    this.dropTargetPosition = null
  }
}

export default new ClipDrag()
