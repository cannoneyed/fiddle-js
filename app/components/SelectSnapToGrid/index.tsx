import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { map } from 'lodash'

import { snapToGridValues } from 'core/models/snap-to-grid'

import { Select } from 'components/Select'

import { sequencerState, SequencerState } from 'core/stores/sequencer/state'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerState: SequencerState
}

@inject(() => ({
  sequencerState,
}))
@observer
export class SelectSnapToGrid extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const snapToGrid = sequencerState.snapToGrid

    const options = map(snapToGridValues, (snapToGridValue, key) => {
      const { name } = snapToGridValue
      const selected = snapToGrid.value === snapToGridValue
      return { name, value: key, selected }
    })

    return (
      <div className={styles.selectSnapToGridContainer}>
        <Select
          options={options}
          onSelect={key => {
            snapToGrid.setSnapToGridValue(key)
          }}
        />
      </div>
    )
  }
}
