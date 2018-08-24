import * as React from 'react';
import { range } from 'lodash';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { Group, Rect } from 'react-konva';

import { Dimensions } from 'core/interfaces';
import { Timeline as TimelineModel } from 'core/models/timeline';

import TimelineSegment from './timeline-segment';

export interface Props {
  dimensions: Dimensions;
  getOffset: () => number;
  timeline: TimelineModel;
}

@observer
export default class Timeline extends React.Component<Props, {}> {
  render() {
    const { dimensions, getOffset, timeline } = this.props;
    const offsetX = getOffset();

    const { barsPerSegment, length, segmentWidth } = timeline;
    const { floor, min } = Math;
    const firstSegmentIndex = floor(offsetX / segmentWidth);
    const segmentsInTimeline = length.primary / barsPerSegment;
    const nVisibleSegments = floor(dimensions.width / segmentWidth);
    const nSegmentsToRender = min(nVisibleSegments + 1, segmentsInTimeline);

    const timelineSegments = range(nSegmentsToRender).map(n => {
      const segmentIndex = firstSegmentIndex + n;
      return (
        <TimelineSegment
          key={segmentIndex}
          segmentIndex={segmentIndex}
          dimensions={dimensions}
          timeline={timeline}
        />
      );
    });

    return (
      <Group>
        <Rect {...dimensions} fill={theme.colors.black.toRgbString()} />
        <Group x={-offsetX}>{timelineSegments}</Group>
      </Group>
    );
  }
}
