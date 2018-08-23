import * as React from 'react';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { Group, Rect } from 'react-konva';

import { Dimensions } from 'core/interfaces';
import { Timeline as TimelineModel } from 'core/models/timeline';

import TimelineSegments from './timeline-segments';

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

    return (
      <Group>
        <Rect {...dimensions} fill={theme.colors.black.toRgbString()} />
        <Group x={-offsetX}>
          <TimelineSegments
            dimensions={dimensions}
            timeline={timeline}
            offsetX={offsetX}
            width={dimensions.width}
          />
        </Group>
      </Group>
    );
  }
}
