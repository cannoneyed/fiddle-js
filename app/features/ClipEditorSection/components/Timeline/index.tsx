import * as React from 'react';
import { observer } from 'mobx-react';

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
    return (
      <Timeline
        getOffset={() => 0}
        division={division}
        divisionWidth={divisionWidth}
        nDivisions={nDivisions}
        width={1000}
      />
    );
  }
}

export default inject(TimelineContainer);
