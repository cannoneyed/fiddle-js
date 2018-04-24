import { Service } from 'typedi';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksLayout } from 'core/layouts/sequencer/tracks/tracks';
import { TrackStore } from 'core/stores/tracks';

@Service()
export class TracksPositionService {
  constructor(
    private sequencerPageLayout: SequencerPageLayout,
    private tracksLayout: TracksLayout,
    private trackStore: TrackStore
  ) {}

  getOffsetXFromScreenX = (screenX: number) => {
    const leftEdge = this.sequencerPageLayout.tracksAreaLeft;
    const scrolledX = this.tracksLayout.tracksScrolledX;

    const offsetX = screenX - leftEdge + scrolledX;
    return offsetX;
  };

  getOffsetYFromScreenY = (screenY: number) => {
    const topEdge = this.sequencerPageLayout.tracksAreaTop;
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
