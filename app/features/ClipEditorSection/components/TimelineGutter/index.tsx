import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Clip } from 'core/models/clip';

import { get, ClipEditorLayout } from 'features/ClipEditorSection/core';

interface Props {
  clip: Clip;
}
interface InjectedProps {
  gutterWidth: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const layout = get(props.clip, ClipEditorLayout);

  return {
    gutterWidth: layout.gutterWidth,
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
