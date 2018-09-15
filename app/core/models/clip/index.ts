import { Container } from 'libs/typedi';
import { computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { Graph } from 'core/models/graph';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { TrackStore } from 'core';

export interface ClipParams {
  trackId: string;
  length: TimelineVector;
  position: TimelineVector;
}

export class Clip {
  private readonly trackStore = Container.get(TrackStore);

  id: string;

  @observable
  trackId: string;

  @observable
  length: TimelineVector;

  @observable
  position: TimelineVector;

  @observable
  graph: Graph = new Graph();

  @observable
  isSelected = false;
  @observable
  isDragging = false;

  constructor(params: ClipParams) {
    const { trackId, position, length } = params;
    this.id = generateId();

    this.trackId = trackId;
    this.position = position;
    this.length = length || new TimelineVector(2);
  }

  @computed
  get end(): TimelineVector {
    return this.position.add(this.length);
  }

  @computed
  get track() {
    return this.trackStore.getTrackById(this.trackId)!;
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
    });
  }
}
