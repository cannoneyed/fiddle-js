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
  handleThumbDrag = (deltaPercentX: number, deltaPercentY: number) => {
    const { sequencerView } = this.props;
    const { tracksScrollPercentY } = sequencerView.tracks;

    const nextScrollPercentY = tracksScrollPercentY - deltaPercentY;
    sequencerView.tracks.setTracksScroll({ y: nextScrollPercentY });
  };

  render() {
    const { sequencerView } = this.props;

    const { tracksScrollPercentY, tracksViewPercentY } = sequencerView.tracks;

    return (
      <VerticalScroll
        scrollPositionPercent={tracksScrollPercentY}
        scrollViewPercent={tracksViewPercentY}
        onDrag={this.handleThumbDrag}
      />
    );
  }
}

export default connect(VerticalScrollArea, 'sequencerView');
