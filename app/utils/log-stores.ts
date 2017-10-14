import { clipStore, sequencerStore, trackStore, windowStore } from 'core/stores'

export default function logStores() {
  ;(window as any).logStores = () => ({
    clips: clipStore,
    sequencer: sequencerStore,
    tracks: trackStore,
    window: windowStore,
  })
}
