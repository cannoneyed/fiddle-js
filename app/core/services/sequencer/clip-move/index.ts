import { Service } from 'typedi';

import { Clip } from 'core/models/clip';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { TrackStore } from 'core/state/stores/tracks';

@Service({ global: true })
export class ClipMoveService {
  constructor(private trackStore: TrackStore) {}

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
