import ClipStore from './clips'
import SequencerStore from './sequencer'
import TrackStore from './tracks'

// // Resource stores
export const clipStore = ClipStore
export const trackStore = TrackStore

// // Sequencer and substores
export const sequencerStore = SequencerStore
export const sequencerPositionStore = SequencerStore.position
export const sequencerStateStore = SequencerStore.state
export const sequencerViewStore = SequencerStore.view
