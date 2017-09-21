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
export default class ToolbarLayout extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { sequencerLayoutStore } = this.injected
    const { toolbarHeight } = sequencerLayoutStore

    const style = {
      height: toolbarHeight,
    }

    return (
      <div className={styles.toolbarLayoutWrapper} style={style}>
        {this.props.children}
      </div>
    )
  }
}
