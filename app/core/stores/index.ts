import { Container } from 'typedi';

import { ClipStore } from './clips';
import { TrackStore } from './tracks';
import { WindowStore } from './window';
import { SequencerState } from './sequencer';

export const clipStore = Container.get(ClipStore);
export const trackStore = Container.get(TrackStore);
export const windowStore = Container.get(WindowStore);
export const sequencerState = Container.get(SequencerState);
