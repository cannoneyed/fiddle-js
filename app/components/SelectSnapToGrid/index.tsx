import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { map } from 'lodash'

import { snapToGridValues } from 'core/models/snap-to-grid'

import Select from 'components/Select'

import sequencerStateStore, { SequencerStateStore } from 'core/stores/sequencer/state'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerStateStore: SequencerStateStore
}

@inject(() => ({
  sequencerStateStore,
}))
@observer
export default class SelectSnapToGrid extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const snapToGrid = sequencerStateStore.snapToGrid

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
