import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { Button } from '@blueprintjs/core';

import SelectSnapToGrid from 'components/SelectSnapToGrid';

import { TrackStore } from 'core/stores/tracks';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

const styles = require('./styles.less');

interface Props {}

@observer
export default class Toolbar extends React.Component<Props, {}> {
  tracksSectionLayout = Container.get(TracksSectionLayout);
  trackStore = Container.get(TrackStore);

  render() {
    const { zoomInHorizontal, zoomOutHorizontal } = this.tracksSectionLayout.zoom;
    const { createTrack } = this.trackStore;

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
