import { Service } from 'typedi';

import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

@Service()
export class SequencerScrollInteraction {
  constructor(private tracksLayout: TracksLayout) {}

  handleScroll = (deltaX: number, deltaY: number) => {
    const {
      scrollPercentX: percentX,
      scrollPercentY: percentY,
      trackWidth: width,
      tracksHeight: height,
      tracksScrollableWidth: scrollableW,
      tracksScrollableHeight: scrollableH,
    } = this.tracksLayout;

    const nextPercentX = scrollableW > 0 ? percentX + deltaX / width : percentX;
    const nextPercentY = scrollableH > 0 ? percentY + deltaY / height : percentY;

    this.tracksLayout.setTracksScroll({ x: nextPercentX, y: nextPercentY });
  };
}
