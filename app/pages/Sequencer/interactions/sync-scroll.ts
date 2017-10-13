/**
 * @fileoverview syncscroll - scroll several areas simultaniously
 * @version 0.0.3
 * 
 * @license MIT, see http://github.com/asvd/intence
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */
import { map } from 'lodash'

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

interface IElementsToSync {
  xy: ModifiedHTMLElement[]
  x: ModifiedHTMLElement[]
  y: ModifiedHTMLElement[]
}

export function syncScroll(elements: IElementsToSync): void {
  const { xy = [], x = [], y = [] } = elements

  // Add the elements to the map in order to keep track of sync operations
  elementsToSync.xy = xy
  elementsToSync.x = x
  elementsToSync.y = y

  map([xy, x, y], group => {
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

        const scrollX = element.canScrollX ? scrollLeft + deltaX : scrollLeft
        const scrollY = element.canScrollY ? scrollTop + deltaY : scrollTop

        const ratioX = scrollX / (scrollWidth - clientWidth)
        const ratioY = scrollY / (scrollHeight - clientHeight)

        const changeX = element.scrollLeft !== scrollX
        const changeY = element.scrollTop !== scrollY

        element.scrollLeft = scrollX
        element.scrollTop = scrollY

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
