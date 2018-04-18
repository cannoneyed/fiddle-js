import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { Caret } from 'components/Caret';

import { sequencerPositionService } from 'core/services/sequencer/position';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

const styles = require('./styles.less');

interface Props {
  sequencerPageLayout: SequencerPageLayout;
  tracksSectionLayout: TracksSectionLayout;
}

@observer
export class DragToMarker extends React.Component<Props, {}> {
  render() {
    const { sequencerPageLayout, tracksSectionLayout } = this.props;
    const { dropTargetPosition } = tracksSectionLayout.timeline;

    if (!dropTargetPosition) {
      return null;
    }

    const timelineHeight = sequencerPageLayout.timelineHeight;
    const offsetX = sequencerPositionService.getOffsetX(dropTargetPosition);

    const caretSize = 10;

    const style = {
      left: offsetX - caretSize / 2 - 1,
      top: timelineHeight - caretSize + 2,
    };

    return (
      <div className={styles.dragToMarkerContainer} style={style}>
        <Caret size={caretSize} />
      </div>
    );
  }
}

export default connect(DragToMarker, 'sequencerPageLayout', 'tracksSectionLayout');
