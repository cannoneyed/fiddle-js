import $ from 'jquery'

export function setScrollHandler(el: Element) {
  const tracksAreaContainer = document.getElementById('tracksAreaContainer')

  $(el).scroll(function() {
    if (!tracksAreaContainer) {
      return
    }

    tracksAreaContainer.scrollTop = this.scrollTop
  })
}

export function removeScrollHandler(el: Element) {
  $(el).off('scroll')
}
