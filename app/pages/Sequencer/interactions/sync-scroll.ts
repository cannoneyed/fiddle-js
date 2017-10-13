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
  isScrolling?: boolean
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

  window.onscroll = (event: Event) => {
    event.preventDefault()
  }

  map([xy, x, y], group => {
    map(group, element => {
      element.eX = element.scrollLeft
      element.eY = element.scrollTop

      element.syn = (event: WheelEvent) => {
        event.preventDefault()
        const { deltaX, deltaY } = event

        const { scrollLeft, scrollTop } = element
        const { clientWidth, clientHeight, scrollWidth, scrollHeight } = element

        const scrollX = scrollLeft + deltaX
        const scrollY = scrollTop + deltaY

        const rateX = scrollX / (scrollWidth - clientWidth)
        const rateY = scrollY / (scrollHeight - clientHeight)

        const changeX = element.eX !== scrollX
        const changeY = element.eY !== scrollY

        element.eX = element.scrollLeft = scrollX
        element.eY = element.scrollTop = scrollY

        // iterate over the other elements to sync, updating the correct scroll properties
        for (let otherElement of elementsToSync.xy) {
          if ((changeX || changeY) && otherElement !== element) {
            window.requestAnimationFrame(() => {
              setScrollX(otherElement, scrollX, rateX)
              setScrollY(otherElement, scrollY, rateY)
            })
          }
        }

        for (let otherElement of elementsToSync.x) {
          if (changeX && otherElement !== element) {
            window.requestAnimationFrame(() => {
              setScrollX(otherElement, scrollX, rateX)
            })
          }
        }

        for (let otherElement of elementsToSync.y) {
          if (changeY && otherElement !== element) {
            window.requestAnimationFrame(() => {
              setScrollY(otherElement, scrollY, rateY)
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

function setScrollX(element: ModifiedHTMLElement, scrollX: number, rateX: number): void {
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
