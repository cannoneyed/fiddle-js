import { tracksView } from 'core/stores/sequencer/view/tracks';
import { sequencerLayout } from 'core/stores/sequencer/layout';

export class TracksPositionService {
  getOffsetXFromScreenX = (screenX: number) => {
    const leftEdge = sequencerLayout.tracksAreaLeft;
    const scrolledX = tracksView.tracksScrolledX;

    const offsetX = screenX - leftEdge + scrolledX;
    return offsetX;
  };
}

export const tracksPositionService = new TracksPositionService();
