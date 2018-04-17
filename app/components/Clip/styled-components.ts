import styled from 'styled-components';

export interface ClipContainerProps {
  height: number;
  width: number;
  isSelected: boolean;
}
export const ClipContainer = styled<ClipContainerProps, 'div'>('div')`
  background-color: ${props => (props.isSelected ? 'purple' : 'gray')};
  border: solid 2px #ccc;

  height: ${props => props.height}px;
  width: ${props => props.width + 1}px;
`;
