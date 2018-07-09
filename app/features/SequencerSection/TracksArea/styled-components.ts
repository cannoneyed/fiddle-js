import styled from 'styled-components';
import theme from 'styles/theme';

export const TracksAreaContainer = styled.div`
  position: absolute;
  overflow: hidden;
  backface-visibility: hidden;
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
