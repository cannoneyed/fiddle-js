import styled from 'styled-components';

export const PageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #232c39;
  background-image: linear-gradient(45deg, rgba(0, 216, 255, 0.5) 10%, rgba(0, 1, 127, 0.7));
`;

interface HeightProps {
  height: number;
}

interface WidthProps {
  width: number;
}

type SizeProps = HeightProps & WidthProps;

export const EditAreaWrapper = styled<HeightProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const MinimapWrapper = styled<HeightProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: 100%;
`;

export const TimelineWrapper = styled<SizeProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  display: flex;
  flex-direction: row;
`;

export const ToolbarWrapper = styled<HeightProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: 100%;
`;

export const TracksAreaWrapper = styled<SizeProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  display: flex;
  flex-direction: row;
`;

export const WorkspaceWrapper = styled<HeightProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: 100%;
  position: relative;
`;

export const VerticalScrollAreaWrapper = styled<SizeProps, 'div'>('div')`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  position: absolute;
  top: 0;
  right: 0;
`;
