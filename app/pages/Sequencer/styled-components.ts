import styled from 'styled-components';

export const PageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #232c39;
  background-image: linear-gradient(45deg, rgba(0, 216, 255, 0.5) 10%, rgba(0, 1, 127, 0.7));
`;

export interface HeightProps {
  height: number;
}

export const ToolbarWrapper = styled<HeightProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: 100%;
`;

export const MinimapWrapper = styled<HeightProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: 100%;
`;

export const TimelineWrapper = styled<HeightProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const TracksAreaWrapper = styled<HeightProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const EditAreaWrapper = styled<HeightProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
