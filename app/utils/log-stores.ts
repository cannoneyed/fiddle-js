import { clipStore } from 'core/stores/clips';
import { sequencerStore } from 'core/stores/sequencer';
import { trackStore } from 'core/stores/tracks';
import { windowStore } from 'core/stores/window';

export const logStores = () => {
  (window as any).logStores = () => ({
    clips: clipStore,
    sequencer: sequencerStore,
    tracks: trackStore,
    window: windowStore,
  });
};
