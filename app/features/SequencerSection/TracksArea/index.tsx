import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import Track from 'features/SequencerSection/Track';

import { Track as TrackModel } from 'core/models/track';
import { TrackStore } from 'core/state/stores/tracks';

import DragToMarker from './DragToMarker';
import { TracksAreaContainer, TracksContainer } from './styled-components';

interface Props {}
interface InjectedProps {
  tracks: TrackModel[];
}

const inject = injector<Props, InjectedProps>(props => {
  const trackStore = Container.get(TrackStore);
  const { trackList } = trackStore;
  return {
    tracks: trackList,
  };
});

@observer
export class TracksArea extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { tracks } = this.props;

    return (
      <TracksAreaContainer id="tracksArea">
        <DragToMarker />
        <TracksContainer>
          {tracks.map((track, index) => <Track track={track} index={index} key={index} />)}
        </TracksContainer>
      </TracksAreaContainer>
    );
  }
}

export default inject(TracksArea);
