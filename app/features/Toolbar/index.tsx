import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';
import { Button } from '@blueprintjs/core';

import SelectSnapToGrid from 'components/SelectSnapToGrid';

import { TrackStore } from 'core/stores/tracks';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

const styles = require('./styles.less');

interface Props {
  tracksSectionLayout: TracksSectionLayout;
  trackStore: TrackStore;
}

@observer
export class Toolbar extends React.Component<Props, {}> {
  render() {
    const { trackStore, tracksSectionLayout } = this.props;
    const { zoomInHorizontal, zoomOutHorizontal } = tracksSectionLayout.zoom;
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

export default connect(Toolbar, 'trackStore', 'tracksSectionLayout');
