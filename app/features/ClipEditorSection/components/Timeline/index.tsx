import * as React from 'react';
import { observer } from 'mobx-react';
import { Layer, Stage } from 'react-konva';

import { Fraction } from 'core/primitives/fraction';
import Timeline from 'components/Timeline';

import { injectCore } from 'features/ClipEditorSection/core';

interface Props {}
interface InjectedProps {
  division: Fraction;
  divisionWidth: number;
  nDivisions: number;
}

const inject = injectCore<Props, InjectedProps>((_, core) => {
  const { division, divisionWidth, nDivisions } = core.grid;
  return {
    division,
    divisionWidth,
    nDivisions,
  };
});

@observer
export class TimelineContainer extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { division, divisionWidth, nDivisions } = this.props;

    const dimensions = {
      width: 1000,
      height: 30,
    };

    return (
      <Stage {...dimensions}>
        <Layer>
          <Timeline
            dimensions={dimensions}
            getOffset={() => 0}
            division={division}
            divisionWidth={divisionWidth}
            nDivisions={nDivisions}
          />
        </Layer>
      </Stage>
    );
  }
}

export default inject(TimelineContainer);
