import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import VerticalScroll from 'components/Scrollbars/Vertical';

import { SequencerView } from 'core/stores/sequencer/view';

interface Props {
  sequencerView: SequencerView;
}

@observer
export class VerticalScrollArea extends React.Component<Props, {}> {
  render() {
    const { sequencerView } = this.props;

    const { tracksScrollPercentY, tracksViewPercentY } = sequencerView.tracks;

    return (
      <VerticalScroll
        scrollPositionPercent={tracksScrollPercentY}
        scrollViewPercent={tracksViewPercentY}
      />
    );
  }
}

export default connect(VerticalScrollArea, 'sequencerView');
