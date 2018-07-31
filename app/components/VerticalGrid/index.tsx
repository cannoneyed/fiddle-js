import * as React from 'react';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Grid } from '../Grid';

interface Props {
  colWidth: number;
  dimensions: Dimensions;
  offsetX: number;
}

@observer
export class VerticalGrid extends React.Component<Props, {}> {
  render() {
    const offsetY = 0;
    const rowHeight = this.props.dimensions.height + 1;
    const nextProps = { ...this.props, offsetY, rowHeight };
    return <Grid {...nextProps} />;
  }
}

export default VerticalGrid;
