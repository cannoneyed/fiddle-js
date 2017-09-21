import $ from 'jquery'

export function setScrollHandler(el: Element, timelineHeight: number) {
  $(el).scroll(function fixTimelineScroll() {
    $('#timelineContainer')[0].style.top = `${this.scrollTop}px`
    $('#verticalGridContainer')[0].style.top = `${this.scrollTop}px`
    $('#trackHeadersContainer')[0].style.top = `${timelineHeight - this.scrollTop}px`
  })
}

export function removeScrollHandler(el: Element) {
  $(el).off('scroll')
}
