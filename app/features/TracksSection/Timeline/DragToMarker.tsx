import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import Caret from 'components/Caret';

import { SequencerPositionService } from 'core/services/sequencer/position';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

import { DragToMarkerContainer } from './styled-components';

@observer
export default class DragToMarker extends React.Component<{}, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);
  tracksSectionLayout = Container.get(TracksSectionLayout);
  sequencerPositionService = Container.get(SequencerPositionService);

  render() {
    const { tracksSectionLayout } = this;
    const { dropTargetPosition } = tracksSectionLayout.timeline;

    if (!dropTargetPosition) {
      return null;
    }

    const timelineHeight = this.sequencerPageLayout.timelineHeight;
    const offsetX = this.sequencerPositionService.getOffsetX(dropTargetPosition);

    const caretSize = 10;

    const style = {
      left: offsetX - caretSize / 2 - 1,
      top: timelineHeight - caretSize + 2,
    };

    return (
      <DragToMarkerContainer style={style}>
        <Caret size={caretSize} />
      </DragToMarkerContainer>
    );
  }
}
