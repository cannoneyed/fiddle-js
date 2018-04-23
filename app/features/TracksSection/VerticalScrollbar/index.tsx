import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import VerticalScroll from 'components/Scrollbars/Vertical';

import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

interface Props {}

@observer
export default class VerticalScrollArea extends React.Component<Props, {}> {
  tracksSectionLayout = Container.get(TracksSectionLayout);

  handleThumbDrag = (deltaPercentX: number, deltaPercentY: number) => {
    const { tracksSectionLayout } = this;
    const { tracksScrollPercentY } = tracksSectionLayout.tracks;

    const nextScrollPercentY = tracksScrollPercentY + deltaPercentY;
    tracksSectionLayout.tracks.setTracksScroll({ y: nextScrollPercentY });
  };

  render() {
    const { tracksSectionLayout } = this;
    const { tracksScrollPercentY, tracksViewPercentY } = tracksSectionLayout.tracks;

    return (
      <VerticalScroll
        scrollPositionPercent={tracksScrollPercentY}
        scrollViewPercent={tracksViewPercentY}
        onDrag={this.handleThumbDrag}
      />
    );
  }
}
