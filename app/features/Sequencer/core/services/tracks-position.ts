import { Inject, Service } from 'libs/typedi';

import { SequencerLayout } from 'features/Sequencer/core';
import { TracksLayout } from 'features/Sequencer/core';
import { TrackStore } from 'core';

@Service()
export default class TracksPositionService {
  @Inject(type => TracksLayout)
  private tracksLayout: TracksLayout;
  @Inject(type => SequencerLayout)
  private sequencerSectionLayout: SequencerLayout;
  @Inject(type => TrackStore)
  private trackStore: TrackStore;

  getOffsetXFromScreenX = (screenX: number) => {
    const leftEdge = this.sequencerSectionLayout.tracksStagePosition.left;
    const scrolledX = this.tracksLayout.tracksScrolledX;

    const offsetX = screenX - leftEdge + scrolledX;
    return offsetX;
  };

  getOffsetYFromScreenY = (screenY: number) => {
    const topEdge = this.sequencerSectionLayout.tracksPosition.top;
    const scrolledY = this.tracksLayout.tracksScrolledY;

    const offsetY = screenY - topEdge + scrolledY;
    return offsetY;
  };

  getTrackFromOffsetY = (offsetY: number) => {
    if (offsetY <= 0) {
      return this.trackStore.firstTrack;
    } else if (offsetY >= this.tracksLayout.tracksHeight) {
      return this.trackStore.lastTrack;
    }

    let trackTop = 0;
    for (const track of this.trackStore.trackList) {
      const trackBottom = trackTop + this.tracksLayout.trackHeight;
      if (offsetY >= trackTop && offsetY < trackBottom) {
        return track;
      }
      trackTop = trackBottom;
    }

    return this.trackStore.firstTrack;
  };
}
