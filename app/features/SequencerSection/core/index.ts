import { Container, ObjectType } from 'typedi';

export { GridLayout } from './grid';
export { SequencerLayout } from './layout';
export { SequencerState } from './state';
export { Timeline } from './timeline';
export { TracksLayout } from './tracks';

export { ClipDragInteraction } from './interactions/clip-drag';
export { ClipSelectInteraction } from './interactions/clip-select';
export { SequencerScrollInteraction } from './interactions/scroll';
export { TracksInteraction } from './interactions/tracks';

export { ClipMoveService } from './services/clip-move';
export { GridService } from './services/grid';
export { SequencerPositionService } from './services/sequencer-position';
export { TracksPositionService } from './services/tracks-position';

const token = Symbol('sequencer');

export function get<T>(type: ObjectType<T>): T {
  return Container.of(token).get(type);
}

export function registerSevices() {
  console.log('🔥', 'registered sequencer section core');
}
