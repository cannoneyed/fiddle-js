// From actions
export { ClipActions } from 'core/actions/clip';

// From services
export { DomPositionService } from 'core/services/dom/position';
export { LoadService } from 'core/services/load';
export { UndoService } from 'core/services/undo';

// From state/app
export { ClipEditorState } from 'core/state/app/clip-editor';
export { TimelineState as ClipEditorTimelineState } from 'core/state/app/clip-editor/timeline';

// From state/layouts
export { MainPageLayout } from 'core/state/layouts/pages/main';
export { WindowLayout } from 'core/state/layouts/window';

// From state/stores
export { DraggedClips } from 'core/state/stores/clips/dragged';
export { ClipStore } from 'core/state/stores/clips';
export { SnipStore } from 'core/state/stores/snips';
export { TrackStore } from 'core/state/stores/tracks';

import { registerSevices as registerSequencerServices } from 'features/SequencerSection/core';

export function registerServices() {
  registerSequencerServices();
}
