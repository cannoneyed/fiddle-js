import * as React from 'react';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Grid } from '../Grid';

interface Props {
  colWidth: number;
  dimensions: Dimensions;
  getOffsetX: () => number;
}

@observer
export class VerticalGrid extends React.Component<Props, {}> {
  render() {
    const { colWidth, dimensions, getOffsetX } = this.props;
    const getOffset = () => ({
      x: getOffsetX(),
      y: 0,
    });

    const rowHeight = this.props.dimensions.height + 1;
    const nextProps = { colWidth, dimensions, getOffset, rowHeight };
    return <Grid {...nextProps} />;
  }
}

export default VerticalGrid;
