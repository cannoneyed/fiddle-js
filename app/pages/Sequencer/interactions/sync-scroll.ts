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
  eX?: number
  eY?: number
  syn?(): void
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
      if (!element) {
        return
      }

      element.eX = 0
      element.eY = 0

      element.syn = function() {
        const { scrollLeft: scrollX, scrollTop: scrollY } = element
        const { clientWidth, clientHeight, scrollWidth, scrollHeight } = element

        const rateX = scrollX / (scrollWidth - clientWidth)
        const rateY = scrollY / (scrollHeight - clientHeight)

        element.eX = scrollX
        element.eY = scrollY

        // iterate over the other elements to sync, updating the correct scroll properties
        for (let otherElement of elementsToSync.xy) {
          if (otherElement && otherElement !== element) {
            setScrollX(otherElement, scrollX, rateX)
            setScrollY(otherElement, scrollY, rateY)
          }
        }

        for (let otherElement of elementsToSync.x) {
          if (otherElement && otherElement !== element) {
            setScrollX(otherElement, scrollX, rateX)
          }
        }

        for (let otherElement of elementsToSync.y) {
          if (otherElement && otherElement !== element) {
            setScrollY(otherElement, scrollY, rateY)
          }
        }
      }

      element.addEventListener('scroll', element.syn)
    })
  })
}

export function unsyncScroll() {
  const { xy, x, y } = elementsToSync
  map([xy, x, y], group => {
    map(group, element => {
      element.removeEventListener('scroll', element.syn)
    })
  })
}

function setScrollX(element: ModifiedHTMLElement, scrollX: number, rateX: number): void {
  const updateX = scrollX !== element.eX
  if (!updateX) {
    return
  }

  const { clientWidth, scrollLeft, scrollWidth } = element
  const nextX = Math.round(rateX * (scrollWidth - clientWidth))
  const shouldUpdate = Math.round(scrollLeft - nextX)

  scrollX = element.eX = nextX

  if (shouldUpdate) {
    element.scrollLeft = scrollX
  }
}

function setScrollY(element: ModifiedHTMLElement, scrollY: number, rateY: number): void {
  const updateY = scrollY !== element.eY
  if (!updateY) {
    return
  }

  const { clientHeight, scrollTop, scrollHeight } = element
  const nextY = Math.round(rateY * (scrollHeight - clientHeight))
  const shouldUpdate = Math.round(scrollTop - nextY)

  scrollY = element.eY = nextY

  if (shouldUpdate) {
    element.scrollTop = scrollY
  }
}
