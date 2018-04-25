import { Container } from 'typedi';
import { action, computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { SequencerPositionService } from 'core/services/sequencer/position';

import { ScreenVector } from 'core/primitives/screen-vector';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { TrackStore } from 'core/stores/tracks';

export interface ClipParams {
  trackId: string;
  position: TimelineVector;
}

export class Clip {
  trackStore = Container.get(TrackStore);
  sequencerPositionService = Container.get(SequencerPositionService);

  id: string;
  domId: string;

  @observable trackId: string;
  @observable length: TimelineVector;
  @observable position: TimelineVector;

  @observable isSelected = false;

  constructor(params: ClipParams) {
    const { trackId, position } = params;
    this.id = generateId();
    this.domId = `clip_${this.id}`;

    this.trackId = trackId;
    this.position = position;
    this.length = new TimelineVector(2);
  }

  @computed
  get end() {
    return this.position.add(this.length);
  }

  @computed
  get width() {
    return this.sequencerPositionService.getOffsetX(this.length);
  }

  @computed
  get offsetX() {
    return this.sequencerPositionService.getOffsetX(this.position);
  }

  @computed
  get offsetY() {
    return 0;
  }

  @computed
  get track() {
    return this.trackStore.getTrackById(this.trackId)!;
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
    const track = this.trackStore.getTrackById(this.trackId);
    if (track) {
      // track.removeClip(this.id)
    }

    // Delete from the clipStore store
  };

  @action
  setPosition(position: TimelineVector) {
    this.position = position;
  }

  @action
  setTrackId(trackId: string) {
    this.trackId = trackId;
  }
}
