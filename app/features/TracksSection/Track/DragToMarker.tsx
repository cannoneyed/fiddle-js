import * as React from 'react';
import styled from 'styled-components';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { SequencerPositionService } from 'core/services/sequencer/position';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

@observer
export default class DragToMarker extends React.Component<{}, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);
  tracksSectionLayout = Container.get(TracksSectionLayout);
  sequencerPositionService = Container.get(SequencerPositionService);

  render() {
    const tracksLayout = this.tracksSectionLayout.tracks;
    const { dropTargetPosition } = tracksLayout;

    if (!dropTargetPosition) {
      return null;
    }

    const trackHeight = tracksLayout.trackHeight;
    const offsetX = this.sequencerPositionService.getOffsetX(dropTargetPosition);

    const style = {
      left: offsetX - 1,
      height: trackHeight,
    };

    return <DragToMarkerContainer className="trackDragToMarker" style={style} />;
  }
}

const DragToMarkerContainer = styled.div`
  position: absolute;
  display: flex;
  width: 2px;
  background-color: yellow;
`;
