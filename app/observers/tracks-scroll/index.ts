import { autorun } from 'mobx'

import sequencerViewStore from 'core/stores/sequencer/view'
import { scrollTracks } from 'dom/scroll-tracks'

export default function observeTracksScroll(): void {
  autorun(() => {
    const { tracksScrollPercentX, tracksScrollPercentY } = sequencerViewStore
    scrollTracks({ x: tracksScrollPercentX, y: tracksScrollPercentY })
  })
}
