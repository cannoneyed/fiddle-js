import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import VerticalScroll from 'components/Scrollbars/Vertical';

import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

interface Props {
  tracksSectionLayout: TracksSectionLayout;
}

@observer
export class VerticalScrollArea extends React.Component<Props, {}> {
  handleThumbDrag = (deltaPercentX: number, deltaPercentY: number) => {
    const { tracksSectionLayout } = this.props;
    const { tracksScrollPercentY } = tracksSectionLayout.tracks;

    const nextScrollPercentY = tracksScrollPercentY - deltaPercentY;
    tracksSectionLayout.tracks.setTracksScroll({ y: nextScrollPercentY });
  };

  render() {
    const { tracksSectionLayout } = this.props;

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

export default connect(VerticalScrollArea, 'tracksSectionLayout');
