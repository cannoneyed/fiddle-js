import { action, observable } from 'mobx'
import $ from 'jquery'

import position from 'core/stores/sequencer/position'

class ClipDrag {
  @observable isDragging = false

  @observable dragX
  @observable dragY

  @observable dropTargetPosition

  @action.bound setupDragHandlers = () => {
    $('#sequencerBody').mousemove((e) => {
      // Get position relative to tracks
      const offsetX = e.pageX - $('#tracksContainer').offset().left
      const offsetY = e.pageY - $('#tracksContainer').offset().top

      this.setDropTargetPosition(offsetX, offsetY)
    })
    $('#sequencerBody').mouseup(() => {
      this.endDrag()
      $('#sequencerBody').off('mousemove')
      $('#sequencerBody').off('mouseup')
    })
  }

  @action setDropTargetPosition = (offsetX) => {
    this.dropTargetPosition = position.getPositionFromOffset(offsetX)
  }

  @action startDrag = () => {
    this.isDragging = true
  }

  @action endDrag = () => {
    this.isDragging = true
    this.dropTargetPosition = null
  }
}

export default new ClipDrag()
