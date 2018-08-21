import * as React from 'react';
import { observer } from 'mobx-react';
import { Group } from 'react-konva';
import { injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { Clip } from 'core/models/clip';
import { Fraction } from 'core/primitives/fraction';

import Timeline from 'components/Timeline';

import { get, ClipEditorGrid } from 'features/ClipEditorSection/core';

interface Props {
  clip: Clip;
  dimensions: Dimensions;
}
interface InjectedProps {
  division: Fraction;
  divisionWidth: number;
  nDivisions: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const { division, divisionWidth, nDivisions } = get(props.clip, ClipEditorGrid);
  return {
    division,
    divisionWidth,
    nDivisions,
  };
});

@observer
export class TimelineContainer extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { dimensions, division, divisionWidth, nDivisions } = this.props;

    return (
      <Group>
        <Timeline
          dimensions={dimensions}
          getOffset={() => 0}
          division={division}
          divisionWidth={divisionWidth}
          nDivisions={nDivisions}
        />
      </Group>
    );
  }
}

export default inject(TimelineContainer);
