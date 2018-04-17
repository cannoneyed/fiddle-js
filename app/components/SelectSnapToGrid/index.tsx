import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';
import { map } from 'lodash';

import { snapToGridValues } from 'core/models/snap-to-grid';

import Select from 'components/Select';

import { SequencerState } from 'core/stores/sequencer/state';

const styles = require('./styles.less');

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
      <div className={styles.selectSnapToGridContainer}>
        <Select
          options={options}
          onSelect={key => {
            snapToGrid.setSnapToGridValue(key);
          }}
        />
      </div>
    );
  }
}

export default connect(SelectSnapToGrid, 'sequencerState');
