import { Container } from 'typedi';
import { action, computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';
import { json } from 'core/serialization/json';

import { SequencerPositionService } from 'core/services/sequencer/position';

import { ScreenVector } from 'core/primitives/screen-vector';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { TrackStore } from 'core/state/stores/tracks';

export interface ClipParams {
  trackId: string;
  length: TimelineVector;
  position: TimelineVector;
}

export class Clip {
  trackStore = Container.get(TrackStore);
  sequencerPositionService = Container.get(SequencerPositionService);

  @json id: string;

  @json
  @observable
  trackId: string;

  @json
  @observable
  length: TimelineVector;

  @json
  @observable
  position: TimelineVector;

  @observable isSelected = false;
  @observable isDragging = false;

  constructor(params: ClipParams) {
    const { trackId, position, length } = params;
    this.id = generateId();

    this.trackId = trackId;
    this.position = position;
    this.length = length || new TimelineVector(2);
  }

  get domId(): string {
    return `clip_${this.id}`;
  }

  @computed
  get end(): TimelineVector {
    return this.position.add(this.length);
  }

  @computed
  get width(): number {
    return this.sequencerPositionService.getOffsetX(this.length);
  }

  @computed
  get offsetX(): number {
    return this.sequencerPositionService.getOffsetX(this.position);
  }

  @computed
  get offsetY(): number {
    return 0;
  }

  @computed
  get track() {
    return this.trackStore.getTrackById(this.trackId)!;
  }

  getScreenVector = (): ScreenVector => {
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

  static copy(clip: Clip) {
    return new Clip({
      trackId: clip.trackId,
      length: clip.length,
      position: clip.position,
    });
  }
}
