import * as React from 'react';
import { observer } from 'mobx-react';
import { Circle } from 'react-konva';
import theme from 'styles/theme';

import { Coordinates } from 'core/interfaces';
import { IO_RADIUS } from '../../helpers/layout';

export interface Props {
  position: Coordinates;
}

@observer
export class Port extends React.Component<Props, {}> {
  render() {
    const { position } = this.props;
    return (
      <Circle
        {...position}
        radius={IO_RADIUS}
        strokeWidth={2}
        stroke={theme.colors.black.toRgbString()}
        fill={theme.colors.white.toRgbString()}
      />
    );
  }
}

export default Port;
