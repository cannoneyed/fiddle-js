import { autorun, IReactionDisposer } from 'mobx'

import { sequencerView } from 'core/stores/sequencer/view'
import { scrollTracks } from 'dom/scroll-tracks'

export const observeTracksScroll = (): IReactionDisposer => {
  return autorun(() => {
    const { tracksScrollPercentX, tracksScrollPercentY } = sequencerView.tracks
    scrollTracks({ x: tracksScrollPercentX, y: tracksScrollPercentY })
  })
}
