import styled from 'styled-components';
import theme from 'styles/theme';

export const TracksAreaContainer = styled.div`
  overflow: hidden;
  transform: translate3D(0, 0, 0);
  backface-visibility: hidden;

  width: 100%;
  height: 100%;
`;

export const GridContainer = styled.div`
  position: asbolute;
  top: 0;
  left: 0;
  z-index: ${theme.verticalGridZIndex};
`;

export const TracksContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: ${theme.tracksZIndex};
  width: 100%;
`;
