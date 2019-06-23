import { Service } from 'libs/typedi';
import { observable, computed } from 'mobx';

import { Clip } from 'core/models/clip';
import { TimelineVector } from 'core/primitives/timeline-vector';

@Service({ global: true })
export default class DraggedClips {
  // The temporary store for clips being dragged in the sequencer
  @observable
  draggedClipsMap = observable.map<string, Clip>({});

  @computed
  get clips() {
    return [...this.draggedClipsMap.values()];
  }

  setDraggedClips = (clips: Clip[]) => {
    clips.forEach(clip => {
      const draggedClip = Clip.copy(clip);
      draggedClip.isDragging = true;
      draggedClip.isSelected = true;
      draggedClip.id = clip.id;
      draggedClip.position = draggedClip.position.add(new TimelineVector(1));
      this.draggedClipsMap.set(draggedClip.id, draggedClip);
    });
  };

  clearDraggedClips = () => {
    this.draggedClipsMap.clear();
  };
}
