import { map } from 'lodash'

import sequencerDOMStore from 'core/stores/sequencer/dom'
import sequencerViewStore from 'core/stores/sequencer/view'

export function registerHandlers(): void {
  const { xy, x, y } = sequencerDOMStore.getTrackScrollElements()

  map([xy, x, y], group => {
    map(group, element => {
      let canScrollX = false
      let canScrollY = false

      if (group === xy) {
        canScrollX = canScrollY = true
      } else if (group === x) {
        canScrollX = true
      } else if (group === y) {
        canScrollY = true
      }

      const syn = (event: WheelEvent) => {
        event.preventDefault()
        const { deltaX, deltaY } = event

        const { scrollLeft, scrollTop } = element
        const { clientWidth, clientHeight, scrollWidth, scrollHeight } = element

        const scrollX = canScrollX ? scrollLeft + deltaX : scrollLeft
        const scrollY = canScrollY ? scrollTop + deltaY : scrollTop

        const ratioX = canScrollX ? scrollX / (scrollWidth - clientWidth) : undefined
        const ratioY = canScrollY ? scrollY / (scrollHeight - clientHeight) : undefined

        // Set the scroll amount in the mobx sequencer view store (for reactive elements) as well as imperatively
        // scrolling the scroll areas
        sequencerViewStore.setTracksScroll({ x: ratioX, y: ratioY })
      }

      element.addEventListener('mousewheel', syn)
    })
  })
}
