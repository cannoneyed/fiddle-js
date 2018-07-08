import { Inject, Service } from 'typedi';

import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { TrackStore } from 'core/state/stores/tracks';

@Service()
export class TracksPositionService {
  @Inject(type => TracksLayout)
  private tracksLayout: TracksLayout;
  @Inject(type => SequencerSectionLayout)
  private sequencerSectionLayout: SequencerSectionLayout;
  @Inject(type => TrackStore)
  private trackStore: TrackStore;

  getOffsetXFromScreenX = (screenX: number) => {
    const leftEdge = this.sequencerSectionLayout.tracksAreaRectangle.left;
    const scrolledX = this.tracksLayout.tracksScrolledX;

    const offsetX = screenX - leftEdge + scrolledX;
    return offsetX;
  };

  getOffsetYFromScreenY = (screenY: number) => {
    const topEdge = this.sequencerSectionLayout.tracksAreaRectangle.top;
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
