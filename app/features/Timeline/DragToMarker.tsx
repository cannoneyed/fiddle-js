import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Caret } from 'components/Caret';

import { sequencerPositionService } from 'core/services/sequencer/position';

import { sequencerLayout, SequencerLayout } from 'core/stores/sequencer/layout';
import { timelineView, TimelineView } from 'core/stores/sequencer/view/timeline';

const styles = require('./styles.less');

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerLayout: SequencerLayout;
  timelineView: TimelineView;
}

@inject(() => ({
  sequencerLayout,
  timelineView,
}))
@observer
export class DragToMarker extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps;
  }

  render() {
    const { sequencerLayout, timelineView } = this.injected;
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
