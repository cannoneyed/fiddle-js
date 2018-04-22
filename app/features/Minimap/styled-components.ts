import styled from 'styled-components';
import theme from 'styles/theme';

export const MinimapContainer = styled.div`
  background: ${theme.colors.darkGray.toRgbString()};
  border-top: 1px solid ${theme.colors.lightGray.toRgbString()};
  border-bottom: 1px solid ${theme.colors.lightGray.toRgbString()};
  height: 100%;
`;

export interface ThumbProps {
  highlight: boolean;
}
export const MinimapThumb = styled<ThumbProps, 'div'>('div')`
  height: 100%;
  background-color: ${({ highlight }) => {
    return highlight
      ? theme.colors.sliderThumbHighlight.toRgbString()
      : theme.colors.sliderThumb.toRgbString();
  }};
  position: relative;
  transition: background-color ease-in 100ms;
`;
