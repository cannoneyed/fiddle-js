import * as React from 'react';
// import { Container } from 'typedi';
import { observer } from 'mobx-react';
// import { map } from 'lodash';

// import { snapToGridValues } from 'core/models/snap-to-grid';
// import { SequencerState } from 'core/state/app/sequencer';

// import Select from 'components/Select';

// import { SelectContainer } from './styled-components';

interface Props {}

@observer
export default class SelectSnapToGrid extends React.Component<Props, {}> {
  render() {
    return null;
  }
  // // sequencerState = Container.get(SequencerState);

  // render() {
  //   // const { sequencerState } = this;
  //   const snapToGrid = sequencerState.snapToGrid;

  //   const options = map(snapToGridValues, (snapToGridValue, key) => {
  //     const { name } = snapToGridValue;
  //     const selected = snapToGrid.value === snapToGridValue;
  //     return { name, value: key, selected };
  //   });

  //   return (
  //     <SelectContainer>
  //       <Select
  //         options={options}
  //         onSelect={key => {
  //           const value = snapToGridValues[key];
  //           snapToGrid.setSnapToGridValue(value);
  //         }}
  //       />
  //     </SelectContainer>
  //   );
  // }
}
