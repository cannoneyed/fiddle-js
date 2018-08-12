import * as React from 'react';
import styled from 'styled-components';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import Toolbar from 'features/Toolbar';

import Minimap from 'features/SequencerSection/components/Minimap';
// import Grid from 'features/SequencerSection/components/Grid';
// import Timeline from 'features/SequencerSection/components/Timeline';
// import TimelineGutter from 'features/SequencerSection/components/TimelineGutter';
// import TracksGutter from 'features/SequencerSection/components/TracksGutter';
import TracksStage from 'features/SequencerSection/components/TracksStage';
import VerticalScrollbar from 'features/SequencerSection/components/VerticalScrollbar';

import { Dimensions, Rectangle } from 'core/interfaces';
import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';

import {
  MinimapWrapper,
  SequencerSectionWrapper,
  // TimelineWrapper,
  ToolbarWrapper,
  // TracksWrapper,
  // TracksAreaWrapper,
  // VerticalScrollbarWrapper,
} from './styled-components';

interface Props {}
interface InjectedProps {
  gutterWidth: number;
  minimapHeight: number;
  sectionHeight: number;
  sectionWidth: number;
  timelineHeight: number;
  toolbarHeight: number;
  tracksAreaDimensions: Dimensions;
  verticalScrollbarRectangle: Rectangle;
}

const inject = injector<Props, InjectedProps>(props => {
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);

  return {
    gutterWidth: sequencerSectionLayout.gutterWidth,
    minimapHeight: sequencerSectionLayout.minimapHeight,
    sectionHeight: sequencerSectionLayout.sectionHeight,
    sectionWidth: sequencerSectionLayout.sectionWidth,
    timelineHeight: sequencerSectionLayout.timelineHeight,
    toolbarHeight: sequencerSectionLayout.toolbarHeight,
    tracksAreaDimensions: sequencerSectionLayout.tracksAreaDimensions,
    verticalScrollbarRectangle: sequencerSectionLayout.verticalScrollbarRectangle,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const minimapWrapperStyle = {
      height: this.props.minimapHeight,
    };

    const sequencerSectionStyle = {
      height: this.props.sectionHeight,
    };

    const topWrapperStyle = {
      height: this.props.toolbarHeight + this.props.minimapHeight,
    };

    // const timelineWrapperStyle = {
    //   height: this.props.timelineHeight,
    //   width: this.props.tracksAreaDimensions.width,
    // };

    const toolbarWrapperStyle = {
      height: this.props.toolbarHeight,
    };

    const bottomWrapperStyle = {
      top: topWrapperStyle.height,
      height: this.props.sectionHeight - topWrapperStyle.height,
    };

    const gutterWrapperStyle = {
      height: bottomWrapperStyle.height,
      width: this.props.gutterWidth,
    };

    const tracksWrapperStyle = {
      left: this.props.gutterWidth,
      height: bottomWrapperStyle.height,
      width:
        this.props.sectionWidth -
        gutterWrapperStyle.width -
        this.props.verticalScrollbarRectangle.width,
    };

    const verticalScrollWrapperStyle = {
      left: gutterWrapperStyle.width + tracksWrapperStyle.width,
      height: bottomWrapperStyle.height,
      width: this.props.verticalScrollbarRectangle.width,
    };

    // const tracksAreaWrapperStyle = {
    //   height: this.props.tracksAreaDimensions.height,
    //   width: this.props.tracksAreaDimensions.width,
    // };

    // const tracksDimensions = {
    //   height: this.props.tracksAreaDimensions.height,
    //   width: this.props.tracksAreaDimensions.width - 100,
    // };

    // const verticalScrollbarWrapperStyle = {
    //   top: this.props.verticalScrollbarRectangle.top,
    //   height: this.props.verticalScrollbarRectangle.height,
    //   width: this.props.verticalScrollbarRectangle.width,
    // };

    const tracksDimensions = {
      height: bottomWrapperStyle.height,
      width: this.props.sectionWidth - gutterWrapperStyle.width - verticalScrollWrapperStyle.width,
    };

    return (
      <SequencerSectionWrapper style={sequencerSectionStyle}>
        <TopWrapper style={topWrapperStyle}>
          <ToolbarWrapper style={toolbarWrapperStyle}>
            <Toolbar />
          </ToolbarWrapper>
          <MinimapWrapper style={minimapWrapperStyle}>
            <Minimap />
          </MinimapWrapper>
        </TopWrapper>
        <BottomWrapper style={bottomWrapperStyle}>
          <GutterWrapper style={gutterWrapperStyle}>gutter</GutterWrapper>
          <TracksWrapper style={tracksWrapperStyle}>
            <TracksStage dimensions={tracksDimensions} />
          </TracksWrapper>
          <VerticalScrollWrapper style={verticalScrollWrapperStyle}>
            <VerticalScrollbar />
          </VerticalScrollWrapper>
        </BottomWrapper>
        {/* <TimelineWrapper style={timelineWrapperStyle}>
          <TimelineGutter />
          <Timeline />
        </TimelineWrapper>
        <TracksAreaWrapper style={tracksAreaWrapperStyle}>
          <TracksGutter />
          <TracksWrapper>
            <Grid />
            <TracksStage dimensions={tracksDimensions} />
          </TracksWrapper>
        </TracksAreaWrapper>
        <VerticalScrollbarWrapper style={verticalScrollbarWrapperStyle}>
          
        </VerticalScrollbarWrapper> */}
      </SequencerSectionWrapper>
    );
  }
}

export default inject(Layout);

const TopWrapper = styled.div`
  position: absolute;
  width: 100%;
`;

const BottomWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const GutterWrapper = styled.div`
  position: absolute;
  background-color: purple;
`;

const TracksWrapper = styled.div`
  position: absolute;
`;

const VerticalScrollWrapper = styled.div`
  position: absolute;
  background-color: yellow;
`;
