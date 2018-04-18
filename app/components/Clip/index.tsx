import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { ClipContainer } from './styled-components';

import { Clip as ClipModel } from 'core/models/clip';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

interface Props {
  clip: ClipModel;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any;
  isDragging?: boolean;
  tracksSectionLayout: TracksSectionLayout;
}

@observer
export class Clip extends React.Component<Props, {}> {
  render() {
    const { clip, onMouseDown, tracksSectionLayout } = this.props;
    const { trackHeight } = tracksSectionLayout.tracks;

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

export default connect(Clip, 'tracksSectionLayout');
