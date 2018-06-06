import { Container } from 'typedi';
import { action, computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';
import { json } from 'core/serialization/json';

import { TimelineVector } from 'core/primitives/timeline-vector';
import { SnipStore } from 'core/state/stores/snips';
import { TrackStore } from 'core/state/stores/tracks';

export interface ClipParams {
  trackId: string;
  length: TimelineVector;
  position: TimelineVector;
  snipIds?: string[];
}

export class Clip {
  private readonly snipStore = Container.get(SnipStore);
  private readonly trackStore = Container.get(TrackStore);

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

  @observable private readonly snipIds: string[] = [];

  constructor(params: ClipParams) {
    const { trackId, position, length, snipIds } = params;
    this.id = generateId();

    this.trackId = trackId;
    this.position = position;
    this.length = length || new TimelineVector(2);
    this.snipIds = snipIds || [];
  }

  get domId(): string {
    return `clip_${this.id}`;
  }

  @computed
  get end(): TimelineVector {
    return this.position.add(this.length);
  }

  @computed
  get track() {
    return this.trackStore.getTrackById(this.trackId)!;
  }

  @computed
  get snips() {
    return this.snipIds.map(snipId => this.snipStore.getSnip(snipId)!);
  }

  @action
  addSnip(snipId: string) {
    this.snipIds.push(snipId);
  }

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
      snipIds: clip.snipIds,
    });
  }
}
