import { Container, Service } from 'typedi';

import { TracksLayout } from 'core/layouts/sequencer/tracks/tracks';
import { SequencerPageLayout } from 'core/layouts/sequencer/page';

@Service()
export class TracksPositionService {
  sequencerPageLayout = Container.get(SequencerPageLayout);
  tracksLayout = Container.get(TracksLayout);

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
}
