import { autorun, IReactionDisposer } from 'mobx'

import sequencerViewStore from 'core/stores/sequencer/view'
import { scrollTracks } from 'dom/scroll-tracks'

export default function observeTracksScroll(): IReactionDisposer {
  return autorun(() => {
    const { tracksScrollPercentX, tracksScrollPercentY } = sequencerViewStore
    scrollTracks({ x: tracksScrollPercentX, y: tracksScrollPercentY })
  })
}
