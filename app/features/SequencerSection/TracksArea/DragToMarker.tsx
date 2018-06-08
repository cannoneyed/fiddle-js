import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { SequencerPositionService } from 'core/services/sequencer/position';

import { MainPageLayout } from 'core/state/layouts/main/page';
import { TimelineLayout } from 'core/state/layouts/sequencer/timeline';

@observer
export default class DragToMarker extends React.Component<{}, {}> {
  sequencerPageLayout = Container.get(MainPageLayout);
  timelineLayout = Container.get(TimelineLayout);
  sequencerPositionService = Container.get(SequencerPositionService);

  render() {
    const { dropTargetPosition } = this.timelineLayout;

    if (!dropTargetPosition) {
      return null;
    }

    const tracksAreaHeight = this.sequencerPageLayout.tracksAreaHeight;
    const offsetX = this.sequencerPositionService.getOffsetX(dropTargetPosition);

    // const caretSize = 10;

    const style = {
      left: offsetX - 1,
      height: tracksAreaHeight,
    };

    return <DragToMarkerBar style={style} />;
  }
}

const DragToMarkerBar = styled.div`
  position: absolute;
  z-index: 999;
  position: absolute;
  width: 1px;
  background-color: ${theme.colors.white.toRgbString()};
`;
