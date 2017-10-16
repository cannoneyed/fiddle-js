import sequencerDOMStore from 'core/stores/sequencer/dom'
import sequencerViewStore from 'core/stores/sequencer/view'

import { getNextScrollPercentX } from './helpers'

export type UnregisterHandlers = () => void
export type EventHandler = (event: WheelEvent) => void

export function registerHandlers(): UnregisterHandlers {
  const { minimap } = sequencerDOMStore

  if (!minimap) {
    return () => {}
  }

  const eventHandler = (event: WheelEvent) => {
    event.preventDefault()
    const { deltaX } = event

    const nextScrollPercentX = getNextScrollPercentX(deltaX)
    sequencerViewStore.setTracksScroll({ x: nextScrollPercentX })
  }
  minimap.addEventListener('mousewheel', eventHandler)

  return function unregisterHandlers(): void {
    minimap.removeEventListener('mousewheel', eventHandler)
  }
}
