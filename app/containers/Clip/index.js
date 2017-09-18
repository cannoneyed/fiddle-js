import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import ClipContextMenu from 'containers/ClipContextMenu'
import ClipDrag from 'components/ClipDrag'
import Clip from 'components/Clip'

import sequencerViewStore from 'core/stores/sequencer/view'
import clipMouseInteractions from 'core/interactions/clips/mouse'

@inject(() => ({
  handleClipMouseDown: clipMouseInteractions.handleClipMouseDown,
  trackHeight: sequencerViewStore.trackHeight,
}))
@ContextMenuTarget
@observer
export default class ClipContainer extends Component {
  static propTypes = {
    handleClipMouseDown: PropTypes.func.isRequired,
    clip: ObsPropTypes.observableObject.isRequired,
  }

  @autobind // Need to autobind because this method must be a class method, not babel-transformed
  renderContextMenu() {
    const { clip } = this.props
    return (
      <ClipContextMenu clipId={ clip.id } />
    )
  }

  render() {
    const { clip } = this.props

    return (
      <div>
        { clip.isDragging && <ClipDrag clip={ clip } /> }
        { !clip.isDragging &&
          <Clip
            clip={ clip }
            onMouseDown={ (e) => this.props.handleClipMouseDown(clip, e) }
          /> }
      </div>
    )
  }
}
