import { Container } from 'typedi';

import { tracksLayout } from 'core/layouts/sequencer/tracks/tracks';
import { SequencerPageLayout } from 'core/layouts/sequencer/page';

export class TracksPositionService {
  sequencerPageLayout = Container.get(SequencerPageLayout);

  getOffsetXFromScreenX = (screenX: number) => {
    const leftEdge = this.sequencerPageLayout.tracksAreaLeft;
    const scrolledX = tracksLayout.tracksScrolledX;

    const offsetX = screenX - leftEdge + scrolledX;
    return offsetX;
  };
}

export const tracksPositionService = new TracksPositionService();
