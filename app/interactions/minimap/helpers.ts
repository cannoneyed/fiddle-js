import sequencerDOMStore from 'core/stores/sequencer/dom'
import sequencerViewStore from 'core/stores/sequencer/view'

export function getNextScrollPercentX(deltaX: number) {
  const { minimap, minimapScroll } = sequencerDOMStore
  const { tracksScrollPercentX } = sequencerViewStore.tracks

  if (minimap && minimapScroll) {
    const minimapWidth = minimap.clientWidth
    const minimapScrollWidth = minimapScroll.clientWidth

    const scrollableMinimapWidth = minimapWidth - minimapScrollWidth
    const deltaPercentX = deltaX / scrollableMinimapWidth

    const nextScrollPercentX = tracksScrollPercentX + deltaPercentX
    return nextScrollPercentX
  }
  return tracksScrollPercentX
}
