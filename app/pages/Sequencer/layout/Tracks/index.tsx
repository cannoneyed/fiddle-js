import React from 'react'
import { inject, observer } from 'mobx-react'

import sequencerLayoutStore, { SequencerLayoutStore } from 'core/stores/sequencer/layout'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerLayoutStore: SequencerLayoutStore
}

@inject(() => ({
  sequencerLayoutStore,
}))
@observer
export default class TracksLayout extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { sequencerLayoutStore } = this.injected
    const { tracksAreaHeight } = sequencerLayoutStore

    const style = {
      height: tracksAreaHeight,
    }

    return (
      <div className={styles.tracksLayoutWrapper} style={style}>
        {this.props.children}
      </div>
    )
  }
}
