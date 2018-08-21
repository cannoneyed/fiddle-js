import { Inject, Service } from 'libs/typedi';

import { Clip } from 'core/models/clip';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { TrackStore } from 'core';

@Service()
export default class __ClipMoveService {
  @Inject(_ => TrackStore)
  private trackStore: TrackStore;

  moveClip(clip: Clip, deltaTimeline: TimelineVector, deltaTrackIndex = 0) {
    this.moveClips([clip], deltaTimeline);
  }

  moveClips(clips: Clip[], deltaTimeline: TimelineVector, deltaTrackIndex = 0) {
    clips.forEach(clip => {
      const nextPosition = clip.position.add(deltaTimeline);
      clip.setPosition(nextPosition);

      const nextIndex = clip.track.index + deltaTrackIndex;
      const nextTrack = this.trackStore.getTrackByIndex(nextIndex);
      clip.setTrackId(nextTrack.id);
    });
  }
}
