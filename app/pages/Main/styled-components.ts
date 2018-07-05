import styled from 'styled-components';
import theme from 'styles/theme';

export const PageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.darkGray.toRgbString()};
`;

export const ToolbarWrapper = styled.div`
  width: 100%;
`;
