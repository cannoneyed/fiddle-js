import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';

import { Track } from 'core/models/track';

import { get, TracksLayout } from 'features/Sequencer/core';

interface Props {
  index: number;
  track: Track;
}
interface InjectedProps {
  height: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const tracksLayout = get(TracksLayout);
  return {
    height: tracksLayout.trackHeight,
  };
});

@observer
export class TrackHeader extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { index, height, track } = this.props;

    const headerStyle = {
      height,
    };

    return (
      <TrackHeaderContainer style={headerStyle}>
        {index} : {track.id}
      </TrackHeaderContainer>
    );
  }
}

export default inject(hot(module)(TrackHeader));

const TrackHeaderContainer = styled.div`
  width: 100%;
  background-color: ${theme.colors.darkGray.toRgbString()};
  border-bottom: 1px solid ${theme.colors.lightGray.toRgbString()};
  color: ${theme.colors.lightGray.toRgbString()};
`;
