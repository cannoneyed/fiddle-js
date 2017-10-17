import ClipStore from './clips'
import SequencerStore from './sequencer'
import TrackStore from './tracks'
import WindowStore from './window'

// Resource stores
export const clipStore = ClipStore
export const trackStore = TrackStore
export const windowStore = WindowStore

// Sequencer and substores
export const sequencerStore = SequencerStore
export const sequencerDOMStore = SequencerStore.dom
export const sequencerLayoutStore = SequencerStore.layout
export const sequencerStateStore = SequencerStore.state
export const sequencerViewStore = SequencerStore.view
