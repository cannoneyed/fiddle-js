import styled from 'styled-components';
import theme from 'styles/theme';

export const TracksAreaContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;
  background-color: cornflowerblue;
  position: relative;

  transform: translate3D(0, 0, 0);
  backface-visibility: hidden;
`;

interface GridContainerProps {
  height: number;
}
export const GridContainer = styled<GridContainerProps, 'div'>('div')`
  position: absolute;
  top: 0;
  z-index: ${theme.verticalGridZIndex};

  height: ${props => props.height}px;
`;

export const TracksContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: ${theme.tracksZIndex};
  width: 100%;
`;
