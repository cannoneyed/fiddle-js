import $ from 'jquery'

export function setScrollHandler(el: Element) {
  const timelineContainer = document.getElementById('timelineContainer')
  const tracksGutterContainer = document.getElementById('tracksGutterContainer')

  $(el).scroll(function fixTimelineScroll(e) {
    if (!timelineContainer || !tracksGutterContainer) {
      return
    }

    timelineContainer.scrollLeft = this.scrollLeft
    tracksGutterContainer.scrollTop = this.scrollTop
  })
}

export function removeScrollHandler(el: Element) {
  $(el).off('scroll')
}
