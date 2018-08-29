import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import Button from 'components/Button';
import SelectSnapToGrid from 'features/Sequencer/components/SelectSnapToGrid';

import { TrackActions } from 'core';
import { get, SequencerState, TimelineState } from 'features/Sequencer/core';

export interface Props {}
export interface InjectedProps {
  createTrack: () => void;
  sliderValue: number;
  setSliderValue: (value: number) => void;
  zoomInHorizontal: () => void;
  zoomOutHorizontal: () => void;
}

const inject = injector<Props, InjectedProps>(props => {
  const { timeline } = get(TimelineState);
  const sequencerState = get(SequencerState);
  const trackActions = get(TrackActions);

  return {
    createTrack: () => trackActions.createTrack(),
    sliderValue: sequencerState.sliderValue,
    setSliderValue: sequencerState.setSliderValue,
    zoomInHorizontal: () => timeline.zoomIn(),
    zoomOutHorizontal: () => timeline.zoomOut(),
  };
});

export class Toolbar extends React.Component<Props & InjectedProps, {}> {
  render() {
    const {
      createTrack,
      sliderValue,
      setSliderValue,
      zoomInHorizontal,
      zoomOutHorizontal,
    } = this.props;

    return (
      <ToolbarContainer>
        <Button onClick={() => createTrack()} icon="add-box">
          Add Track
        </Button>
        <Button onClick={() => zoomInHorizontal()} icon="zoom-in" />
        <Button onClick={() => zoomOutHorizontal()} icon="zoom-out" />
        <SelectSnapToGrid />
        <input
          type="range"
          min="1"
          max="100"
          value={sliderValue}
          onChange={event => setSliderValue(Number(event.target.value))}
        />
      </ToolbarContainer>
    );
  }
}

export default observer(inject(Toolbar));

const ToolbarContainer = styled.div`
  position: absolute;
  top: 0px;
  height: ${theme.toolbarHeight.toString()};

  display: flex;
  flex-direction: row;
  align-items: center;
`;
