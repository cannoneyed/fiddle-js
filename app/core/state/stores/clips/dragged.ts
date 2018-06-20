import { Service } from 'typedi';
import { observable } from 'mobx';

import { Clip } from 'core/models/clip';
import { TimelineVector } from 'core/primitives/timeline-vector';

@Service()
export class DraggedClips {
  // The temporary store for clips being dragged in the sequencer
  @observable draggedClips = observable.map<string, Clip>({});

  @observable
  getDraggedClips = () => {
    return Array.from(this.draggedClips.values());
  };

  setDraggedClips = (clips: Clip[]) => {
    clips.forEach(clip => {
      const draggedClip = Clip.copy(clip);
      draggedClip.isDragging = true;
      draggedClip.isSelected = true;
      draggedClip.id = clip.id;
      draggedClip.position = draggedClip.position.add(new TimelineVector(1));
      this.draggedClips.set(draggedClip.id, draggedClip);
    });
  };

  clearDraggedClips = () => {
    this.draggedClips.clear();
  };
}
