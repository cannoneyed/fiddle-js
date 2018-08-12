import { filterMethods } from 'utils/log-filter';

import { SnapToGrid } from 'core/models/snap-to-grid';

import { SequencerLayout } from './layout';
import { ZoomState } from './zoom';

export class SequencerCore {
  static mobxLoggerConfig = filterMethods('updateFromProps');

  layout = new SequencerLayout();
  zoom = new ZoomState();

  snapToGrid = new SnapToGrid();
}

const coreRegister = new Map<string, SequencerCore>();
export function getCore() {
  const str = 'SEQUENCER_KEY';
  const core = coreRegister.has(str) ? coreRegister.get(str)! : new SequencerCore();
  coreRegister.set(str, core);
  return core;
}
