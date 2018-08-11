import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import { injectCore } from 'features/ClipEditorSection/core';

interface Props {}
interface InjectedProps {
  gutterWidth: number;
}

const inject = injectCore<Props, InjectedProps>((_, core) => {
  return {
    gutterWidth: core.layout.gutterWidth,
  };
});

@observer
export class TimelineGutter extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { gutterWidth } = this.props;

    const style = {
      minWidth: gutterWidth,
    };

    return <TimelineGutterContainer style={style} />;
  }
}

export default inject(TimelineGutter);

const TimelineGutterContainer = styled.div`
  position: relative;
  height: ${theme.timelineHeight.toString()};
  padding: 0;
  z-index: ${theme.tracksZIndex};
  flex-grow: 0;
  background-color: ${theme.colors.black.toRgbString()};
  border-right: 1px solid ${theme.colors.mediumGray.toRgbString()};
`;
