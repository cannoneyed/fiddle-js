import React, { Component } from 'react'
// import autobind from 'autobind-decorator'
import { inject, observer } from 'mobx-react'
import { ContextMenu } from '@blueprintjs/core'

import ClipContextMenu from 'features/ClipContextMenu'
import ClipView from 'components/Clip'

import { Clip } from 'core/models/clip'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'
import { handleClipMouseDown } from 'interactions/clip/mouse'

const styles = require('./styles.less')

interface Props {
  clip: Clip
}

interface State {
  isContextMenuOpen: boolean
}

interface InjectedProps extends Props {
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  sequencerViewStore,
}))
@observer
export default class ClipContainer extends Component<Props, State> {
  state = { isContextMenuOpen: false }

  get injected() {
    return this.props as InjectedProps
  }

  renderContextMenu = () => {
    const { clip } = this.props
    return <ClipContextMenu clipId={clip.id} />
  }

  showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const props = { left: e.clientX, top: e.clientY }
    const callback = () => this.setState({ isContextMenuOpen: false })
    ContextMenu.show(this.renderContextMenu(), props, callback)
    this.setState({ isContextMenuOpen: true })
  }

  render() {
    const { clip } = this.props

    const clipWrapperStyle = {
      left: clip.offsetX - 1,
    }

    return (
      <div
        className={styles.clipContainer}
        style={clipWrapperStyle}
        onContextMenu={this.showContextMenu}
      >
        <ClipView clip={clip} onMouseDown={e => handleClipMouseDown(clip, e)} />
      </div>
    )
  }
}
