import { Container } from 'typedi';
import { computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { TimelineVector } from 'core/primitives/timeline-vector';
import { SnipStore, TrackStore } from 'core';

import { Layer } from './layer';

export interface ClipParams {
  trackId: string;
  length: TimelineVector;
  position: TimelineVector;
  snipIds?: string[];
}

export class Clip {
  private readonly snipStore = Container.get(SnipStore);
  private readonly trackStore = Container.get(TrackStore);

  id: string;

  @observable
  trackId: string;

  @observable
  length: TimelineVector;

  @observable
  position: TimelineVector;

  @observable
  snipIds: string[] = [];
  @observable
  layers: Layer[] = [];

  @observable
  isSelected = false;
  @observable
  isDragging = false;

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

  addSnip(snipId: string) {
    this.snipIds.push(snipId);
  }

  setPosition(position: TimelineVector) {
    this.position = position;
  }

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
