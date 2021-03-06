import { Container, ObjectType } from 'libs/typedi';

export { default as SequencerLayout } from './layout/layout';
export { default as TimelineLayout } from './layout/timeline';
export { default as TracksLayout } from './layout/tracks';

export { default as SequencerState } from './state';
export { default as TimelineState } from './timeline';

export { default as ClipDragInteraction } from './interactions/clip-drag';
export { default as ClipSelectInteraction } from './interactions/clip-select';
export { default as PlayheadDragInteraction } from './interactions/playhead-drag';
export { default as SequencerScrollInteraction } from './interactions/scroll';
export { default as TracksInteraction } from './interactions/tracks';

export { default as ClipMoveService } from './services/clip-move';
export { default as SequencerPositionService } from './services/sequencer-position';
export { default as TracksPositionService } from './services/tracks-position';

const token = Symbol('SEQUENCER');
export function get<T>(type: ObjectType<T>): T {
  return Container.of(token).get(type);
}

export function registerSevices() {}
