import * as React from 'react';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { Group, Rect } from 'react-konva';

import { Dimensions } from 'core/interfaces';
import { Fraction } from 'core/primitives/fraction';

import TimelineSegments from './timeline-segments';

export interface Props {
  dimensions: Dimensions;
  division: Fraction;
  divisionWidth: number;
  getOffset: () => number;
  nDivisions: number;
}

@observer
export default class Timeline extends React.Component<Props, {}> {
  render() {
    const { dimensions, division, divisionWidth, getOffset, nDivisions } = this.props;
    const offsetX = getOffset();

    return (
      <Group>
        <Rect {...dimensions} fill={theme.colors.black.toRgbString()} />
        <Group x={-offsetX}>
          <TimelineSegments
            dimensions={dimensions}
            division={division}
            divisionWidth={divisionWidth}
            nDivisions={nDivisions}
          />
        </Group>
      </Group>
    );
  }
}
