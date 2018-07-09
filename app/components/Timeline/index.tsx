import * as React from 'react';
import { noop, range } from 'lodash';
import { observer } from 'mobx-react';

import { Fraction } from 'core/primitives/fraction';

import {
  TimelineContainer,
  TimelineDivider,
  TimelineLabel,
  TimelineSegment,
  TimelineSegmentsContainer,
} from './styled-components';

export interface Props {
  division: Fraction;
  divisionWidth: number;
  nDivisions: number;
  offsetX: number;
}

@observer
export default class Timeline extends React.Component<Props, {}> {
  renderTimelineSegments() {
    const { division, divisionWidth, nDivisions } = this.props;

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
      <TimelineContainer>
        <TimelineSegmentsContainer>{this.renderTimelineSegments()}</TimelineSegmentsContainer>
      </TimelineContainer>
    );
  }
}
