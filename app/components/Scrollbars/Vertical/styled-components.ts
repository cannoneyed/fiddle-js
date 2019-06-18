import styled from 'styled-components';
import theme from 'styles/theme';

export const ScrollbarWrapper = styled.div`
  height: 100%;
  width: 100%;
  border-left: 1px solid ${theme.colors.lightGray.toRgbString()};
  background-color: ${theme.colors.mediumGray.toRgbString()};
`;

export const ScrollBackButton = styled.div`
  width: 100%;
  height: 0;
`;

export const ScrollbarArea = styled.div`
  width: 100%;
  height: 100%;
`;

export const ScrollForwardButton = styled.div`
  width: 100%;
  height: 0;
`;

export interface ThumbProps {
  highlight: boolean;
}
export const ScrollbarThumb = styled.div<ThumbProps>`
  width: 100%;
  position: relative;

  background-color: ${({ highlight }) => {
    return highlight
      ? theme.colors.sliderThumbHighlight.toRgbString()
      : theme.colors.sliderThumb.toRgbString();
  }};
`;
