import { scrollTracks } from 'dom/scroll-tracks'

import sequencerDOMStore from 'core/stores/sequencer/dom'
import sequencerViewStore from 'core/stores/sequencer/view'

export function registerHandlers(): void {
  const { minimap } = sequencerDOMStore

  if (!minimap) {
    return
  }

  const syn = (event: WheelEvent) => {
    event.preventDefault()
    const { deltaX } = event
    const { minimap, minimapScroll } = sequencerDOMStore

    if (minimap && minimapScroll) {
      const minimapWidth = minimap.clientWidth
      const minimapScrollWidth = minimapScroll.clientWidth

      const scrollableMinimapWidth = minimapWidth - minimapScrollWidth
      const deltaPercentX = deltaX / scrollableMinimapWidth

      const { tracksScrollPercentX } = sequencerViewStore
      const nextScrollPercentX = tracksScrollPercentX + deltaPercentX

      sequencerViewStore.setTracksScrollPercentX(nextScrollPercentX)
      scrollTracks({ x: nextScrollPercentX })
    }
  }

  minimap.addEventListener('mousewheel', syn)
}
