import styled from 'styled-components';
import theme from 'styles/theme';

export const PageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.darkGray.toRgbString()};
`;

export const ClipSectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const MinimapWrapper = styled.div`
  width: 100%;
`;

export const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ToolbarWrapper = styled.div`
  width: 100%;
`;

export const TracksAreaWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SequencerSectionWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const VerticalScrollbarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
