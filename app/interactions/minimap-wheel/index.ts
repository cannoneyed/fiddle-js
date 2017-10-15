import { map } from 'lodash'

import sequencerDOMStore from 'core/stores/sequencer/dom'
import sequencerViewStore from 'core/stores/sequencer/view'

// class ElementsToSync {
//   xy: ModifiedHTMLElement[] = []
//   x: ModifiedHTMLElement[] = []
//   y: ModifiedHTMLElement[] = []
// }

// const elementsToSync = new ElementsToSync()

interface ModifiedHTMLElement extends HTMLElement {
  canScrollX?: boolean
  canScrollY?: boolean
  syn?(event: WheelEvent): void
}

export function syncScroll(): void {
  const { minimap } = sequencerDOMStore
  if (!minimap) {
    return
  }

  const syn = (event: WheelEvent) => {
    event.preventDefault()
    const { deltaX, deltaY } = event

    // Set the scroll amount in the mobx sequencer view store (for reactive elements) as well as imperatively
    // scrolling the scroll areas
    sequencerViewStore.setTracksScroll(scrollX, scrollY)
  }

  minimap.addEventListener('mousewheel', syn)
}
