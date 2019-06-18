import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';
import { Layer, Stage } from 'react-konva';
import { makeHandler } from 'utils/konva';

import { Dimensions } from 'core/interfaces';

import Grid from 'features/Sequencer/components/Grid';
import Timeline from 'features/Sequencer/components/Timeline';
import Tracks from 'features/Sequencer/components/Tracks';
import Playhead from 'features/Sequencer/components/Playhead';

import { get, SequencerLayout, SequencerScrollInteraction } from 'features/Sequencer/core';

interface Props {
  dimensions: Dimensions;
}

interface InjectedProps {
  handleScroll: (deltaX: number, deltaY: number) => void;
  timelineHeight: number;
}

const inject = injector<Props, InjectedProps>(() => {
  const sequencerScrollInteraction = get(SequencerScrollInteraction);
  const sequencerLayout = get(SequencerLayout);

  return {
    handleScroll: sequencerScrollInteraction.handleScroll,
    timelineHeight: sequencerLayout.timelineHeight,
  };
});

@observer
export class TracksStage extends React.Component<Props & InjectedProps, {}> {
  handleMouseWheel = makeHandler<WheelEvent>(event => {
    const { deltaX, deltaY } = event;
    this.props.handleScroll(deltaX, deltaY);
  });

  render() {
    const { dimensions, timelineHeight } = this.props;

    const tracksDimensions = {
      height: dimensions.height - timelineHeight,
      width: dimensions.width,
    };

    const tracksPosition = {
      x: 0,
      y: timelineHeight,
    };

    return (
      <Stage {...dimensions} onWheel={this.handleMouseWheel}>
        <Layer>
          <Grid dimensions={tracksDimensions} position={tracksPosition} />
          <Tracks dimensions={tracksDimensions} position={tracksPosition} />
          <Timeline />
          <Playhead timelineHeight={timelineHeight} dimensions={dimensions} />
        </Layer>
      </Stage>
    );
  }
}

export default inject(hot(module)(TracksStage));
