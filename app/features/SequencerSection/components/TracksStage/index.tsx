import * as React from 'react';
import Konva from 'konva';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import { Layer, Stage } from 'react-konva';
import { makeHandler } from 'utils/konva';

import { SequencerScrollInteraction } from 'core/interactions/sequencer/scroll';
import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';

import { Dimensions } from 'core/interfaces';

import Grid from 'features/SequencerSection/components/Grid';
import Timeline from 'features/SequencerSection/components/Timeline';
import Tracks from 'features/SequencerSection/components/Tracks';

interface Props {
  dimensions: Dimensions;
}

interface InjectedProps {
  handleScroll: (deltaX: number, deltaY: number) => void;
  timelineHeight: number;
}

const inject = injector<Props, InjectedProps>(() => {
  const sequencerScrollInteraction = Container.get(SequencerScrollInteraction);
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);

  return {
    handleScroll: sequencerScrollInteraction.handleScroll,
    timelineHeight: sequencerSectionLayout.timelineHeight,
  };
});

@observer
export class TracksStage extends React.Component<Props & InjectedProps, {}> {
  handleMouseWheel = makeHandler<WheelEvent, Konva.Rect>(event => {
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

    console.log;

    return (
      <Stage {...dimensions} onWheel={this.handleMouseWheel}>
        <Layer>
          <Grid dimensions={tracksDimensions} position={tracksPosition} />
          <Tracks dimensions={tracksDimensions} position={tracksPosition} />
          <Timeline />
        </Layer>
      </Stage>
    );
  }
}

export default inject(TracksStage);
