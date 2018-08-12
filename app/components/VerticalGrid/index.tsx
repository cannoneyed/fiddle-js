import * as React from 'react';
import { observer } from 'mobx-react';

import { Coordinates, Dimensions } from 'core/interfaces';
import { Grid } from '../Grid';

interface Props {
  colWidth: number;
  dimensions: Dimensions;
  position: Coordinates;
  getOffsetX: () => number;
}

@observer
export class VerticalGrid extends React.Component<Props, {}> {
  static defaultProps = {
    position: { x: 0, y: 0 },
  };

  render() {
    const { colWidth, dimensions, getOffsetX, position } = this.props;
    const getOffset = () => ({
      x: getOffsetX(),
      y: 0,
    });

    const rowHeight = this.props.dimensions.height + 1;
    const nextProps = { colWidth, dimensions, getOffset, position, rowHeight };
    return <Grid {...nextProps} />;
  }
}

export default VerticalGrid;
