import styled from 'styled-components';
import theme from 'styles/theme';

export const TimelineContainer = styled.div`
  height: ${theme.timelineHeight.toString()};
  padding: 0;
  position: relative;
  z-index: ${theme.tracksZIndex};
  flex-grow: 1;

  transform: translate3D(0, 0, 0);
  backface-visibility: hidden;
`;

export const TimelineSegmentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const TimelineSegment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background-color: ${theme.colors.black.toRgbString()};
  height: 100%;
`;

export const TimelineDivider = styled.div`
  height: 10px;
  width: 1px;
  border-left: solid 1px ${theme.colors.lightGray.toRgbString()};
  margin-left: -1px;
`;

export const TimelineLabel = styled.div`
  color: ${theme.colors.lightGray.toRgbString()};
  margin-left: 2px;
  font-size: 10px;
`;
