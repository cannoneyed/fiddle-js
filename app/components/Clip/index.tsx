import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { ClipContainer } from './styled-components';

import { Clip as ClipModel } from 'core/models/clip';
import { SequencerView } from 'core/stores/sequencer/view';

interface Props {
  clip: ClipModel;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any;
  isDragging?: boolean;
  sequencerView: SequencerView;
}

@observer
export class Clip extends React.Component<Props, {}> {
  render() {
    const { clip, onMouseDown, sequencerView } = this.props;
    const { trackHeight } = sequencerView.tracks;

    return (
      <ClipContainer
        id={clip.domId}
        height={trackHeight}
        width={clip.width}
        isSelected={clip.isSelected}
        onMouseDown={onMouseDown}
      />
    );
  }
}

export default connect(Clip, 'sequencerView');
