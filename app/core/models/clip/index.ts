import { action, computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { sequencerPositionService } from 'core/services/sequencer/position';

import { ScreenVector } from 'core/classes/screen-vector';
import { TimelineVector } from 'core/classes/timeline-vector';
import { trackStore } from 'core/stores/tracks';

export interface IClipConstructorParams {
  trackId: string;
  position: TimelineVector;
}

export class Clip {
  id: string;
  domId: string;

  @observable trackId: string;
  @observable length: TimelineVector;
  @observable position: TimelineVector;

  @observable isSelected = false;

  constructor(params: IClipConstructorParams) {
    const { trackId, position } = params;
    this.id = generateId();
    this.domId = `clip_${this.id}`;

    this.trackId = trackId;
    this.position = position;
    this.length = new TimelineVector(2);
  }

  @computed
  get width() {
    return sequencerPositionService.getOffsetX(this.length);
  }

  @computed
  get offsetX() {
    return sequencerPositionService.getOffsetX(this.position);
  }

  @computed
  get offsetY() {
    return 0;
  }

  @computed
  get track() {
    return trackStore.getTrackById(this.trackId);
  }

  getScreenVector = () => {
    const clipElement = document.getElementById(this.domId);
    if (clipElement) {
      const { left, top } = clipElement.getBoundingClientRect();
      return new ScreenVector(left, top);
    }
    return new ScreenVector();
  };

  @action
  delete = () => {
    // Delete reference from the track
    const track = trackStore.getTrackById(this.trackId);
    if (track) {
      // track.removeClip(this.id)
    }

    // Delete from the clipStore store
  };

  @action
  setPosition(position: TimelineVector) {
    this.position = position;
  }
}
