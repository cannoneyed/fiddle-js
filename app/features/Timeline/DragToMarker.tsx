import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { Caret } from 'components/Caret';

import { sequencerPositionService } from 'core/services/sequencer/position';

import { SequencerLayout } from 'core/stores/sequencer/layout';
import { TimelineView } from 'core/stores/sequencer/view/timeline';

const styles = require('./styles.less');

interface Props {
  sequencerLayout: SequencerLayout;
  timelineView: TimelineView;
}

@observer
export class DragToMarker extends React.Component<Props, {}> {
  render() {
    const { sequencerLayout, timelineView } = this.props;
    const { dropTargetPosition } = timelineView;

    if (!dropTargetPosition) {
      return null;
    }

    const timelineHeight = sequencerLayout.timelineHeight;
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

export default connect(DragToMarker, 'sequencerLayout', 'timelineView');
