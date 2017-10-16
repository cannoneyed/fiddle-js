import clipDragInteraction, { DRAG_DELAY } from 'core/interactions/clips/drag'

export function registerClipDragHandlers(startX: number, startY: number) {
  const begin = Date.now()

  clipDragInteraction.setStart(startX, startY)

  function mouseMove(mouseMove: MouseEvent): void {
    if (Date.now() < begin + DRAG_DELAY) {
      return
    }
    if (!clipDragInteraction.isDragging) {
      clipDragInteraction.beginDrag()
    }

    const deltaX = mouseMove.pageX - clipDragInteraction.startX
    const deltaY = mouseMove.pageY - clipDragInteraction.startY
    clipDragInteraction.setDelta(deltaX, deltaY)
  }

  function mouseUp(mouseUp: MouseEvent): void {
    clipDragInteraction.endDrag()
    removeEventHandlers()
  }

  function removeEventHandlers() {
    window.removeEventListener('mouseup', mouseUp)
    window.removeEventListener('mousemove', mouseMove)
  }

  function addEventHandlers() {
    window.addEventListener('mouseup', mouseUp)
    window.addEventListener('mousemove', mouseMove)
  }

  addEventHandlers()
}
