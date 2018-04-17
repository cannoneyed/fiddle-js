import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';
import { Button } from '@blueprintjs/core';

import SelectSnapToGrid from 'components/SelectSnapToGrid';

import { TrackStore } from 'core/stores/tracks';
import { SequencerView } from 'core/stores/sequencer/view';

const styles = require('./styles.less');

interface Props {
  sequencerView: SequencerView;
  trackStore: TrackStore;
}

@observer
export class Toolbar extends React.Component<Props, {}> {
  render() {
    const { trackStore, sequencerView } = this.props;
    const { zoomInHorizontal, zoomOutHorizontal } = sequencerView.zoom;
    const { createTrack } = trackStore;

    return (
      <div className={styles.toolbarContainer}>
        <Button icon="add" onClick={() => createTrack()}>
          Add Track
        </Button>
        <Button icon="zoom-in" onClick={() => zoomInHorizontal()} />
        <Button icon="zoom-out" onClick={() => zoomOutHorizontal()} />
        <SelectSnapToGrid />
      </div>
    );
  }
}

export default connect(Toolbar, 'trackStore', 'sequencerView');
