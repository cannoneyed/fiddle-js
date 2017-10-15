import { clamp, map } from 'lodash'

import sequencerDOMStore from 'core/stores/sequencer/dom'
import sequencerViewStore from 'core/stores/sequencer/view'

import { scrollTracks } from 'dom/scroll-tracks'

export function registerHandlers(): void {
  const { xy, x, y } = sequencerDOMStore.getSyncScrollElements()

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

        let scrollX = canScrollX ? scrollLeft + deltaX : scrollLeft
        let scrollY = canScrollY ? scrollTop + deltaY : scrollTop

        // clamp scrollX and scrollY
        scrollX = clamp(scrollX, 0, scrollWidth - clientWidth)
        scrollY = clamp(scrollY, 0, scrollHeight - clientHeight)

        const ratioX = clamp(scrollX / (scrollWidth - clientWidth), 0, 1)
        const ratioY = clamp(scrollY / (scrollHeight - clientHeight), 0, 1)

        // Imperatively scroll the scrollable dom elements
        scrollTracks(ratioX, ratioY)

        // Set the scroll amount in the mobx sequencer view store (for reactive elements) as well as imperatively
        // scrolling the scroll areas
        sequencerViewStore.setTracksScroll(scrollX, scrollY)
      }

      element.addEventListener('mousewheel', syn)
    })
  })
}
