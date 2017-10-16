import { clamp } from 'lodash'
import sequencerDOMStore from 'core/stores/sequencer/dom'

interface IScrollTracks {
  x?: number
  y?: number
}

export function scrollTracks(params: IScrollTracks) {
  const { x: ratioX, y: ratioY } = params
  const { xy, x, y } = sequencerDOMStore.getTrackScrollElements()

  let element: HTMLElement
  for (element of xy) {
    setScrollX(element, ratioX)
    setScrollY(element, ratioY)
  }

  for (element of x) {
    setScrollX(element, ratioX)
  }

  for (element of y) {
    setScrollY(element, ratioY)
  }
}

function setScrollX(element: HTMLElement, ratioX: number | undefined): void {
  if (ratioX == undefined) {
    return
  }
  ratioX = clamp(ratioX, 0, 1)
  const { clientWidth, scrollWidth } = element
  const nextX = Math.round(ratioX * (scrollWidth - clientWidth))

  element.scrollLeft = nextX
}

function setScrollY(element: HTMLElement, ratioY: number | undefined): void {
  if (ratioY === undefined) {
    return
  }
  ratioY = clamp(ratioY, 0, 1)
  const { clientHeight, scrollHeight } = element
  const nextY = Math.round(ratioY * (scrollHeight - clientHeight))

  element.scrollTop = nextY
}
