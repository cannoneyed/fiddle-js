import * as React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

const styles = require('./styles.less');

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

    const clipStyle = {
      height: trackHeight,
      width: clip.width + 1,
    };

    const className = classnames(styles.clipContainer, clip.isSelected ? styles.isSelected : null);

    return (
      <div id={clip.domId} className={className} style={clipStyle} onMouseDown={onMouseDown} />
    );
  }
}

export default connect(Clip, 'sequencerView');
