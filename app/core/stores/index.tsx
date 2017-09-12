import clipsStore from './clips'
import sequencerStore from './sequencer'
import tracksStore from './tracks'

// Resource stores
export const clipStore = clipsStore
export const tracksStore = tracksStore

// Sequencer and substores
export const sequencerStore = sequencerStore
export const sequencerPositionStore = sequencerStore.position
export const sequencerStateStore = sequencerStore.state
export const sequencerViewStore = sequencerStore.view
