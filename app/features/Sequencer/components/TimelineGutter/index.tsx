import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

interface Props {}
interface InjectedProps {}

@observer
export class TimelineGutter extends React.Component<Props & InjectedProps, {}> {
  render() {
    return <TimelineGutterContainer />;
  }
}

export default TimelineGutter;

const TimelineGutterContainer = styled.div`
  position: relative;
  height: ${theme.timelineHeight.toString()};
  padding: 0;
  z-index: 30;
  flex-grow: 0;
  background-color: ${theme.colors.black.toRgbString()};
  border-right: 1px solid ${theme.colors.mediumGray.toRgbString()};
`;
