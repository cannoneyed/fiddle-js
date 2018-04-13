import { sequencerLayout } from './layout';
import { sequencerState } from './state';
import { sequencerView } from './view';

class SequencerStore {
  layout = sequencerLayout;
  state = sequencerState;
  view = sequencerView;
}

export const sequencerStore = new SequencerStore();
