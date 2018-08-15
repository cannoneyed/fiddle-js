import { Service } from 'typedi';
import { filterMethods } from 'utils/log-filter';

import { SnapToGrid } from 'core/models/snap-to-grid';

import { Timeline } from './timeline';
import { ZoomState } from './zoom';

@Service()
export class SequencerCore {
  static mobxLoggerConfig = filterMethods('updateFromProps');

  zoom = new ZoomState();
  timeline = new Timeline();

  snapToGrid = new SnapToGrid();
}
