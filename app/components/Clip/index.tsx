import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Clip as ClipModel } from 'core/models/clip';

interface Props {
  clip: ClipModel;
  height: number;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any;
  isDragging?: boolean;
}

@observer
export default class Clip extends React.Component<Props, {}> {
  render() {
    const { clip, height, onMouseDown } = this.props;

    return (
      <ClipElement
        id={clip.domId}
        height={height}
        width={clip.width}
        isSelected={clip.isSelected}
        isDragging={clip.isDragging}
        onMouseDown={onMouseDown}
      />
    );
  }
}

export interface ClipElementProps {
  height: number;
  width: number;
  isSelected: boolean;
  isDragging: boolean;
}
export const ClipElement = styled<ClipElementProps, 'div'>('div')`
  background-color: ${props => (props.isSelected ? 'purple' : 'gray')};
  border: solid 2px #ccc;
  opacity: ${props => (props.isDragging ? 0.5 : 1)};

  height: ${props => props.height}px;
  width: ${props => props.width + 1}px;
`;
