import * as React from 'react';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { Group, Line, Text } from 'react-konva';
import { range } from 'lodash';
import { makePoints } from 'utils/konva';

import { Dimensions } from 'core/interfaces';
import { Fraction } from 'core/primitives/fraction';
import { Timeline } from 'core/models/timeline';

export interface Props {
  dimensions: Dimensions;
  offsetX: number;
  timeline: Timeline;
  width: number;
}

@observer
export default class TimelineSegments extends React.Component<Props, {}> {
  renderTimelineLabel = (timelineLabel: number) => {
    const color = theme.colors.lightGray.toRgbString();

    return (
      <Text
        text={`${timelineLabel}`}
        x={5}
        y={1}
        fontSize={12}
        fontFamily="monospace"
        fill={color}
      />
    );
  };

  computeDivisionHeight = (division: Fraction, height: number) => {
    if (division.numerator / division.denominator >= 0.5) {
      division = new Fraction(1, 2);
    }
    return division.multiplyScalar(height);
  };

  renderSegmentDivision = (
    segmentDivision: Fraction,
    divisionIndex: number,
    segmentIndex: number
  ) => {
    const { dimensions, timeline } = this.props;
    const { barsPerSegment, segmentDivisions, segmentWidth } = timeline;
    const color = theme.colors.mediumGray.toRgbString();

    const divisionHeight =
      divisionIndex === 0
        ? dimensions.height
        : this.computeDivisionHeight(segmentDivision, dimensions.height);
    const start = { x: 0, y: dimensions.height - divisionHeight };
    const end = { x: 0, y: dimensions.height };
    const linePoints = makePoints([start, end]);

    const bar = barsPerSegment * segmentIndex;
    const label = divisionIndex === 0 ? this.renderTimelineLabel(bar) : null;
    const divisionWidth = segmentWidth / segmentDivisions.length;
    const x = divisionWidth * divisionIndex;

    return (
      <Group x={x} key={divisionIndex}>
        <Line points={linePoints} stroke={color} strokeWidth={1} />
        {label}
      </Group>
    );
  };

  renderTimelineSegment = (segmentIndex: number) => {
    const { segmentDivisions, segmentWidth } = this.props.timeline;
    const { dimensions } = this.props;
    const x = segmentIndex * segmentWidth;
    const key = segmentIndex;

    return (
      <Group key={key} x={x} height={dimensions.height} width={segmentWidth}>
        {segmentDivisions.map((fraction, divisionIndex) => {
          return this.renderSegmentDivision(fraction, divisionIndex, segmentIndex);
        })}
      </Group>
    );
  };

  render() {
    const { dimensions, offsetX, timeline, width } = this.props;
    const { barsPerSegment, length, segmentWidth } = timeline;

    const firstSegmentIndex = Math.floor(offsetX / segmentWidth);
    const nSegments = Math.floor(width / segmentWidth) + 1;

    const nBars = nSegments * barsPerSegment;
    const nBarsOverflow = Math.max(nBars - length.primary, 0);
    const nSegmentsOverflow = nBarsOverflow / barsPerSegment;
    const nSegmentsToDisplay = nSegments - nSegmentsOverflow;

    const timelineSegments = range(nSegmentsToDisplay).map(n => {
      const segmentIndex = firstSegmentIndex + n;
      return this.renderTimelineSegment(segmentIndex);
    });

    return <Group {...dimensions}>{timelineSegments}</Group>;
  }
}
