import { Clip } from 'core/models/clip';
import { clipSelect } from 'core/interactions/clip/select';

import * as clipDragHandlers from 'core/interactions/clip/drag/handlers';

export const handleClipMouseDown = (clip: Clip, event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation();

  // If left-click, do nothing (delegate to context menus)
  if (event.ctrlKey) {
    return;
  } else if (clip.isSelected) {
    // no op, still set up handlers below
  } else if (event.shiftKey) {
    clipSelect.selectClip(clip);
  } else {
    clipSelect.selectOnlyClip(clip);
  }

  event.stopPropagation();
  event.preventDefault();
  clipDragHandlers.register(clip, event);
};
