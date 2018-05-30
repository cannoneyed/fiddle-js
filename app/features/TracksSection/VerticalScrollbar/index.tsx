import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import VerticalScroll from 'components/Scrollbars/Vertical';

import { TracksLayout } from 'core/layouts/sequencer/tracks';

@observer
export default class VerticalScrollArea extends React.Component<{}, {}> {
  tracksLayout = Container.get(TracksLayout);

  handleThumbDrag = (deltaPercentX: number, deltaPercentY: number) => {
    const { tracksLayout } = this;
    const { tracksScrollPercentY } = tracksLayout;

    const nextScrollPercentY = tracksScrollPercentY + deltaPercentY;
    tracksLayout.setTracksScroll({ y: nextScrollPercentY });
  };

  render() {
    const { tracksLayout } = this;
    const { tracksScrollPercentY, tracksViewPercentY } = tracksLayout;

    return (
      <VerticalScroll
        scrollPositionPercent={tracksScrollPercentY}
        scrollViewPercent={tracksViewPercentY}
        onDrag={this.handleThumbDrag}
      />
    );
  }
}
