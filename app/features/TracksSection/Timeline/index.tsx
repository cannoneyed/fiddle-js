import * as React from 'react';
import { Container } from 'typedi';
import { noop, range } from 'lodash';
import { observer } from 'mobx-react';

import DragToMarker from './DragToMarker';

import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

import {
  TimelineContainer,
  TimelineDivider,
  TimelineLabel,
  TimelineSegment,
  TimelineSegmentsContainer,
} from './styled-components';

@observer
export default class Timeline extends React.Component<{}, {}> {
  tracksSectionLayout = Container.get(TracksSectionLayout);

  renderTimelineSegments() {
    const { tracksSectionLayout } = this;
    const { division, divisionWidth, nDivisions } = tracksSectionLayout.grid;

    return range(nDivisions).map(n => {
      const { numerator, denominator } = division.multiply(n, 1).reduce();
      noop(numerator, denominator);

      const timelineSegmentStyle = {
        minWidth: divisionWidth,
      };

      const isMajorDivision = denominator === 1 && n % 2 == 0;
      const timelineLabel = isMajorDivision ? numerator + 1 : null;

      return (
        <TimelineSegment key={n} style={timelineSegmentStyle}>
          <TimelineDivider className="timelineDivider" />
          {timelineLabel && <TimelineLabel>{timelineLabel}</TimelineLabel>}
        </TimelineSegment>
      );
    });
  }

  render() {
    return (
      <TimelineContainer id="timeline">
        <DragToMarker />
        <TimelineSegmentsContainer>{this.renderTimelineSegments()}</TimelineSegmentsContainer>
      </TimelineContainer>
    );
  }
}
