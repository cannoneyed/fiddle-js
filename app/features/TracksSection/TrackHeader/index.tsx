import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { Track } from 'core/models/track';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

interface Props {
  index: number;
  track: Track;
}

@observer
export default class TrackHeader extends React.Component<Props, {}> {
  tracksSectionLayout = Container.get(TracksSectionLayout);

  render() {
    const { index, track } = this.props;
    const { trackHeight } = this.tracksSectionLayout.tracks;

    const headerStyle = {
      height: trackHeight,
    };

    return (
      <TrackHeaderContainer style={headerStyle}>
        {index} : {track.id}
      </TrackHeaderContainer>
    );
  }
}

const TrackHeaderContainer = styled.div`
  width: 100%;
  background-color: ${theme.colors.darkGray.toRgbString()};
  border-bottom: 1px solid ${theme.colors.lightGray.toRgbString()};
  color: ${theme.colors.lightGray.toRgbString()};
`;
