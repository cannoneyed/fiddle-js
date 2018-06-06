import * as React from 'react';
import styled from 'styled-components';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { Clip as ClipModel } from 'core/models/clip';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { SequencerPositionService } from 'core/services/sequencer/position';

interface Props {
  clip: ClipModel;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any;
  isDragging?: boolean;
}

@observer
export default class Clip extends React.Component<Props, {}> {
  tracksLayout = Container.get(TracksLayout);
  sequencerPosition = Container.get(SequencerPositionService);

  render() {
    const { clip, onMouseDown } = this.props;
    const { trackHeight } = this.tracksLayout;
    const clipWidth = this.sequencerPosition.getWidth(clip.length);

    return (
      <ClipContainer
        id={clip.domId}
        height={trackHeight}
        width={clipWidth}
        isSelected={clip.isSelected}
        isDragging={clip.isDragging}
        onMouseDown={onMouseDown}
      />
    );
  }
}

export interface ClipContainerProps {
  height: number;
  width: number;
  isSelected: boolean;
  isDragging: boolean;
}
export const ClipContainer = styled<ClipContainerProps, 'div'>('div')`
  background-color: ${props => (props.isSelected ? 'purple' : 'gray')};
  border: solid 2px #ccc;
  opacity: ${props => (props.isDragging ? 0.5 : 1)};

  height: ${props => props.height}px;
  width: ${props => props.width + 1}px;
`;
