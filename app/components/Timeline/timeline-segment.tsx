import * as React from 'react';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { Group, Line, Text } from 'react-konva';
import { makePoints } from 'utils/konva';

import { Dimensions } from 'core/interfaces';
import { Fraction } from 'core/primitives/fraction';
import { Timeline } from 'core/models/timeline';

export interface Props {
  segmentIndex: number;
  dimensions: Dimensions;
  timeline: Timeline;
}

@observer
export default class TimelineSegment extends React.Component<Props, {}> {
  computeDivisionHeight = (division: Fraction, height: number) => {
    if (division.numerator / division.denominator >= 0.5) {
      division = new Fraction(1, 2);
    }
    return division.multiplyScalar(height);
  };

  renderTimelineLabel = (timelineLabel: number) => {
    const color = theme.colors.lightGray.toRgbString();

    return (
      <Text text={`${timelineLabel}`} x={5} y={1} fontSize={12} fontFamily="Menlo" fill={color} />
    );
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

  render() {
    const { segmentIndex } = this.props;
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
  }
}
