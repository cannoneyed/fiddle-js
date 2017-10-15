import { clamp } from 'lodash'
import { scrollTracksX } from 'dom/scroll-tracks'

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

      const scrollPercentX = sequencerViewStore.setTracksScrollPercentX(nextScrollPercentX)

      // The scrollTracks method expects a normalized 0 to 1 ratio of scrollable area
      // covered, not the scrollLeft / clientWidth percentage maintained in the
      // mobx store: TODO: make this consistent
      const nextScrollRatioX = (minimapWidth * scrollPercentX + deltaX) / scrollableMinimapWidth

      const scrollRatioX = clamp(nextScrollRatioX, 0, 1)
      scrollTracksX(scrollRatioX)
    }
  }

  minimap.addEventListener('mousewheel', syn)
}
