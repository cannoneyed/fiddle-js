import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';
import { map } from 'lodash';

import { snapToGridValues } from 'core/models/snap-to-grid';
import { SequencerState } from 'core/stores/sequencer/state';

import Select from 'components/Select';

import { Container } from './styled-components';

interface Props {
  sequencerState: SequencerState;
}

@observer
export class SelectSnapToGrid extends React.Component<Props, {}> {
  render() {
    const { sequencerState } = this.props;
    const snapToGrid = sequencerState.snapToGrid;

    const options = map(snapToGridValues, (snapToGridValue, key) => {
      const { name } = snapToGridValue;
      const selected = snapToGrid.value === snapToGridValue;
      return { name, value: key, selected };
    });

    return (
      <Container>
        <Select
          options={options}
          onSelect={key => {
            snapToGrid.setSnapToGridValue(key);
          }}
        />
      </Container>
    );
  }
}

export default connect(SelectSnapToGrid, 'sequencerState');
