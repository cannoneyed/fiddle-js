// import { Container } from 'typedi';
import { autorun, IReactionDisposer } from 'mobx';

// import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
// import { scrollTracks } from 'core/dom/scroll-tracks';

export const observeTracksScroll = (): IReactionDisposer => {
  // const tracksLayout = Container.get(TracksLayout);

  return autorun(() => {
    // const { tracksScrollPercentX, tracksScrollPercentY } = tracksLayout;
    // scrollTracks({ x: tracksScrollPercentX, y: tracksScrollPercentY });
  });
};
