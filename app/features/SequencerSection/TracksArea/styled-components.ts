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

export const GridContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: ${theme.verticalGridZIndex};
`;

export const TracksContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: ${theme.tracksZIndex};
  width: 100%;
`;
