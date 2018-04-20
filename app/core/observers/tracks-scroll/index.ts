import { Container } from 'typedi';
import { autorun, IReactionDisposer } from 'mobx';

import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';
import { scrollTracks } from 'core/dom/scroll-tracks';

export const observeTracksScroll = (): IReactionDisposer => {
  const tracksSectionLayout = Container.get(TracksSectionLayout);

  return autorun(() => {
    const { tracksScrollPercentX, tracksScrollPercentY } = tracksSectionLayout.tracks;
    scrollTracks({ x: tracksScrollPercentX, y: tracksScrollPercentY });
  });
};
