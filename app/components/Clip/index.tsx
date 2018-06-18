import * as React from 'react';
import styled from 'styled-components';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Clip as ClipModel } from 'core/models/clip';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { SequencerPositionService } from 'core/services/sequencer/position';

interface Props {
  clip: ClipModel;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any;
  isDragging?: boolean;
}
interface InjectedProps {
  height: number;
  width: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const tracksLayout = Container.get(TracksLayout);
  const sequencerPosition = Container.get(SequencerPositionService);

  const width = sequencerPosition.getWidth(props.clip.length);
  return {
    height: tracksLayout.trackHeight,
    width,
  };
});

@observer
export class Clip extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { clip, onMouseDown, height, width } = this.props;

    return (
      <ClipContainer
        id={clip.domId}
        height={height}
        width={width}
        isSelected={clip.isSelected}
        isDragging={clip.isDragging}
        onMouseDown={onMouseDown}
      />
    );
  }
}

export default inject(Clip);

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
