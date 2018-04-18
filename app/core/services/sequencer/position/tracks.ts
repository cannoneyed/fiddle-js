import { tracksLayout } from 'core/layouts/sequencer/tracks/tracks';
import { sequencerPageLayout } from 'core/layouts/sequencer/page';

export class TracksPositionService {
  getOffsetXFromScreenX = (screenX: number) => {
    const leftEdge = sequencerPageLayout.tracksAreaLeft;
    const scrolledX = tracksLayout.tracksScrolledX;

    const offsetX = screenX - leftEdge + scrolledX;
    return offsetX;
  };
}

export const tracksPositionService = new TracksPositionService();
