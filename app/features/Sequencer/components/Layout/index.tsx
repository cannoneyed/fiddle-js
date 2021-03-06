import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';

import Minimap from 'features/Sequencer/components/Minimap';
import TimelineGutter from 'features/Sequencer/components/TimelineGutter';
import Toolbar from 'features/Sequencer/components/Toolbar';
import TracksGutter from 'features/Sequencer/components/TracksGutter';
import TracksStage from 'features/Sequencer/components/TracksStage';
import VerticalScrollbar from 'features/Sequencer/components/VerticalScrollbar';

import { Dimensions, Rectangle } from 'core/interfaces';

import { get, SequencerLayout } from 'features/Sequencer/core';

import {
  BottomWrapper,
  GutterWrapper,
  MinimapWrapper,
  SequencerWrapper,
  ToolbarWrapper,
  TopWrapper,
  TracksStageWrapper,
  VerticalScrollWrapper,
} from './styled-components';

interface Props {}
interface InjectedProps {
  dimensions: Dimensions;
  gutterWidth: number;
  minimapHeight: number;
  timelineHeight: number;
  toolbarHeight: number;
  tracksStageDimensions: Dimensions;
  verticalScrollbarRectangle: Rectangle;
}

const inject = injector<Props, InjectedProps>(props => {
  const layout = get(SequencerLayout);

  return {
    dimensions: layout.dimensions,
    gutterWidth: layout.gutterWidth,
    minimapHeight: layout.minimapHeight,
    timelineHeight: layout.timelineHeight,
    toolbarHeight: layout.toolbarHeight,
    tracksStageDimensions: layout.tracksStageDimensions,
    verticalScrollbarRectangle: layout.verticalScrollbarRectangle,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { dimensions } = this.props;

    const minimapWrapperStyle = {
      height: this.props.minimapHeight,
    };

    const sequencerSectionStyle = {
      height: this.props.dimensions.height,
    };

    const topWrapperStyle = {
      height: this.props.toolbarHeight + this.props.minimapHeight,
    };

    const toolbarWrapperStyle = {
      height: this.props.toolbarHeight,
    };

    const bottomWrapperStyle = {
      top: topWrapperStyle.height,
      height: dimensions.height - topWrapperStyle.height,
    };

    const gutterWrapperStyle = {
      height: bottomWrapperStyle.height,
      width: this.props.gutterWidth,
    };

    const tracksStageWrapperStyle = {
      left: this.props.gutterWidth,
      height: bottomWrapperStyle.height,
      width:
        dimensions.width - gutterWrapperStyle.width - this.props.verticalScrollbarRectangle.width,
    };

    const verticalScrollWrapperStyle = {
      left: gutterWrapperStyle.width + tracksStageWrapperStyle.width,
      height: bottomWrapperStyle.height,
      width: this.props.verticalScrollbarRectangle.width,
    };

    const tracksDimensions = {
      height: bottomWrapperStyle.height,
      width: dimensions.width - gutterWrapperStyle.width - verticalScrollWrapperStyle.width,
    };

    return (
      <SequencerWrapper style={sequencerSectionStyle}>
        <TopWrapper style={topWrapperStyle}>
          <ToolbarWrapper style={toolbarWrapperStyle}>
            <Toolbar />
          </ToolbarWrapper>
          <MinimapWrapper style={minimapWrapperStyle}>
            <Minimap />
          </MinimapWrapper>
        </TopWrapper>
        <BottomWrapper style={bottomWrapperStyle}>
          <GutterWrapper style={gutterWrapperStyle}>
            <TimelineGutter />
            <TracksGutter />
          </GutterWrapper>
          <TracksStageWrapper style={tracksStageWrapperStyle}>
            <TracksStage dimensions={tracksDimensions} />
          </TracksStageWrapper>
          <VerticalScrollWrapper style={verticalScrollWrapperStyle}>
            <VerticalScrollbar />
          </VerticalScrollWrapper>
        </BottomWrapper>
      </SequencerWrapper>
    );
  }
}

export default inject(hot(module)(Layout));
