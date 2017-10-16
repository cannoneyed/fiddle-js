import sequencerDOMStore from 'core/stores/sequencer/dom'
import sequencerViewStore from 'core/stores/sequencer/view'

import { getNextScrollPercentX } from './helpers'

export function registerHandlers(): void {
  const { minimap } = sequencerDOMStore

  if (!minimap) {
    return
  }

  const syn = (event: WheelEvent) => {
    event.preventDefault()
    const { deltaX } = event

    const nextScrollPercentX = getNextScrollPercentX(deltaX)
    sequencerViewStore.setTracksScroll({ x: nextScrollPercentX })
  }
  minimap.addEventListener('mousewheel', syn)
}
