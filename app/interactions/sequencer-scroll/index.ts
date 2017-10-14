import { clamp, map } from 'lodash'

import sequencerDOMStore from 'core/stores/sequencer/dom'
import sequencerViewStore from 'core/stores/sequencer/view'

class ElementsToSync {
  xy: ModifiedHTMLElement[] = []
  x: ModifiedHTMLElement[] = []
  y: ModifiedHTMLElement[] = []
}

const elementsToSync = new ElementsToSync()

interface ModifiedHTMLElement extends HTMLElement {
  canScrollX?: boolean
  canScrollY?: boolean
  syn?(event: WheelEvent): void
}

export function syncScroll(): void {
  const { xy, x, y } = sequencerDOMStore.getSyncScrollElements()

  // Add the elements to the map in order to keep track of sync operations
  elementsToSync.xy = xy
  elementsToSync.x = x
  elementsToSync.y = y

  map([elementsToSync.xy, elementsToSync.x, elementsToSync.y], group => {
    map(group, element => {
      if (group === xy) {
        element.canScrollX = element.canScrollY = true
      } else if (group === x) {
        element.canScrollX = true
      } else if (group === y) {
        element.canScrollY = true
      }

      element.syn = (event: WheelEvent) => {
        event.preventDefault()
        const { deltaX, deltaY } = event

        const { scrollLeft, scrollTop } = element
        const { clientWidth, clientHeight, scrollWidth, scrollHeight } = element

        let scrollX = element.canScrollX ? scrollLeft + deltaX : scrollLeft
        let scrollY = element.canScrollY ? scrollTop + deltaY : scrollTop

        // clamp scrollX and scrollY
        scrollX = clamp(scrollX, 0, scrollWidth - clientWidth)
        scrollY = clamp(scrollY, 0, scrollHeight - clientHeight)

        const ratioX = clamp(scrollX / (scrollWidth - clientWidth), 0, 1)
        const ratioY = clamp(scrollY / (scrollHeight - clientHeight), 0, 1)

        const changeX = element.scrollLeft !== scrollX
        const changeY = element.scrollTop !== scrollY

        element.scrollLeft = scrollX
        element.scrollTop = scrollY

        // Set the ratio in the mobx sequencer view store (for reactive elements) as well as imperatively
        // scrolling the scroll areas - we want this number to be normalized to the entire length of the
        // scrollable area (just the left edge of the scroll) rather than from 0 to 1
        sequencerViewStore.setScrollPercentX(scrollX / scrollWidth)

        // iterate over the other elements to sync, updating the correct scroll properties
        for (let otherElement of elementsToSync.xy) {
          if ((changeX || changeY) && otherElement !== element) {
            window.requestAnimationFrame(() => {
              setScrollX(otherElement, ratioX)
              setScrollY(otherElement, ratioY)
            })
          }
        }

        for (let otherElement of elementsToSync.x) {
          if (changeX && otherElement !== element) {
            window.requestAnimationFrame(() => {
              setScrollX(otherElement, ratioX)
            })
          }
        }

        for (let otherElement of elementsToSync.y) {
          if (changeY && otherElement !== element) {
            window.requestAnimationFrame(() => {
              setScrollY(otherElement, ratioY)
            })
          }
        }
      }

      element.addEventListener('mousewheel', element.syn)
    })
  })
}

export function unsyncScroll() {
  const { xy, x, y } = elementsToSync
  map([xy, x, y], group => {
    map(group, element => {
      element.removeEventListener('mousewheel', element.syn)
    })
  })
}

function setScrollX(element: ModifiedHTMLElement, ratioX: number): void {
  const { clientWidth, scrollWidth } = element
  const nextX = Math.round(ratioX * (scrollWidth - clientWidth))

  element.scrollLeft = nextX
}

function setScrollY(element: ModifiedHTMLElement, ratioY: number): void {
  const { clientHeight, scrollHeight } = element
  const nextY = Math.round(ratioY * (scrollHeight - clientHeight))

  element.scrollTop = nextY
}
