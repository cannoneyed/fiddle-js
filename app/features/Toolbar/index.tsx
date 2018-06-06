import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { Button } from '@blueprintjs/core';

import SelectSnapToGrid from 'components/SelectSnapToGrid';

import { TrackStore } from 'core/state/stores/tracks';
import { SequencerLayout } from 'core/state/layouts/sequencer';

@observer
export default class Toolbar extends React.Component<{}, {}> {
  sequencerLayout = Container.get(SequencerLayout);
  trackStore = Container.get(TrackStore);

  render() {
    const { zoomInHorizontal, zoomOutHorizontal } = this.sequencerLayout.zoom;
    const { createTrack } = this.trackStore;

    return (
      <ToolbarContainer>
        <Button icon="add" onClick={() => createTrack()}>
          Add Track
        </Button>
        <Button icon="zoom-in" onClick={() => zoomInHorizontal()} />
        <Button icon="zoom-out" onClick={() => zoomOutHorizontal()} />
        <SelectSnapToGrid />
      </ToolbarContainer>
    );
  }
}

const ToolbarContainer = styled.div`
  position: absolute;
  top: 0px;
  height: ${theme.toolbarHeight.toString()};

  display: flex;
  flex-direction: row;
  align-items: center;
`;
