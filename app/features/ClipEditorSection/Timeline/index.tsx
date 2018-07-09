import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Fraction } from 'core/primitives/fraction';
import Timeline from 'components/Timeline';

import { GridLayout } from 'core/state/layouts/clip-editor/grid';

interface Props {}
interface InjectedProps {
  division: Fraction;
  divisionWidth: number;
  nDivisions: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const gridLayout = Container.get(GridLayout);
  const { division, divisionWidth, nDivisions } = gridLayout;
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
