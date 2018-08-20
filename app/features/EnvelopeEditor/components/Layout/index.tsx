import * as React from 'react';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { Group, Rect } from 'react-konva';
import { injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { Envelope as EnvelopeModel } from 'core/models/envelope';

import VerticalGrid from 'components/VerticalGrid';
import Envelope from 'features/EnvelopeEditor/components/Envelope';

import { get, EnvelopeEditorLayout } from 'features/EnvelopeEditor/core';

interface Props {
  envelope: EnvelopeModel;
}
interface InjectedProps {
  dimensions: Dimensions;
  gridSegmentWidth: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const layout = get(props.envelope, EnvelopeEditorLayout);
  return {
    dimensions: layout.dimensions,
    gridSegmentWidth: layout.gridSegmentWidth,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { dimensions, envelope, gridSegmentWidth } = this.props;

    return (
      <Group {...dimensions}>
        <Rect {...dimensions} fill={theme.colors.darkGray.toRgbString()} />
        <VerticalGrid dimensions={dimensions} colWidth={gridSegmentWidth} getOffsetX={() => 0} />
        <Envelope dimensions={dimensions} envelope={envelope} />
      </Group>
    );
  }
}

export default inject(Layout);
