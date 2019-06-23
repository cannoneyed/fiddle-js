import { Inject, Service } from 'libs/typedi';

import { TracksLayout } from 'features/Sequencer/core';

@Service()
export default class SequencerScrollInteraction {
  @Inject(_ => TracksLayout)
  private tracksLayout: TracksLayout;

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
