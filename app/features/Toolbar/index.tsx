import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { Button } from '@blueprintjs/core';

import SelectSnapToGrid from 'components/SelectSnapToGrid';

import { TrackStore } from 'core/stores/tracks';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

@observer
export default class Toolbar extends React.Component<{}, {}> {
  tracksSectionLayout = Container.get(TracksSectionLayout);
  trackStore = Container.get(TrackStore);

  render() {
    const { zoomInHorizontal, zoomOutHorizontal } = this.tracksSectionLayout.zoom;
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
