import * as React from 'react';
import { observer } from 'mobx-react';

import { Clip } from 'core/models/clip';

export interface Props {
  clip: Clip;
}
export interface InjectedProps {}

@observer
export class ClipEdit extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { clip } = this.props;
    return <h1>{clip.id}</h1>;
    // return (
    //   <ClipEditContainer>
    //     <DragToMarker />
    //     <GridContainer style={gridStyle}>
    //       <VerticalGrid gridCount={gridCount} gridSegmentWidth={gridSegmentWidth} />
    //     </GridContainer>
    //     <TracksContainer>
    //       {tracks.map((track, index) => <Track track={track} index={index} key={index} />)}
    //     </TracksContainer>
    //   </ClipEditContainer>
    // );
  }
}

export default ClipEdit;
