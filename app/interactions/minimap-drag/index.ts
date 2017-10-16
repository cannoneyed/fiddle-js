import { scrollTracksX } from 'dom/scroll-tracks'

import sequencerDOMStore from 'core/stores/sequencer/dom'
import sequencerViewStore from 'core/stores/sequencer/view'
import minimapInteractionStore from 'core/interactions/minimap'

export function registerHandlers() {
  const { minimap, minimapScroll } = sequencerDOMStore
  if (minimap && minimapScroll) {
    minimapScroll.onmousedown = (mouseDown: MouseEvent) => {
      let lastX = mouseDown.pageX
      minimapInteractionStore.setIsDragging(true)

      const mouseMove = (mouseMove: MouseEvent) => {
        const deltaX = mouseMove.pageX - lastX
        lastX = mouseMove.pageX

        const minimapWidth = minimap.clientWidth
        const minimapScrollWidth = minimapScroll.clientWidth

        const scrollableMinimapWidth = minimapWidth - minimapScrollWidth
        const deltaPercentX = deltaX / scrollableMinimapWidth

        const { tracksScrollPercentX } = sequencerViewStore
        const nextScrollPercentX = tracksScrollPercentX + deltaPercentX

        sequencerViewStore.setTracksScrollPercentX(nextScrollPercentX)
        scrollTracksX(nextScrollPercentX)
      }

      const mouseUp = (mouseUp: MouseEvent) => {
        minimapInteractionStore.setIsDragging(false)
        window.removeEventListener('mouseup', mouseMove as EventListener)
        window.removeEventListener('mousemove', mouseMove as EventListener)
      }

      window.addEventListener('mousemove', mouseMove)
      window.addEventListener('mouseup', mouseUp)

      mouseDown.stopPropagation()
      mouseDown.preventDefault()
    }
  }
}
