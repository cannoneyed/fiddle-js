import styled from 'styled-components';
import theme from 'styles/theme';

export const ClipEditorSectionWrapper = styled.div`
  width: 100%;
  background-color: ${theme.colors.black.toRgbString()};
  position: relative;
`;

export const EditAreaWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ToolbarWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${theme.colors.lightGray.toRgbString()};
`;
