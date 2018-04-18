import { autorun, IReactionDisposer } from 'mobx';

import { tracksSectionLayout } from 'core/layouts/sequencer/tracks';
import { scrollTracks } from 'core/dom/scroll-tracks';

export const observeTracksScroll = (): IReactionDisposer => {
  return autorun(() => {
    const { tracksScrollPercentX, tracksScrollPercentY } = tracksSectionLayout.tracks;
    scrollTracks({ x: tracksScrollPercentX, y: tracksScrollPercentY });
  });
};
