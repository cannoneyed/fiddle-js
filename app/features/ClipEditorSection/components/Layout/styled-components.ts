import styled from 'styled-components';
import theme from 'styles/theme';

export const BottomWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ClipEditorSectionWrapper = styled.div`
  width: 100%;
  background-color: ${theme.colors.black.toRgbString()};
  position: relative;
`;

export const EditAreaWrapper = styled.div`
  position: absolute;
`;

export const GutterWrapper = styled.div`
  position: absolute;
  overflow: hidden;
`;

export const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TopWrapper = styled.div`
  position: absolute;
  width: 100%;
`;

export const ToolbarWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${theme.colors.lightGray.toRgbString()};
`;
