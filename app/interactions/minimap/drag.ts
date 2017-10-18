import sequencerDOMStore from 'core/dom/sequencer'
import sequencerViewStore from 'core/stores/sequencer/view'
import minimapInteractionStore from 'core/interactions/minimap'

import { getNextScrollPercentX } from './helpers'

export type UnregisterHandlers = () => void
export type EventHandler = (event: MouseEvent) => void

export function registerHandlers(): UnregisterHandlers {
  const { minimap, minimapScroll } = sequencerDOMStore
  let mouseDown: EventHandler

  if (minimap && minimapScroll) {
    mouseDown = (mouseDown: MouseEvent) => {
      let lastX = mouseDown.pageX
      minimapInteractionStore.setIsDragging(true)

      function mouseMove(mouseMove: MouseEvent): void {
        if (!minimap || !minimapScroll) {
          return
        }
        const deltaX = mouseMove.pageX - lastX
        lastX = mouseMove.pageX

        const nextScrollPercentX = getNextScrollPercentX(deltaX)
        sequencerViewStore.tracks.setTracksScroll({ x: nextScrollPercentX })
      }

      function mouseUp(mouseUp: MouseEvent): void {
        minimapInteractionStore.setIsDragging(false)
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

      mouseDown.stopPropagation()
      mouseDown.preventDefault()
      addEventHandlers()
    }

    minimapScroll.addEventListener('mousedown', mouseDown)
  }

  return function unregisterHandlers(): void {
    if (minimap && minimapScroll) {
      minimapScroll.removeEventListener('mousedown', mouseDown)
    }
  }
}
