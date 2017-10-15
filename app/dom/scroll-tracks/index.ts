import sequencerDOMStore from 'core/stores/sequencer/dom'

export default function srcollTracks(ratioX: number, ratioY: number) {
  const { xy, x, y } = sequencerDOMStore.getSyncScrollElements()

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

function setScrollX(element: HTMLElement, ratioX: number): void {
  const { clientWidth, scrollWidth } = element
  const nextX = Math.round(ratioX * (scrollWidth - clientWidth))

  element.scrollLeft = nextX
}

function setScrollY(element: HTMLElement, ratioY: number): void {
  const { clientHeight, scrollHeight } = element
  const nextY = Math.round(ratioY * (scrollHeight - clientHeight))

  element.scrollTop = nextY
}
