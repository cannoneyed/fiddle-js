import styled from 'styled-components';
import theme from 'styles/theme';

export const MinimapContainer = styled.div`
  background: ${theme.colors.darkGray.toRgbString()};
  border: 1px solid ${theme.colors.lightGray.toRgbString()};
  height: 100%;
`;

export const MinimapThumb = styled.div`
  height: 100%;
  background-color: ${theme.colors.sliderThumb.toRgbString()};
  position: relative;
`;
