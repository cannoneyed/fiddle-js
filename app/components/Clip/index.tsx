import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { ClipContainer } from './styled-components';

import { Clip as ClipModel } from 'core/models/clip';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

interface Props {
  clip: ClipModel;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any;
  isDragging?: boolean;
}

@observer
export default class Clip extends React.Component<Props, {}> {
  tracksSectionLayout = Container.get(TracksSectionLayout);

  render() {
    const { clip, onMouseDown } = this.props;
    const { trackHeight } = this.tracksSectionLayout.tracks;

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
